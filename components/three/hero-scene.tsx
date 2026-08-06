"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/**
 * Three.js hero scene (Master Prompt Sections 11, 16, 19).
 * - Abstract particles + wireframe "kanban" panels in the cool blue palette
 * - Gentle camera parallax tied to the pointer (damped, no aggression)
 * - Unlit materials → tiny GPU cost; geometry disposed on unmount
 * - Mobile: particle count cut ~4× and DPR capped
 * - No WebGL / reduced motion → static gradient fallback
 */

const SPREAD: [number, number, number] = [16, 9, 8];

function SceneFallback({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("absolute inset-0", className)}>
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px]" />
      <div className="absolute right-[8%] top-[55%] h-[320px] w-[320px] rounded-full bg-secondary/20 blur-[120px]" />
    </div>
  );
}

function Particles({
  count,
  color,
  size,
}: {
  count: number;
  color: string;
  size: number;
}) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD[0];
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD[1];
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD[2];
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Abstract wireframe panels — the kanban/data motif of Section 6. */
function KanbanPlanes({ color }: { color: string }) {
  const panels = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        position: [
          (i % 3) * 4.4 - 4.4 + (i > 2 ? 1.8 : -0.9),
          (Math.floor(i / 3) - 0.5) * 3.4 + (i % 2 === 0 ? 0.5 : -0.5),
          -2.4 - (i % 3),
        ] as [number, number, number],
        rotation: [i % 2 === 0 ? 0.3 : -0.28, ((i % 3) - 1) * 0.4, 0] as [
          number,
          number,
          number,
        ],
        scale: 0.85 + (i % 3) * 0.3,
        speed: 1 + (i % 3) * 0.4,
      })),
    [],
  );

  return (
    <>
      {panels.map((panel, i) => (
        <Float key={i} speed={panel.speed} rotationIntensity={0.35} floatIntensity={1.2}>
          <mesh position={panel.position} rotation={panel.rotation} scale={panel.scale}>
            <planeGeometry args={[1.6, 1.05]} />
            <meshBasicMaterial
              color={color}
              wireframe
              transparent
              opacity={0.15}
              depthWrite={false}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/** Gentle pointer-follow camera rig (Section 11). */
function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame((_, delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.7, 1.6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * -0.45, 1.6, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/** Slow wireframe globe echoing the hero portrait's network motif. */
function GlobeEcho({ mobile, color }: { mobile: boolean; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  if (mobile) return null;

  return (
    <Float speed={0.8} rotationIntensity={0} floatIntensity={0.6}>
      <mesh ref={ref} position={[3.4, 0.4, -1.2]}>
        <icosahedronGeometry args={[2.3, 2]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.07}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

function SceneContent({
  particleCount,
  mobile,
  palette,
}: {
  particleCount: number;
  mobile: boolean;
  palette: HeroScenePalette;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.02;
  });

  return (
    <group ref={group}>
      <Particles count={particleCount} color={palette.primary} size={0.035} />
      <Particles count={Math.floor(particleCount / 3)} color={palette.secondary} size={0.05} />
      <KanbanPlanes color={palette.planes} />
      <GlobeEcho mobile={mobile} color={palette.primary} />
    </group>
  );
}

export interface HeroScenePalette {
  primary: string;
  secondary: string;
  planes: string;
}

const DEFAULT_PALETTE: HeroScenePalette = {
  primary: "#5B8CFF",
  secondary: "#22D3EE",
  planes: "#5B8CFF",
};

export default function HeroScene({ palette = DEFAULT_PALETTE }: { palette?: HeroScenePalette }) {
  const reduced = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setWebglOk(Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl")));
    } catch {
      setWebglOk(false);
    }
  }, []);

  // Static fallbacks — pre-mount, no WebGL, or reduced motion (Section 11).
  if (webglOk === null || reduced || !webglOk) return <SceneFallback />;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, mobile ? 1.25 : 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <CameraRig />
      <SceneContent
        particleCount={mobile ? 420 : 2000}
        mobile={mobile}
        palette={palette}
      />
    </Canvas>
  );
}
