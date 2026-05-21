'use client';

import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Star,
  BadgeCheck,
  Building2,
  User,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Heart,
  X as XIcon,
  MessageCircle,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { getListingById, getInitials, stringToColor, MOCK_LISTINGS } from '@/lib/mock-data';
import { ListingCard } from '@/components/marketplace/ListingCard';

/**
 * Listing Details Page — `/feed/[id]`
 *
 * Shows full details for a single listing.
 * Features:
 * - Back navigation
 * - Large avatar + cover header
 * - Full description
 * - Stats (rating, match score, experience/company size)
 * - All tags
 * - Swipe action buttons (Pass / Like / Super Like)
 * - "Similar listings" section
 */
export default function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const listing = getListingById(id);

  if (!listing) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#111827] border border-white/10 flex items-center justify-center mb-5">
            <XIcon className="w-7 h-7 text-[#64748B]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Listing not found
          </h2>
          <p className="text-sm text-[#64748B] mb-6">
            This listing may have been removed or doesn&apos;t exist.
          </p>
          <Link
            href="/feed"
            className="px-6 py-3 rounded-xl bg-[#0EA5A5] text-white text-sm font-bold hover:bg-[#0c8e8e] transition-all active:scale-95"
          >
            Back to Marketplace
          </Link>
        </div>
      </AppLayout>
    );
  }

  const avatarColor = stringToColor(listing.name);
  const initials = getInitials(listing.name);
  const isBusiness = listing.type === 'business';

  // Get similar listings (same category, exclude current)
  const similarListings = MOCK_LISTINGS.filter(
    (l) => l.category === listing.category && l.id !== listing.id
  ).slice(0, 3);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto pb-8">
        {/* ── Cover + Header ── */}
        <div className="relative">
          {/* Cover gradient */}
          <div
            className="h-44 w-full"
            style={{
              background: isBusiness
                ? `linear-gradient(135deg, ${avatarColor}44, #0D1B2A 80%)`
                : `linear-gradient(135deg, ${avatarColor}55, #111827 80%)`,
            }}
          />

          {/* Back button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/50 transition-all active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Share button */}
          <button
            type="button"
            className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/50 transition-all active:scale-95"
            aria-label="Share listing"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Match score overlay */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
            <span className="text-xs font-black text-[#0EA5A5] tracking-widest">
              {listing.matchScore}% MATCH
            </span>
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-white font-black text-2xl border-4 border-[#0D1B2A] shadow-2xl"
              style={{ backgroundColor: avatarColor }}
              aria-hidden="true"
            >
              {initials}
            </div>
          </div>
        </div>

        {/* ── Profile info ── */}
        <div className="pt-14 px-5">
          {/* Name + type + verified */}
          <div className="text-center mb-5">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h1 className="text-xl font-black text-white tracking-tight">
                {listing.name}
              </h1>
              {listing.verified && (
                <BadgeCheck
                  className="w-5 h-5 text-[#0EA5A5]"
                  aria-label="Verified"
                />
              )}
            </div>
            <p className="text-sm text-[#94A3B8] font-medium">
              {listing.title}
            </p>

            {/* Type + Location row */}
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-[#64748B]">
                {isBusiness ? (
                  <Building2 className="w-3.5 h-3.5 text-[#FF7A00]" />
                ) : (
                  <User className="w-3.5 h-3.5 text-[#0EA5A5]" />
                )}
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {listing.type}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#64748B]">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">
                  {listing.location}
                </span>
              </div>
            </div>
          </div>

          {/* ── Stats row ── */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="flex flex-col items-center p-3 rounded-xl bg-[#111827] border border-white/[0.06]">
              <Star className="w-4 h-4 text-[#FF7A00] fill-[#FF7A00] mb-1" />
              <span className="text-lg font-black text-white">
                {listing.rating}
              </span>
              <span className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider">
                Rating
              </span>
            </div>

            <div className="flex flex-col items-center p-3 rounded-xl bg-[#111827] border border-white/[0.06]">
              {isBusiness ? (
                <Users className="w-4 h-4 text-[#0EA5A5] mb-1" />
              ) : (
                <Clock className="w-4 h-4 text-[#0EA5A5] mb-1" />
              )}
              <span className="text-lg font-black text-white">
                {isBusiness ? listing.companySize || '—' : listing.experience || '—'}
              </span>
              <span className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider">
                {isBusiness ? 'Team' : 'Experience'}
              </span>
            </div>

            <div className="flex flex-col items-center p-3 rounded-xl bg-[#111827] border border-white/[0.06]">
              {isBusiness ? (
                <Briefcase className="w-4 h-4 text-[#FF7A00] mb-1" />
              ) : (
                <DollarSign className="w-4 h-4 text-[#FF7A00] mb-1" />
              )}
              <span className="text-lg font-black text-white">
                {isBusiness ? listing.category : listing.hourlyRate || '—'}
              </span>
              <span className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider">
                {isBusiness ? 'Industry' : 'Rate'}
              </span>
            </div>
          </div>

          {/* ── About section ── */}
          <section className="mb-6">
            <h2 className="text-xs font-black text-[#64748B] uppercase tracking-widest mb-3">
              About
            </h2>
            <div className="p-4 rounded-2xl bg-[#111827] border border-white/[0.06]">
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                {listing.description}
              </p>
            </div>
          </section>

          {/* ── Category ── */}
          <section className="mb-6">
            <h2 className="text-xs font-black text-[#64748B] uppercase tracking-widest mb-3">
              Category
            </h2>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0EA5A5]/10 border border-[#0EA5A5]/20 text-[#0EA5A5] text-sm font-bold">
              {listing.category}
            </span>
          </section>

          {/* ── Skills / Tags ── */}
          <section className="mb-6">
            <h2 className="text-xs font-black text-[#64748B] uppercase tracking-widest mb-3">
              {isBusiness ? 'Specializations' : 'Skills & Expertise'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {listing.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-[#CBD5E1] tracking-wide hover:border-[#0EA5A5]/30 hover:text-[#0EA5A5] transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* ── Action buttons (Swipe actions) ── */}
          <section className="mb-8">
            <div className="flex items-center justify-center gap-4">
              {/* Pass */}
              <button
                type="button"
                className="w-14 h-14 rounded-full bg-[#111827] border border-white/10 flex items-center justify-center text-[#EF4444] hover:bg-[#EF4444]/10 hover:border-[#EF4444]/30 transition-all active:scale-90 shadow-lg"
                aria-label="Pass on this listing"
              >
                <XIcon className="w-6 h-6" />
              </button>

              {/* Super Like / Message */}
              <button
                type="button"
                className="w-12 h-12 rounded-full bg-[#111827] border border-white/10 flex items-center justify-center text-[#0EA5A5] hover:bg-[#0EA5A5]/10 hover:border-[#0EA5A5]/30 transition-all active:scale-90"
                aria-label="Send a message"
              >
                <MessageCircle className="w-5 h-5" />
              </button>

              {/* Like */}
              <button
                type="button"
                className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#E06A00] flex items-center justify-center text-white shadow-[0_0_24px_rgba(255,122,0,0.3)] hover:shadow-[0_0_32px_rgba(255,122,0,0.5)] transition-all active:scale-90"
                aria-label="Like this listing"
              >
                <Heart className="w-6 h-6" />
              </button>
            </div>
            <p className="text-center text-[10px] text-[#475569] mt-3 font-medium uppercase tracking-widest">
              Swipe right to connect
            </p>
          </section>

          {/* ── Contact / Connect CTA ── */}
          <section className="mb-8">
            <button
              type="button"
              className="w-full py-4 rounded-2xl bg-[#FF7A00] text-white font-black text-sm uppercase tracking-widest hover:bg-[#e66e00] transition-all active:scale-[0.98] shadow-lg shadow-[#FF7A00]/20 flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Connect with {listing.name.split(' ')[0]}
            </button>
          </section>

          {/* ── Similar listings ── */}
          {similarListings.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-black text-[#64748B] uppercase tracking-widest">
                  Similar Listings
                </h2>
                <Link
                  href="/feed"
                  className="text-[11px] font-bold text-[#0EA5A5] hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {similarListings.map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
