'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// LAZY LOADING: Code split the heavy dashboard component
const AdminDashboard = dynamic(() => import('./dashboard/page'), {
  loading: () => (
    <div className="h-[60vh] w-full flex items-center justify-center">
      <Loader2 className="animate-spin text-brand-teal" size={32} />
    </div>
  ),
  ssr: false // Desktop-heavy dashboards don't need SSR hydration
});

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminDashboard />
    </Suspense>
  );
}