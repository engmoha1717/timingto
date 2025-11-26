export interface City {
  city: string;
  city_ascii: string;
  lat: number;
  lng: number;
  pop: number | string; // Handled string population just in case
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
  GUEST = 'GUEST',
  ADMIN = 'ADMIN'
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
}
