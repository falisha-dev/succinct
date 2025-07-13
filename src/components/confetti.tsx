"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const CONFETTI_COUNT = 50;

export function Confetti() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const confetti = Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      transform: `scale(${Math.random() * 0.75 + 0.5})`,
    };
    const colorClass = Math.random() > 0.5 ? 'bg-primary' : 'bg-accent';

    return (
      <div
        key={i}
        className={cn(
          'absolute top-0 h-3 w-3 rounded-full animate-confetti-fall',
          colorClass
        )}
        style={style}
      />
    );
  });

  return <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">{confetti}</div>;
}
