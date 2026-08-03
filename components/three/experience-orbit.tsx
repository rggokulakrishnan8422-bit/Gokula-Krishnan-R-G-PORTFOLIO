"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { deliveryPhases } from "@/config/content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Delivery-lifecycle orbit (Experience section 3D visual).
 * Wireframe globe with four phase nodes orbiting an elliptical path —
 * each node carries a glass HTML label. The Canvas mounts only while the
 * section is near the viewport and unmounts when it leaves (no idle GPU).
 * Static fallbacks: reduced motion, mobile, and no-WebGL → chip grid.
 */

function OrbitFallback() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      {deliveryPhases.map((phase, i) => {
        const Icon = phase.icon;
        return (
          <div
            key={phase.label}
            className="glass-card flex flex-col items-center gap-1 px-4 py-3 text-center shadow-md"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Icon className="size-4" aria-hidden />
            </span>
            <span className="text-caption font-medium">{phase.label}</span>
            <span className="text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
          </div>
        );
      })}
    </div>
  );
}

function OrbitNode({ index, total }: { index: number; total: number }) {
  const ref = useRef<THREE.Group>(null);
  const phase = deliveryPhases[index];
  const Icon = phase.icon;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * 0.22 + (index / total) * Math.PI * 2;
    ref.current.position.set(Math.cos(t) * 2.7, Math.sin(t) * 0.9, Math.sin(t) * 1.6);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#22D3EE" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.16} depthWrite={false} />
      </mesh>
      <Html center distanceFactor={9} className="pointer-events-none" zIndexRange={[10, 0]}>
        <div className="glass-card flex flex-col items-center gap-1 whitespace-nowrap px-3 py-2 shadow-md">
          <Icon className="size-4 text-primary" />
          <span className="text-xs font-semibold">{phase.label}</span>
        </div>
      </Html>
    </group>
  );
}

function OrbitContent() {
  const group = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Points>(null);

  const particleGeo = useRef<THREE.BufferGeometry | null>(null);
  if (!particleGeo.current) {
    const positions = new Float32Array(140 * 3);
    for (let i = 0; i < 140; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
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
        pointer.x * 0.35,
        2,
        delta,
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        0.25 + pointer.y * 0.15,
        2,
        delta,
      );
    }
    if (particles.current) particles.current.rotation.y += delta * 0.015;
  });

  return (
    <group ref={group} rotation={[0.25, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial color="#527EFF" wireframe transparent opacity={0.22} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.72, 0]} />
          <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.12} />
        </mesh>
      </Float>
      <points ref={particles} geometry={particleGeo.current ?? undefined}>
        <pointsMaterial
          size={0.04}
          color="#527EFF"
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
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

  // Static fallback — reduced motion, mobile, or no WebGL.
  if (reduced || mobile || webglOk === false) {
    return (
      <div className="flex justify-center">
        <OrbitFallback />
      </div>
    );
  }

  return (
    <div ref={holder} className="h-[380px] w-full sm:h-[460px]" aria-hidden>
      {near && webglOk && (
        <Canvas
          camera={{ position: [0, 0, 7], fov: 42 }}
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
