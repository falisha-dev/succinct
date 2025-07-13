"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const CONFETTI_COUNT = 50;

type ConfettiPiece = {
  id: number;
  style: React.CSSProperties;
  colorClass: string;
};

export function Confetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newConfetti = Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        transform: `scale(${Math.random() * 0.75 + 0.5})`,
      };
      const colorClass = Math.random() > 0.5 ? 'bg-primary' : 'bg-accent';
      return { id: i, style, colorClass };
    });
    setConfetti(newConfetti);
  }, []);

  if (confetti.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={cn(
            'absolute top-0 h-3 w-3 rounded-full animate-confetti-fall',
            piece.colorClass
          )}
          style={piece.style}
        />
      ))}
    </div>
  );
}
