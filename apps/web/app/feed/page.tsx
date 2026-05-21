'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ModeToggle } from '@/components/marketplace/ModeToggle';
import { CategoryFilter } from '@/components/marketplace/CategoryFilter';
import { ListingCard } from '@/components/marketplace/ListingCard';
import { ListingCardSkeleton } from '@/components/marketplace/ListingCardSkeleton';
import { EmptyState } from '@/components/marketplace/EmptyState';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import {
  UserMode,
  WORK_SELL_CATEGORIES,
  HIRE_BUY_CATEGORIES,
} from '@/lib/types';

/**
 * Marketplace Feed Page — `/feed`
 *
 * Architecture:
 * - ModeToggle at top toggles between Work/Sell and Hire/Buy
 * - CategoryFilter is a horizontal scrollable chip bar
 * - Grid of ListingCards (1 col mobile, 2 col tablet, 3 col desktop)
 * - Search bar with real-time filtering
 * - Loading skeleton state simulated on mount
 * - Empty state when no results match
 */
export default function FeedPage() {
  const [mode, setMode] = useState<UserMode>('hire-buy');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  });

  const categories =
    mode === 'work-sell' ? WORK_SELL_CATEGORIES : HIRE_BUY_CATEGORIES;

  // Reset category when mode changes
  const handleModeChange = useCallback((newMode: UserMode) => {
    setMode(newMode);
    setSelectedCategory('All');
    setSearchQuery('');
  }, []);

  // Filter listings
  const filteredListings = useMemo(() => {
    let results = MOCK_LISTINGS;

    // Filter by category
    if (selectedCategory !== 'All') {
      results = results.filter((l) => l.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.title.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return results;
  }, [selectedCategory, searchQuery]);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-8">
        {/* ── Header ── */}
        <header className="mb-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Marketplace
              </h1>
              <p className="text-xs text-[#64748B] font-medium mt-0.5">
                Discover your next opportunity
              </p>
            </div>

            {/* Search toggle + filter button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSearchOpen((o) => !o)}
                className="w-10 h-10 rounded-xl bg-[#111827] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-white/20 transition-all active:scale-95"
                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
              >
                {isSearchOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-xl bg-[#111827] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-white/20 transition-all active:scale-95"
                aria-label="Filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search bar — collapsible */}
          {isSearchOpen && (
            <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search listings, skills, categories..."
                  className="w-full h-11 rounded-xl bg-[#111827] border border-white/10 pl-10 pr-4 text-sm text-white placeholder:text-[#475569] outline-none focus:border-[#0EA5A5]/50 focus:shadow-[0_0_16px_rgba(14,165,165,0.1)] transition-all"
                  autoFocus
                  aria-label="Search marketplace listings"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Mode toggle */}
          <div className="flex justify-center mb-4">
            <ModeToggle mode={mode} onToggle={handleModeChange} />
          </div>

          {/* Category filter */}
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </header>

        {/* ── Results count ── */}
        {!isLoading && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] text-[#64748B] font-semibold uppercase tracking-widest">
              {filteredListings.length} listing
              {filteredListings.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && (
                <span className="text-[#0EA5A5]">
                  {' '}
                  in {selectedCategory}
                </span>
              )}
            </p>
          </div>
        )}

        {/* ── Listing grid ── */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <ListingCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
