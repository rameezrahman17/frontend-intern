'use client';

import React, { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate hearts on client side to avoid hydration mismatch
    const generatedHearts: Heart[] = Array.from({ length: 18 }).map((_, i) => {
      const size = Math.random() * 20 + 10; // 10px to 30px
      const left = `${Math.random() * 100}%`;
      const delay = `${Math.random() * 10}s`;
      const duration = `${Math.random() * 10 + 10}s`; // 10s to 20s
      const opacity = Math.random() * 0.2 + 0.1; // 0.1 to 0.3
      return { id: i, left, size, delay, duration, opacity };
    });
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            opacity: heart.opacity,
            fill: 'var(--accent)',
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  );
}
