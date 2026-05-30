'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import RocketMascot from './RocketMascot';

export default function ThreeScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a nice dark background loader matching Bento theme
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-transparent">
        <div className="relative flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full select-none cursor-pointer">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <pointLight position={[-3, -3, -2]} intensity={0.4} color="#8b5cf6" />
        <pointLight position={[3, 3, 2]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[0, -1, 0.5]} intensity={1.5} color="#ec4899" />

        {/* Mascot */}
        <Suspense fallback={null}>
          <RocketMascot />
        </Suspense>

        {/* Space Star Field */}
        <Stars
          radius={50}
          depth={25}
          count={80}
          factor={3}
          saturation={0.5}
          fade
          speed={1.5}
        />
      </Canvas>
    </div>
  );
}
