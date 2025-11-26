/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cityTimezonesPkg from 'city-timezones';
import { City } from './types';

export const getCityData = (): City[] => {
  try {
    const pkg = cityTimezonesPkg as any;
    const cities = pkg.cityMapping || pkg.default?.cityMapping;
    
    if (Array.isArray(cities) && cities.length > 0) {
      return cities as City[];
    }
  } catch (e) {
    console.warn("Error accessing city-timezones package:", e);
  }

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

export const ALL_CITIES = getCityData();

export const findCity = (name: string): City => {
  const found = ALL_CITIES.find(c => c.city === name || c.city_ascii === name);
  return found || ALL_CITIES[0];
};