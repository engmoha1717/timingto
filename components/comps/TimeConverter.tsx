/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Clock, ArrowRightLeft, Globe, 
   Sun, Moon, Sparkles, 
  ShieldCheck, LayoutDashboard
} from 'lucide-react';
import * as cityTimezonesPkg from 'city-timezones';
import { MOCK_POSTS } from '@/lib/constants';
import { City, UserRole, ConversionResult } from '@/lib/types';
import { getGeminiContext } from '@/lib/services/geminiService';

import GlassCard from './GlassCard';
import AdPlaceholder from './AdPlaceholder';
import CityAutocomplete from './CityAutocomplete';
import Background from '../Background';
import GoogleAd from './GoogleAdProps';


const getCityData = (): City[] => {
  try {
    const pkg = cityTimezonesPkg as any;
    // Try finding the array in common locations
    const cities = pkg.cityMapping || pkg.default?.cityMapping;
    
    if (Array.isArray(cities) && cities.length > 0) {
      return cities as City[];
    }
  } catch (e) {
    console.warn("Error accessing city-timezones package:", e);
  }

  // Fallback: Manually construct a small list if package fails to load
  console.warn("Could not load city-timezones package data. Using fallback.");
  return [
    { city: "New York", city_ascii: "New York", lat: 40.6943, lng: -73.9249, pop: 18713220, country: "United States of America", iso2: "US", iso3: "USA", province: "New York", timezone: "America/New_York" },
    { city: "London", city_ascii: "London", lat: 51.5072, lng: -0.1276, pop: 10979000, country: "United Kingdom", iso2: "GB", iso3: "GBR", province: "London, City of", timezone: "Europe/London" },
    { city: "Paris", city_ascii: "Paris", lat: 48.8566, lng: 2.3522, pop: 11020000, country: "France", iso2: "FR", iso3: "FRA", province: "Île-de-France", timezone: "Europe/Paris" },
    { city: "Helsinki", city_ascii: "Helsinki", lat: 60.1699, lng: 24.9384, pop: 1180000, country: "Finland", iso2: "FI", iso3: "FIN", province: "Uusimaa", timezone: "Europe/Helsinki" },
    { city: "Tokyo", city_ascii: "Tokyo", lat: 35.6897, lng: 139.6922, pop: 37977000, country: "Japan", iso2: "JP", iso3: "JPN", province: "Tokyo", timezone: "Asia/Tokyo" },
    { city: "Dubai", city_ascii: "Dubai", lat: 25.2048, lng: 55.2708, pop: 2502715, country: "United Arab Emirates", iso2: "AE", iso3: "ARE", province: "Dubai", timezone: "Asia/Dubai" },
    { city: "Sydney", city_ascii: "Sydney", lat: -33.8688, lng: 151.2093, pop: 4840600, country: "Australia", iso2: "AU", iso3: "AUS", province: "New South Wales", timezone: "Australia/Sydney" },
  ];
};

const ALL_CITIES = getCityData();

// Helper to find a specific default city safely
const findCity = (name: string): City => {
  const found = ALL_CITIES.find(c => c.city === name || c.city_ascii === name);
  return found || ALL_CITIES[0];
};


export default function TimeConverter() {
  const [sourceCity, setSourceCity] = useState<City>(() => findCity('New York'));
  const [targetCity, setTargetCity] = useState<City>(() => findCity('Helsinki'));
  const [inputTime, setInputTime] = useState<string>('09:00');
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  
  const [aiContext, setAiContext] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isTargetOpen, setIsTargetOpen] = useState(false);

  const convertTime = useCallback(() => {
    try {
      if (!sourceCity || !targetCity) return;

      const [hours, minutes] = inputTime.split(':').map(Number);
      
      const getOffsetMinutes = (tz: string) => {
        const date = new Date();
        const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(date.toLocaleString('en-US', { timeZone: tz }));
        return (tzDate.getTime() - utcDate.getTime()) / 60000;
      };

      const sourceOffset = getOffsetMinutes(sourceCity.timezone);
      const targetOffset = getOffsetMinutes(targetCity.timezone);
      const totalOffsetMinutes = targetOffset - sourceOffset;

      let targetTotalMinutes = (hours * 60 + minutes) + totalOffsetMinutes;
      
      let dayDiff = 0;
      if (targetTotalMinutes >= 1440) {
        dayDiff = Math.floor(targetTotalMinutes / 1440);
        targetTotalMinutes %= 1440;
      } else if (targetTotalMinutes < 0) {
        dayDiff = Math.floor(targetTotalMinutes / 1440);
        targetTotalMinutes = (targetTotalMinutes % 1440 + 1440) % 1440;
      }
      
      const targetH = Math.floor(targetTotalMinutes / 60);
      const targetM = Math.round(targetTotalMinutes % 60);
      
      const formatTimePretty = (h: number, m: number) => {
        const d = new Date();
        d.setHours(h);
        d.setMinutes(m);
        return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      };

      const finalSourceTime = formatTimePretty(hours, minutes);
      const finalTargetTime = formatTimePretty(targetH, targetM);
      
      const hoursDiff = totalOffsetMinutes / 60;
      const diffString = hoursDiff > 0 ? `+${hoursDiff.toFixed(1)} HRS` : `${hoursDiff.toFixed(1)} HRS`;

      setConversionResult({
        sourceTime: finalSourceTime,
        targetTime: finalTargetTime,
        timeDifference: diffString,
        isNextDay: dayDiff > 0,
        isPreviousDay: dayDiff < 0,
        dayDifference: dayDiff
      });
      
    } catch (e) {
      console.error("Time conversion error", e);
    }
  }, [inputTime, sourceCity, targetCity]);

  useEffect(() => {
    convertTime();
  }, [convertTime]);

  useEffect(() => {
    if (!sourceCity || !targetCity || !conversionResult) return;
    
    const timer = setTimeout(() => {
        setIsLoadingAi(true);
        getGeminiContext(
          sourceCity.city, 
          conversionResult.sourceTime, 
          targetCity.city, 
          conversionResult.targetTime
        ).then(text => {
          setAiContext(text);
          setIsLoadingAi(false);
        });
    }, 1200); 
    return () => clearTimeout(timer);
  }, [conversionResult, sourceCity, targetCity]);

  const swapCities = () => {
    const temp = sourceCity;
    setSourceCity(targetCity);
    setTargetCity(temp);
  };

  const toggleAdmin = () => {
    setUserRole(prev => prev === UserRole.ADMIN ? UserRole.GUEST : UserRole.ADMIN);
    setShowAdminPanel(false);
  };

  return (
    <div className="min-h-screen text-slate-200 pb-20 relative font-sans">
      <Background />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-slate-950/20 backdrop-blur-xl h-16 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)] border border-white/10">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">Chronos<span className="text-purple-400 font-light">Glass</span></span>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
                <a href="#" className="hover:text-white transition-colors">Features</a>
                <a href="#" className="hover:text-white transition-colors">World Clock</a>
                <a href="#" className="hover:text-white transition-colors">API</a>
             </div>
            <button 
              onClick={toggleAdmin}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all
                ${userRole === UserRole.ADMIN 
                  ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.2)]' 
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-white'}
              `}
            >
              {userRole === UserRole.ADMIN ? <ShieldCheck className="w-3 h-3" /> : null}
              {userRole === UserRole.ADMIN ? 'Admin Active' : 'Sign In'}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-in slide-in-from-bottom-4 fade-in duration-700">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             AI-Powered Time Intelligence
           </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">Time, </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Synchronized.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Instantly convert time across <span className="text-white font-medium">{ALL_CITIES.length.toLocaleString()} cities</span> with AI-driven context for better global connection.
          </p>
        </div>

        {/* Content */}
        {userRole === UserRole.ADMIN && showAdminPanel ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between mb-8">
                <div>
                   <h2 className="text-3xl font-display font-bold text-white">Admin Dashboard</h2>
                   <p className="text-slate-400 text-sm mt-1">Manage your global content strategy.</p>
                </div>
                <button onClick={() => setShowAdminPanel(false)} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white border border-white/10 transition-colors">
                   Exit Dashboard
                </button>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <GlassCard className="lg:col-span-2 p-8">
                  <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                     <div className="p-2 bg-purple-500/20 rounded-lg">
                       <LayoutDashboard className="w-5 h-5 text-purple-400" />
                     </div>
                     <h3 className="text-lg font-semibold text-white">New Article</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Title</label>
                       <input type="text" placeholder="Enter an engaging title..." className="w-full glass-input rounded-xl px-4 py-3 text-sm placeholder:text-slate-600" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Content</label>
                       <textarea placeholder="Write your masterpiece..." className="w-full glass-input rounded-xl px-4 py-3 text-sm h-48 resize-none placeholder:text-slate-600" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-2">
                         <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"><Globe className="w-4 h-4" /></button>
                         <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"><Sparkles className="w-4 h-4" /></button>
                      </div>
                      <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-purple-500/25 transition-all active:scale-95">
                        Publish Post
                      </button>
                    </div>
                  </div>
                </GlassCard>

                <div className="space-y-6">
                   <GlassCard className="p-6">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Live Statistics</h3>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                            <div className="text-2xl font-display font-bold text-white">12k</div>
                            <div className="text-[10px] text-slate-500 uppercase mt-1">Daily Views</div>
                         </div>
                         <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                            <div className="text-2xl font-display font-bold text-purple-300">850</div>
                            <div className="text-[10px] text-slate-500 uppercase mt-1">Conversions</div>
                         </div>
                      </div>
                   </GlassCard>
                   
                   <GlassCard className="p-0 overflow-hidden">
                      <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Recent Posts</h3>
                      </div>
                      <div className="divide-y divide-white/5">
                         {MOCK_POSTS.map(post => (
                           <div key={post.id} className="p-4 hover:bg-white/5 cursor-pointer transition-colors">
                              <div className="font-medium text-slate-200 text-sm mb-1">{post.title}</div>
                              <div className="flex justify-between items-center text-xs text-slate-500">
                                 <span>{post.date}</span>
                                 <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/10">Published</span>
                              </div>
                           </div>
                         ))}
                      </div>
                   </GlassCard>
                </div>
             </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            
            <div className="space-y-8">
              <div className="glass-panel rounded-3xl p-1 shadow-2xl shadow-black/20">
                <div className="bg-slate-950/40 rounded-[22px] p-6 md:p-10 backdrop-blur-sm relative overflow-hidden">
                  
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                  <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-12">
                    
                    <div className="flex-1 min-w-0 space-y-6">
                      <CityAutocomplete
                        label="From Location" 
                        selected={sourceCity} 
                        onSelect={setSourceCity} 
                        isOpen={isSourceOpen} 
                        setIsOpen={(v) => { setIsSourceOpen(v); setIsTargetOpen(false); }}
                      />

                      <div className="relative group">
                         <input 
                            type="time" 
                            value={inputTime}
                            onChange={(e) => setInputTime(e.target.value)}
                            className="w-full bg-transparent text-6xl md:text-7xl font-display font-light text-white p-0 border-none outline-none focus:ring-0 tracking-tight"
                          />
                          <div className="text-sm font-medium text-slate-400 mt-2 flex items-center gap-2">
                             <Sun className="w-4 h-4 text-orange-400" /> Local Time
                          </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center justify-center -my-3 md:my-0 z-20">
                      <div className="h-px md:h-24 w-full md:w-px bg-gradient-to-r md:bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                      <button 
                        onClick={swapCities}
                        className="mx-4 md:mx-0 md:my-4 p-4 rounded-2xl bg-slate-800 border border-white/10 text-slate-400 hover:text-white hover:bg-purple-600 hover:border-purple-500 shadow-xl transition-all duration-300 hover:rotate-180 hover:scale-110 active:scale-95"
                        aria-label="Swap cities"
                      >
                        <ArrowRightLeft className="w-5 h-5" />
                      </button>
                      <div className="h-px md:h-24 w-full md:w-px bg-gradient-to-r md:bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                    </div>

                    <div className="flex-1 min-w-0 space-y-6">
                      <CityAutocomplete 
                        label="To Location" 
                        selected={targetCity} 
                        onSelect={setTargetCity} 
                        isOpen={isTargetOpen} 
                        setIsOpen={(v) => { setIsTargetOpen(v); setIsSourceOpen(false); }}
                      />

                      <div className="relative">
                         <div className="text-6xl md:text-7xl font-display font-light text-white tracking-tight">
                            {conversionResult ? conversionResult.targetTime : '--:--'}
                         </div>
                         <div className="text-sm font-medium text-slate-400 mt-2 flex items-center gap-2">
                             <Moon className="w-4 h-4 text-purple-400" />
                             {conversionResult?.dayDifference === 0 && "Same Day"}
                             {conversionResult?.isNextDay && <span className="text-purple-300">+1 Day</span>}
                             {conversionResult?.isPreviousDay && <span className="text-purple-300">-1 Day</span>}
                             <span className="text-slate-600 mx-2">|</span>
                             <span className={conversionResult?.timeDifference.includes('+') ? 'text-green-400' : 'text-blue-400'}>
                                {conversionResult?.timeDifference}
                             </span>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {conversionResult && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                  <GlassCard className="p-1 relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500"></div>
                     <div className="bg-slate-900/40 p-6 md:p-8 rounded-xl">
                        <div className="flex items-start gap-4">
                           <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 shrink-0">
                              <Sparkles className="w-6 h-6 text-purple-400" />
                           </div>
                           <div className="space-y-2">
                              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                 AI Etiquette Insight
                                 {isLoadingAi && <span className="inline-block w-2 h-2 bg-purple-400 rounded-full animate-ping"/>}
                              </h3>
                              <p className="text-slate-300 leading-relaxed font-light">
                                 {aiContext || "Analyzing timezones for communication advice..."}
                              </p>
                           </div>
                        </div>
                     </div>
                  </GlassCard>
                </div>
              )}
            </div>

            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
               <GlassCard className="p-6">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Sponsored</h3>
                  {/* <AdPlaceholder variant="vertical" /> */}
                  <GoogleAd
                    adSlot="YOUR_AD_SLOT_ID_HERE" 
                    adFormat="vertical"
                    style={{ minHeight: '250px' }}
                    className="w-full"
                  />
               </GlassCard>

               <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <h3 className="text-sm font-bold text-white mb-2">Did you know?</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                     France covers the most time zones (12), thanks to its overseas territories. Russia and the US follow closely behind.
                  </p>
               </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}