'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function OptimizedImage({ src, alt, className, priority = false }: any) {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-white/5 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={`object-cover transition-all duration-700 ease-premium ${isReady ? 'scale-100 blur-0' : 'scale-110 blur-2xl'}`}
        onLoadingComplete={() => setIsReady(true)}
      />
    </div>
  );
}