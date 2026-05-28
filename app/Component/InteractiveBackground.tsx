"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function BubbleParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 25;
      pos[i + 1] = (Math.random() - 0.5) * 25;
      pos[i + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const color = new THREE.Color().setHSL(0.5, 0.8, 0.7); // Teal-ish
      cols[i] = color.r;
      cols[i + 1] = color.g;
      cols[i + 2] = color.b;
    }
    return cols;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const mouse = state.mouse;

    pointsRef.current.rotation.y = time * 0.05;

    const positions = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;

    for (let i = 0; i < particleCount * 3; i += 3) {
      const x = positions.array[i];
      const y = positions.array[i + 1];

      // Gentle attraction to mouse
      const dx = mouse.x * 8 - x;
      const dy = mouse.y * 8 - y;

      positions.array[i] += dx * 0.008;
      positions.array[i + 1] += dy * 0.008;

      // Gentle floating movement
      positions.array[i + 1] += Math.sin(time + i) * 0.008;
    }

    positions.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        vertexColors
        transparent
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function InteractiveBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12] }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <BubbleParticles />
      </Canvas>
    </div>
  );
}
