export interface Pricing {
  weekday: number;
  weekend: number;
}

export interface Feature {
  text: string;
  isWow?: boolean; // Highlight "Wow" factors
  isValue?: boolean; // Highlight "High value, low cost" items
  isRecommended?: boolean; // Highlight "Recommended" items
  description?: string;
}

export interface Package {
  id: string;
  name: string;
  tagline: string;
  price: Pricing;
  description: string; // The "Result" description (Peace of mind, etc.)
  features: Feature[];
  isPopular?: boolean;
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number; // Flat price or base price
  category: 'media' | 'entertainment' | 'decor' | 'activity';
  description?: string;
}

export interface Review {
  id: number;
  author: string;
  date: string;
  source: string;
  verified: boolean;
  text: string;
}

export type DayType = 'weekday' | 'weekend';