"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { extend } from "@react-three/fiber";

// Custom Shader Material
const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(),
    uMouse: new THREE.Vector2(0.5, 0.5),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader (Beautiful flowing effect)
  `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;

    varying vec2 vUv;

    vec3 colorA = vec3(0.1, 0.8, 0.7); // Teal
    vec3 colorB = vec3(0.4, 0.2, 0.9); // Purple

    float noise(vec2 p) {
      return sin(p.x * 10.0) * sin(p.y * 10.0);
    }

    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      uv.x *= uResolution.x / uResolution.y;

      float t = uTime * 0.4;

      // Multiple layers of waves
      float wave1 = sin(uv.x * 6.0 + t) * 0.3;
      float wave2 = sin(uv.y * 8.0 - t * 1.2) * 0.3;
      float wave3 = sin(length(uv) * 10.0 - t * 2.0) * 0.2;

      float dist = length(uv - uMouse * 2.0);
      float mouseInfluence = smoothstep(1.5, 0.0, dist) * 0.6;

      float finalNoise = wave1 + wave2 + wave3 + mouseInfluence * 2.0;

      vec3 color = mix(colorA, colorB, sin(finalNoise * 3.0) * 0.5 + 0.5);
      
      // Add glow
      float glow = 1.0 / (1.0 + finalNoise * 4.0);
      color += glow * vec3(0.3, 0.8, 0.9) * 0.4;

      gl_FragColor = vec4(color, 0.95);
    }
  `,
);

extend({ WaveShaderMaterial });

function ShaderPlane() {
  const materialRef = useRef<any>();
  const { viewport, mouse } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
      materialRef.current.uMouse = mouse;
      materialRef.current.uResolution.set(viewport.width, viewport.height);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <waveShaderMaterial ref={materialRef} />
    </mesh>
  );
}

export default function ShaderBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
