import { Listing } from './types';

/**
 * Mock listings for the marketplace feed.
 * In production, these come from the API via React Query.
 * Using placeholder avatar colors since we have no real images.
 */
export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    type: 'person',
    name: 'Sarah Chen',
    title: 'Senior Full-Stack Developer',
    description:
      'Experienced developer with 8+ years in React, Node.js, and cloud infrastructure. Passionate about building scalable SaaS products and mentoring junior devs. Open to freelance projects and long-term collaborations.',
    avatar: '',
    coverImage: '',
    category: 'Technology',
    tags: ['React', 'Node.js', 'AWS', 'TypeScript'],
    location: 'San Francisco, CA',
    rating: 4.9,
    matchScore: 95,
    verified: true,
    mode: 'work-sell',
    createdAt: '2025-05-18T10:00:00Z',
    hourlyRate: '$120/hr',
    experience: '8 years',
  },
  {
    id: '2',
    type: 'business',
    name: 'NovaTech Solutions',
    title: 'AI-Powered Marketing Agency',
    description:
      'We help startups and SMBs scale with data-driven marketing strategies. Looking for talented designers, copywriters, and data analysts to join our growing team.',
    avatar: '',
    coverImage: '',
    category: 'Marketing',
    tags: ['AI', 'Growth', 'SEO', 'Analytics'],
    location: 'Austin, TX',
    rating: 4.7,
    matchScore: 88,
    verified: true,
    mode: 'hire-buy',
    createdAt: '2025-05-17T08:00:00Z',
    companySize: '25-50',
  },
  {
    id: '3',
    type: 'person',
    name: 'Marcus Rivera',
    title: 'UX/UI Designer & Brand Strategist',
    description:
      'Award-winning designer specializing in mobile-first experiences and brand identity. I transform complex user flows into intuitive, beautiful interfaces. Let\u2019s create something amazing together.',
    avatar: '',
    coverImage: '',
    category: 'Design',
    tags: ['Figma', 'Branding', 'Mobile UI', 'Prototyping'],
    location: 'New York, NY',
    rating: 4.8,
    matchScore: 92,
    verified: true,
    mode: 'work-sell',
    createdAt: '2025-05-16T14:00:00Z',
    hourlyRate: '$95/hr',
    experience: '6 years',
  },
  {
    id: '4',
    type: 'business',
    name: 'BuildRight Construction',
    title: 'Commercial & Residential Contractor',
    description:
      'Licensed general contractor with 15+ years of experience in commercial and residential construction. Currently looking for skilled electricians, plumbers, and project managers.',
    avatar: '',
    coverImage: '',
    category: 'Construction',
    tags: ['Commercial', 'Residential', 'Renovation', 'Green Building'],
    location: 'Chicago, IL',
    rating: 4.6,
    matchScore: 75,
    verified: true,
    mode: 'hire-buy',
    createdAt: '2025-05-15T09:00:00Z',
    companySize: '50-100',
  },
  {
    id: '5',
    type: 'person',
    name: 'Aisha Patel',
    title: 'Data Scientist & ML Engineer',
    description:
      'Specializing in NLP, computer vision, and predictive analytics. Published researcher with experience at top tech companies. Available for consulting and contract work.',
    avatar: '',
    coverImage: '',
    category: 'AI & Data Science',
    tags: ['Python', 'TensorFlow', 'NLP', 'MLOps'],
    location: 'Seattle, WA',
    rating: 4.9,
    matchScore: 97,
    verified: true,
    mode: 'work-sell',
    createdAt: '2025-05-14T11:00:00Z',
    hourlyRate: '$150/hr',
    experience: '10 years',
  },
  {
    id: '6',
    type: 'business',
    name: 'SweetCraft Bakery',
    title: 'Artisan Bakery & Catering',
    description:
      'Award-winning bakery specializing in custom cakes, pastries, and catering for events. Looking for talented pastry chefs and delivery partners in the metro area.',
    avatar: '',
    coverImage: '',
    category: 'Baking',
    tags: ['Custom Cakes', 'Catering', 'Pastries', 'Events'],
    location: 'Portland, OR',
    rating: 4.8,
    matchScore: 70,
    verified: false,
    mode: 'hire-buy',
    createdAt: '2025-05-13T07:00:00Z',
    companySize: '10-25',
  },
  {
    id: '7',
    type: 'person',
    name: 'James Okafor',
    title: 'Healthcare Consultant',
    description:
      'Former hospital administrator with deep expertise in healthcare operations, compliance, and digital health transformation. Available for advisory and project-based work.',
    avatar: '',
    coverImage: '',
    category: 'Healthcare',
    tags: ['Health IT', 'Compliance', 'Telehealth', 'Operations'],
    location: 'Boston, MA',
    rating: 4.7,
    matchScore: 82,
    verified: true,
    mode: 'work-sell',
    createdAt: '2025-05-12T13:00:00Z',
    hourlyRate: '$175/hr',
    experience: '12 years',
  },
  {
    id: '8',
    type: 'business',
    name: 'EduPrime Academy',
    title: 'Online Learning Platform',
    description:
      'Building the future of online education. We connect expert instructors with learners worldwide. Looking for course creators in tech, business, and creative fields.',
    avatar: '',
    coverImage: '',
    category: 'Education',
    tags: ['E-Learning', 'Courses', 'EdTech', 'Tutoring'],
    location: 'Remote',
    rating: 4.5,
    matchScore: 85,
    verified: true,
    mode: 'hire-buy',
    createdAt: '2025-05-11T16:00:00Z',
    companySize: '10-25',
  },
  {
    id: '9',
    type: 'person',
    name: 'Elena Vasquez',
    title: 'Finance & Investment Advisor',
    description:
      'CFA charterholder with expertise in portfolio management, startup fundraising, and financial modeling. Helping businesses and individuals make smarter financial decisions.',
    avatar: '',
    coverImage: '',
    category: 'Finance',
    tags: ['Investment', 'Fundraising', 'Financial Modeling', 'Crypto'],
    location: 'Miami, FL',
    rating: 4.8,
    matchScore: 78,
    verified: true,
    mode: 'work-sell',
    createdAt: '2025-05-10T10:00:00Z',
    hourlyRate: '$200/hr',
    experience: '9 years',
  },
  {
    id: '10',
    type: 'business',
    name: 'PixelForge Studios',
    title: 'Creative Design Agency',
    description:
      'Full-service creative agency specializing in motion graphics, 3D visualization, and brand content. Looking for talented animators and video editors to join our remote team.',
    avatar: '',
    coverImage: '',
    category: 'Creative Arts',
    tags: ['Motion Graphics', '3D', 'Video', 'Animation'],
    location: 'Los Angeles, CA',
    rating: 4.9,
    matchScore: 91,
    verified: true,
    mode: 'hire-buy',
    createdAt: '2025-05-09T12:00:00Z',
    companySize: '10-25',
  },
  {
    id: '11',
    type: 'person',
    name: 'David Kim',
    title: 'DevOps & Cloud Engineer',
    description:
      'Kubernetes certified. Expert in CI/CD pipelines, infrastructure as code, and cloud migrations. Available for contract and consulting roles.',
    avatar: '',
    coverImage: '',
    category: 'Engineering',
    tags: ['Kubernetes', 'Terraform', 'CI/CD', 'GCP'],
    location: 'Denver, CO',
    rating: 4.6,
    matchScore: 86,
    verified: true,
    mode: 'work-sell',
    createdAt: '2025-05-08T09:00:00Z',
    hourlyRate: '$140/hr',
    experience: '7 years',
  },
  {
    id: '12',
    type: 'business',
    name: 'LegalEdge Partners',
    title: 'Corporate & IP Law Firm',
    description:
      'Boutique law firm focused on startup legal needs: incorporation, IP protection, contracts, and compliance. Looking for associate attorneys and paralegals.',
    avatar: '',
    coverImage: '',
    category: 'Legal Services',
    tags: ['Startup Law', 'IP', 'Contracts', 'Compliance'],
    location: 'Washington, DC',
    rating: 4.7,
    matchScore: 73,
    verified: true,
    mode: 'hire-buy',
    createdAt: '2025-05-07T15:00:00Z',
    companySize: '10-25',
  },
];

/** Get a single listing by ID */
export function getListingById(id: string): Listing | undefined {
  return MOCK_LISTINGS.find((l) => l.id === id);
}

/** Filter listings by category */
export function filterByCategory(category: string | null): Listing[] {
  if (!category || category === 'All') return MOCK_LISTINGS;
  return MOCK_LISTINGS.filter((l) => l.category === category);
}

/** Get avatar initials from a name */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/** Generate a deterministic color from a string (for avatar backgrounds) */
export function stringToColor(str: string): string {
  const palette = [
    '#0EA5A5',
    '#FF7A00',
    '#6366F1',
    '#EC4899',
    '#14B8A6',
    '#F59E0B',
    '#8B5CF6',
    '#EF4444',
    '#10B981',
    '#3B82F6',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
}
