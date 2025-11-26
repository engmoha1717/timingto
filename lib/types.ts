export interface City {
  city: string;
  city_ascii: string;
  lat: number;
  lng: number;
  // pop: number;
  pop: string | number; 
  country: string;
  iso2: string;
  iso3: string;
  province: string;
  timezone: string;
}

export interface ConversionResult {
  sourceTime: string;
  targetTime: string;
  timeDifference: string;
  isNextDay: boolean;
  isPreviousDay: boolean;
  dayDifference: number;
}

export enum UserRole {
  GUEST = 'guest',
  ADMIN = 'admin',
}