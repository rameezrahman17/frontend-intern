'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function RocketMascot() {
  const groupRef = useRef<THREE.Group>(null);
  const rocketRef = useRef<THREE.Group>(null);
  const exhaustRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse coordinates on window
  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse positions to -1 to 1
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // 1. Gentle bobbing (floating in space)
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.15;
      
      // 2. Mouse tracking: rotate the whole scene slightly towards cursor
      const targetRotX = mouse.current.y * 0.35;
      const targetRotY = mouse.current.x * 0.35;

      // Smooth interpolation (lerp)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.05
      );
    }

    if (rocketRef.current) {
      // 3. Subtle bank roll based on mouse X motion
      const targetRoll = -mouse.current.x * 0.2;
      rocketRef.current.rotation.z = THREE.MathUtils.lerp(
        rocketRef.current.rotation.z,
        targetRoll,
        0.05
      );
      
      // Hover effect: tilt rocket back slightly for liftoff stance
      const targetPitch = hovered ? 0.3 : 0;
      rocketRef.current.rotation.x = THREE.MathUtils.lerp(
        rocketRef.current.rotation.x,
        targetPitch,
        0.05
      );
    }

    // 4. Animate exhaust flames / particles
    if (exhaustRef.current) {
      const positions = exhaustRef.current.geometry.attributes.position.array as Float32Array;
      const speed = hovered ? 0.08 : 0.04;
      for (let i = 1; i < positions.length; i += 3) {
        // Move Y down (exhaust direction is negative Y)
        positions[i] -= speed * (0.5 + Math.random() * 0.5);
        // Reset particle if it goes too low
        if (positions[i] < -2.2) {
          positions[i] = -0.6; // Start just below engine
          positions[i - 1] = (Math.random() - 0.5) * 0.2; // Random X dispersion
          positions[i + 1] = (Math.random() - 0.5) * 0.2; // Random Z dispersion
        }
      }
      exhaustRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Generate exhaust particles
  const particleCount = 40;
  const particles = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.2; // X
      pos[i * 3 + 1] = -0.6 - Math.random() * 1.5; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.2; // Z
    }
    return pos;
  }, []);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={0.95}
    >
      <group ref={rocketRef}>
        {/* === ROCKET MODULE === */}
        {/* Rocket Main Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.42, 1.4, 24]} />
          <meshStandardMaterial
            color="#27272a"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Rocket Nose Cone */}
        <mesh position={[0, 0.9, 0]}>
          <coneGeometry args={[0.35, 0.5, 24]} />
          <meshStandardMaterial
            color="#ec4899" // Hot pink accent
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>

        {/* Booster Engine */}
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[0.3, 0.38, 0.2, 16]} />
          <meshStandardMaterial color="#18181b" roughness={0.8} />
        </mesh>

        {/* Fins (3 fins distributed around base) */}
        {/* Fin 1 */}
        <group rotation={[0, 0, 0]}>
          <mesh position={[0.5, -0.5, 0]}>
            <boxGeometry args={[0.1, 0.4, 0.3]} />
            <meshStandardMaterial color="#ec4899" roughness={0.3} />
          </mesh>
        </group>
        {/* Fin 2 */}
        <group rotation={[0, Math.PI * 2 / 3, 0]}>
          <mesh position={[0.5, -0.5, 0]}>
            <boxGeometry args={[0.1, 0.4, 0.3]} />
            <meshStandardMaterial color="#ec4899" roughness={0.3} />
          </mesh>
        </group>
        {/* Fin 3 */}
        <group rotation={[0, -Math.PI * 2 / 3, 0]}>
          <mesh position={[0.5, -0.5, 0]}>
            <boxGeometry args={[0.1, 0.4, 0.3]} />
            <meshStandardMaterial color="#ec4899" roughness={0.3} />
          </mesh>
        </group>

        {/* Glowing Rocket Window */}
        <mesh position={[0, 0.2, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial
            color="#06b6d4" // Cyan glow
            emissive="#06b6d4"
            emissiveIntensity={1.5}
            roughness={0.1}
          />
        </mesh>
        {/* Window Trim */}
        <mesh position={[0, 0.2, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.02, 8, 24]} />
          <meshStandardMaterial color="#fafafa" metalness={0.9} />
        </mesh>
      </group>

      {/* === ANIMATED EXHAUST PARTICLES === */}
      <points ref={exhaustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={hovered ? '#f97316' : '#06b6d4'} // Orange when boosted, Cyan otherwise
          size={hovered ? 0.08 : 0.06}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
