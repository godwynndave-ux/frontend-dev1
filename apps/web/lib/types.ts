/** Shared types for the PARAPair marketplace */

export type UserMode = 'work-sell' | 'hire-buy';

export type ListingType = 'person' | 'business';

export interface Listing {
  id: string;
  type: ListingType;
  name: string;
  title: string;
  description: string;
  avatar: string;
  coverImage: string;
  category: string;
  tags: string[];
  location: string;
  rating: number;
  matchScore: number;
  verified: boolean;
  mode: UserMode;
  createdAt: string;
  hourlyRate?: string;
  companySize?: string;
  experience?: string;
}

export const WORK_SELL_CATEGORIES = [
  'Jobs',
  'Freelance Work',
  'Internships',
  'Collaborations',
  'Clients',
  'Employment',
  'Services',
  'Partnerships',
  'Projects',
  'Business Opportunities',
] as const;

export const HIRE_BUY_CATEGORIES = [
  'Technology',
  'Engineering',
  'Baking',
  'Design',
  'Marketing',
  'Healthcare',
  'Construction',
  'Education',
  'AI & Data Science',
  'Finance',
  'Legal Services',
  'Creative Arts',
] as const;
