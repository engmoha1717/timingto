import { BlogPost } from './types';

// We now rely on 'city-timezones' for the city data.
// These mock posts are for the admin/content demo.

export const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Mastering Remote Work Across Timezones',
    excerpt: 'Tips and tricks for maintaining productivity when your team is spread across the globe.',
    date: 'Oct 24, 2023',
    readTime: '5 min read',
    author: 'Admin'
  },
  {
    id: '2',
    title: 'The Science of Circadian Rhythms',
    excerpt: 'How understanding your biological clock can help you schedule better meetings.',
    date: 'Oct 28, 2023',
    readTime: '3 min read',
    author: 'Admin'
  },
  {
    id: '3',
    title: 'Travel Hacking: Beating Jet Lag',
    excerpt: 'Top strategies from frequent flyers on how to adjust to new timezones instantly.',
    date: 'Nov 02, 2023',
    readTime: '7 min read',
    author: 'Admin'
  }
];

export const POPULAR_CITY_NAMES = [
  "New York", "London", "Tokyo", "Paris", "Berlin", "Dubai", "Sydney", 
  "Singapore", "Los Angeles", "Helsinki", "Shanghai", "Mumbai"
];