"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Custom hook: load an SVG from /public as a THREE texture via canvas ──
function useIconTexture(svgPath: string, size: number = 128) {
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

    useEffect(() => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            ctx.drawImage(img, 0, 0, size, size);
            const tex = new THREE.CanvasTexture(canvas);
            tex.needsUpdate = true;
            setTexture(tex);
        };
        img.onerror = () => {
            // Fallback: draw a simple colored circle
            ctx.fillStyle = "rgba(10,255,157,0.3)";
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 3, 0, Math.PI * 2);
            ctx.fill();
            const tex = new THREE.CanvasTexture(canvas);
            tex.needsUpdate = true;
            setTexture(tex);
        };
        img.src = svgPath;
    }, [svgPath, size]);

    return texture;
}

// ── Individual floating icon ─────────────────────────
interface FloatingIconConfig {
    icon: string;       // filename in /public, e.g. "React-Dark.svg"
    position: [number, number, number];
    scale: number;
    rotationSpeed: number;
    driftSpeed: number;
    opacity: number;
}

function FloatingIcon({ icon, position, scale, rotationSpeed, driftSpeed, opacity }: FloatingIconConfig) {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialPos = useRef(position);
    const texture = useIconTexture(`/${icon}`, 128);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();

        // Gentle rotation around Z axis (flat spin)
        meshRef.current.rotation.z += rotationSpeed * 0.3;

        // Very subtle tilt for 3D feel
        meshRef.current.rotation.x = Math.sin(t * 0.3 + initialPos.current[0]) * 0.15;
        meshRef.current.rotation.y = Math.cos(t * 0.25 + initialPos.current[1]) * 0.15;

        // Float up and down
        meshRef.current.position.y =
            initialPos.current[1] + Math.sin(t * driftSpeed + initialPos.current[0]) * 0.4;

        // Subtle horizontal drift
        meshRef.current.position.x =
            initialPos.current[0] + Math.sin(t * driftSpeed * 0.7 + initialPos.current[1]) * 0.2;
    });

    if (!texture) return null;

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
                map={texture}
                transparent
                opacity={opacity}
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    );
}

// ── Scroll-reactive wrapper ──────────────────────────
function ScrollParallax({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!groupRef.current) return;
        const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
        const maxScroll =
            typeof document !== "undefined"
                ? document.body.scrollHeight - window.innerHeight
                : 1;
        const progress = scrollY / maxScroll;

        // Shift group up as user scrolls (parallax)
        groupRef.current.position.y = progress * 8;
        // Gentle rotation on scroll
        groupRef.current.rotation.y = progress * 0.3;
    });

    return <group ref={groupRef}>{children}</group>;
}

// ── Icon configurations scattered across the viewport ──
const floatingIcons: FloatingIconConfig[] = [
    { icon: "React-Dark.svg", position: [-6, 3, -8], scale: 1.2, rotationSpeed: 0.003, driftSpeed: 0.5, opacity: 0.14 },
    { icon: "TypeScript.svg", position: [7, -2, -12], scale: 1.0, rotationSpeed: 0.002, driftSpeed: 0.4, opacity: 0.12 },
    { icon: "Python-Dark.svg", position: [-4, -5, -10], scale: 1.1, rotationSpeed: 0.002, driftSpeed: 0.45, opacity: 0.13 },
    { icon: "Docker.svg", position: [5, 4, -7], scale: 1.0, rotationSpeed: 0.003, driftSpeed: 0.5, opacity: 0.12 },
    { icon: "NodeJS-Dark.svg", position: [-8, 0, -14], scale: 0.9, rotationSpeed: 0.002, driftSpeed: 0.35, opacity: 0.11 },
    { icon: "NextJS-Dark.svg", position: [3, -6, -9], scale: 0.8, rotationSpeed: 0.003, driftSpeed: 0.4, opacity: 0.10 },
    { icon: "MongoDB.svg", position: [9, 2, -13], scale: 1.0, rotationSpeed: 0.002, driftSpeed: 0.45, opacity: 0.12 },
    { icon: "Kubernetes.svg", position: [-3, 6, -11], scale: 0.9, rotationSpeed: 0.003, driftSpeed: 0.5, opacity: 0.11 },
    { icon: "Firebase-Dark.svg", position: [0, -4, -8], scale: 0.9, rotationSpeed: 0.002, driftSpeed: 0.4, opacity: 0.12 },
    { icon: "Flutter-Dark.svg", position: [-7, -3, -12], scale: 0.85, rotationSpeed: 0.003, driftSpeed: 0.35, opacity: 0.11 },
    { icon: "PostgreSQL-Dark.svg", position: [6, 5, -15], scale: 0.85, rotationSpeed: 0.002, driftSpeed: 0.45, opacity: 0.10 },
    { icon: "VueJS-Dark.svg", position: [-5, 7, -9], scale: 0.9, rotationSpeed: 0.003, driftSpeed: 0.5, opacity: 0.12 },
    { icon: "Redis-Dark.svg", position: [4, -3, -10], scale: 0.8, rotationSpeed: 0.002, driftSpeed: 0.4, opacity: 0.11 },
    { icon: "JavaScript.svg", position: [-2, -7, -11], scale: 0.9, rotationSpeed: 0.003, driftSpeed: 0.45, opacity: 0.12 },
];

export default function FloatingParticles() {
    return (
        <ScrollParallax>
            {floatingIcons.map((config, i) => (
                <FloatingIcon key={i} {...config} />
            ))}
        </ScrollParallax>
    );
}
