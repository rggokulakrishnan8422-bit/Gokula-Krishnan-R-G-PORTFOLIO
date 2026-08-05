"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { deliveryPhases } from "@/config/content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * 3D Delivery Lifecycle Core
 * Features a glowing wireframe icosahedron, dual elliptical orbit rings, 
 * 4 orbiting 3D phase nodes with cyan glow, and interactive particle field.
 */

function OrbitFallback() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {deliveryPhases.map((phase, i) => {
        const Icon = phase.icon;
        return (
          <div
            key={phase.label}
            className="glass-card flex flex-col items-center gap-1.5 p-3 text-center shadow-md transition-all duration-300 hover:border-primary/50"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Icon className="size-4" aria-hidden />
            </span>
            <span className="text-xs font-semibold text-text">{phase.label}</span>
            <span className="text-[10px] font-mono tracking-wider text-muted">0{i + 1}</span>
          </div>
        );
      })}
    </div>
  );
}

function OrbitNode({ index, total }: { index: number; total: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * 0.3 + (index / total) * Math.PI * 2;
    ref.current.position.set(Math.cos(t) * 2.2, Math.sin(t) * 0.7, Math.sin(t) * 1.4);
  });

  return (
    <group ref={ref}>
      {/* Node Core */}
      <mesh>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshBasicMaterial color="#22D3EE" />
      </mesh>
      {/* Outer Glow Sphere */}
      <mesh>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshBasicMaterial color="#527EFF" transparent opacity={0.25} depthWrite={false} />
      </mesh>
    </group>
  );
}

function OrbitContent() {
  const group = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Points>(null);

  const particleGeo = useRef<THREE.BufferGeometry | null>(null);
  if (!particleGeo.current) {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.current = geo;
  }

  useEffect(() => () => particleGeo.current?.dispose(), []);

  useFrame(({ pointer }, delta) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        pointer.x * 0.3,
        2,
        delta
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        0.2 + pointer.y * 0.15,
        2,
        delta
      );
    }
    if (particles.current) particles.current.rotation.y += delta * 0.02;
  });

  return (
    <group ref={group} rotation={[0.2, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Core Wireframe Spheres */}
        <mesh>
          <icosahedronGeometry args={[1.0, 1]} />
          <meshBasicMaterial color="#527EFF" wireframe transparent opacity={0.28} />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.65, 0]} />
          <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.35} />
        </mesh>

        {/* Orbit Ring Tracks */}
        <mesh rotation={[Math.PI / 2.8, 0, 0]}>
          <torusGeometry args={[2.2, 0.008, 16, 64]} />
          <meshBasicMaterial color="#527EFF" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 3.5, Math.PI / 6, 0]}>
          <torusGeometry args={[1.7, 0.006, 16, 64]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.25} />
        </mesh>
      </Float>

      {/* Particle Field */}
      <points ref={particles} geometry={particleGeo.current ?? undefined}>
        <pointsMaterial
          size={0.035}
          color="#527EFF"
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 4 Orbiting 3D Nodes */}
      {deliveryPhases.map((_, i) => (
        <OrbitNode key={i} index={i} total={deliveryPhases.length} />
      ))}
    </group>
  );
}

export default function ExperienceOrbitScene() {
  const reduced = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  const holder = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setWebglOk(Boolean(c.getContext("webgl2") ?? c.getContext("webgl")));
    } catch {
      setWebglOk(false);
    }
  }, []);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: "240px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (reduced || mobile || webglOk === false) {
    return (
      <div className="flex justify-center">
        <OrbitFallback />
      </div>
    );
  }

  return (
    <div ref={holder} className="h-[240px] w-full sm:h-[280px]" aria-hidden>
      {near && webglOk && (
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <OrbitContent />
        </Canvas>
      )}
    </div>
  );
}
