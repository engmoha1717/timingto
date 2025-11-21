/* eslint-disable @typescript-eslint/no-explicit-any */
// ============================================
// FILE: components/TimeConverter.tsx 
// COPY THIS - REPLACE THE OLD ONE
// ============================================
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { formatInTimeZone, toDate } from "date-fns-tz";
import cityTimezones from "city-timezones";
import { Search, Clock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface City {
  city: string;
  country: string;
  timezone: string;
}

export function TimeConverter() {
  const [fromCity, setFromCity] = useState<City | null>(null);
  const [toCity, setToCity] = useState<City | null>(null);
  const [inputTime, setInputTime] = useState("");
  const [convertedTime, setConvertedTime] = useState("");
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState<City[]>([]);
  const [toSuggestions, setToSuggestions] = useState<City[]>([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const getCitySuggestions = (query: string): City[] => {
    if (!query || query.length < 2) return [];
    
    const cities = cityTimezones.findFromCityStateProvince(query);
    return cities
      .slice(0, 8)
      .map((c: any) => ({
        city: c.city,
        country: c.country,
        timezone: c.timezone,
      }));
  };

  useEffect(() => {
    setFromSuggestions(getCitySuggestions(fromSearch));
  }, [fromSearch]);

  useEffect(() => {
    setToSuggestions(getCitySuggestions(toSearch));
  }, [toSearch]);

  const convertTime = () => {
    if (!fromCity || !toCity || !inputTime) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      // Get today's date
      const today = new Date();
      const dateStr = format(today, 'yyyy-MM-dd');
      
      // Create ISO string with the input time
      const isoString = `${dateStr}T${inputTime}:00`;
      
      // This is the KEY: We interpret this time AS IF it's in the source timezone
      // Then get the actual moment in time (UTC internally)
      const sourceTime = toDate(isoString, { timeZone: fromCity.timezone });
      
      // Now format that same moment in the destination timezone
      const result = formatInTimeZone(sourceTime, toCity.timezone, 'h:mm a');
      const fullDate = formatInTimeZone(sourceTime, toCity.timezone, 'EEEE, MMMM d, yyyy');
      
      setConvertedTime(result);
      toast.success(`${fullDate} at ${result} in ${toCity.city}`);
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Error converting time. Please check your input.");
    }
  };

  return (
    <Card className="backdrop-blur-2xl bg-white/40 dark:bg-gray-800/40 border border-white/30 shadow-2xl p-6 md:p-8 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* From City */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center">
            <Search className="w-4 h-4 mr-2" />
            From City
          </label>
          <div className="relative">
            <Input
              placeholder="New York, Tokyo, London..."
              value={fromSearch}
              onChange={(e) => {
                setFromSearch(e.target.value);
                setShowFromDropdown(true);
              }}
              onFocus={() => setShowFromDropdown(true)}
              onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
              className="backdrop-blur-sm bg-white/60 dark:bg-gray-700/60 border-white/40"
            />
            {showFromDropdown && fromSuggestions.length > 0 && (
              <div className="absolute z-20 w-full mt-2 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border border-white/30 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                {fromSuggestions.map((city, idx) => (
                  <button
                    key={idx}
                    className="w-full px-4 py-3 text-left hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                    onClick={() => {
                      setFromCity(city);
                      setFromSearch(`${city.city}, ${city.country}`);
                      setShowFromDropdown(false);
                    }}
                  >
                    <div className="font-medium text-gray-800 dark:text-white">{city.city}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{city.country}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          {fromCity && (
            <div className="px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-sm text-indigo-700 dark:text-indigo-300">
              ✓ {fromCity.city}, {fromCity.country}
            </div>
          )}
        </div>

        {/* To City */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center">
            <Search className="w-4 h-4 mr-2" />
            To City
          </label>
          <div className="relative">
            <Input
              placeholder="Helsinki, Paris, Sydney..."
              value={toSearch}
              onChange={(e) => {
                setToSearch(e.target.value);
                setShowToDropdown(true);
              }}
              onFocus={() => setShowToDropdown(true)}
              onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
              className="backdrop-blur-sm bg-white/60 dark:bg-gray-700/60 border-white/40"
            />
            {showToDropdown && toSuggestions.length > 0 && (
              <div className="absolute z-20 w-full mt-2 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border border-white/30 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                {toSuggestions.map((city, idx) => (
                  <button
                    key={idx}
                    className="w-full px-4 py-3 text-left hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                    onClick={() => {
                      setToCity(city);
                      setToSearch(`${city.city}, ${city.country}`);
                      setShowToDropdown(false);
                    }}
                  >
                    <div className="font-medium text-gray-800 dark:text-white">{city.city}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{city.country}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          {toCity && (
            <div className="px-3 py-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-sm text-purple-700 dark:text-purple-300">
              ✓ {toCity.city}, {toCity.country}
            </div>
          )}
        </div>
      </div>

      {/* Time Input */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          Time in {fromCity?.city || "source city"}
        </label>
        <Input
          type="time"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          className="backdrop-blur-sm bg-white/60 dark:bg-gray-700/60 border-white/40 text-lg"
        />
      </div>

      {/* Convert Button */}
      <Button
        onClick={convertTime}
        className="w-full h-14 text-lg font-semibold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all"
      >
        Convert Time
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>

      {/* Result */}
      {convertedTime && (
        <div className="text-center p-8 rounded-2xl backdrop-blur-xl bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-white/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Time in {toCity?.city}
          </div>
          <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {convertedTime}
          </div>
        </div>
      )}
    </Card>
  );
}