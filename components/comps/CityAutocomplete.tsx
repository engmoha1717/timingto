/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {
  Check,
  Globe,
  MapPin,
  Search,
  X
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from "react";
import { POPULAR_CITY_NAMES } from '../../constants';
import { City } from '../../types';

import * as cityTimezonesPkg from 'city-timezones';

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
const CityAutocomplete = ({ 
    selected, 
    onSelect, 
    isOpen, 
    setIsOpen,
    label
  }: { 
    selected: City, 
    onSelect: (c: City) => void, 
    isOpen: boolean, 
    setIsOpen: (v: boolean) => void,
    label: string
  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Filter cities based on search (Optimized)
    const filteredCities = useMemo(() => {
      // Ensure we have data
      if (!ALL_CITIES || ALL_CITIES.length === 0) return [];

      if (!searchTerm) {
        // Return popular cities if no search, checking they exist in dataset
        const popular = ALL_CITIES.filter(c => POPULAR_CITY_NAMES.includes(c.city)).slice(0, 10);
        return popular.length > 0 ? popular : ALL_CITIES.slice(0, 10);
      }
      const termLower = searchTerm.toLowerCase();
      // Performance optimization: Limit results to 50
      return ALL_CITIES.filter(c => 
        (c.city && c.city.toLowerCase().startsWith(termLower)) || 
        (c.country && c.country.toLowerCase().includes(termLower))
      ).slice(0, 50);
    }, [searchTerm]);

    useEffect(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isOpen]);

    if (!selected) return null;

    return (
      <div className="relative">
        <div className="flex justify-between items-center mb-2 px-1">
           <label className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">{label}</label>
        </div>
        
        {!isOpen ? (
          <button 
            onClick={() => setIsOpen(true)}
            className="w-full group relative overflow-hidden rounded-2xl glass-input p-4 text-left transition-all hover:bg-white/10 active:scale-[0.99]"
          >
             <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="flex items-center justify-between relative z-10">
               <div className="min-w-0">
                  <div className="text-3xl font-display font-bold text-white tracking-tight truncate">{selected.city}</div>
                  <div className="text-sm text-slate-400 font-light flex items-center gap-1.5 mt-1 truncate">
                    <Globe className="w-3 h-3 shrink-0" /> {selected.country}
                  </div>
               </div>
               <MapPin className="w-5 h-5 text-purple-400 opacity-50 group-hover:opacity-100 transition-all group-hover:-translate-y-1 shrink-0 ml-2" />
             </div>
          </button>
        ) : (
          <div className="absolute inset-0 z-50">
             <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 h-[300px] flex flex-col">
                <div className="p-3 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl flex items-center gap-2">
                   <Search className="w-4 h-4 text-purple-400" />
                   <input
                     ref={inputRef}
                     type="text"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     placeholder="Search city or country..."
                     className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-slate-500 h-8"
                   />
                   <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-1 hover:bg-white/10 rounded-full">
                     <X className="w-4 h-4 text-slate-400" />
                   </button>
                </div>
                <div className="overflow-y-auto flex-1 p-1 custom-scrollbar bg-red-700">
                   {filteredCities.length === 0 ? (
                      <div className="p-4 text-center text-sm text-slate-500">No cities found</div>
                   ) : (
                      filteredCities.map((city, idx) => (
                        <button
                          key={`${city.city}-${city.iso2}-${idx}`}
                          onClick={() => { onSelect(city); setIsOpen(false); setSearchTerm(''); }}
                          className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 flex items-center justify-between group transition-colors"
                        >
                          <div className="min-w-0">
                            <div className="font-medium text-slate-200 group-hover:text-white truncate">{city.city}</div>
                            <div className="text-xs text-slate-500 group-hover:text-slate-400 truncate">{city.country}</div>
                          </div>
                          {selected.city === city.city && <Check className="w-4 h-4 text-purple-400 shrink-0 ml-2" />}
                        </button>
                      ))
                   )}
                </div>
             </div>
          </div>
        )}
      </div>
    );
  };

export default CityAutocomplete;