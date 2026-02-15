"use client";
import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// ── React Atom Logo ─────────────────────────────────
// 3 elliptical orbits around a central sphere
function Orbit({ rotation }: { rotation: [number, number, number] }) {
    return (
        <mesh rotation={rotation}>
            <torusGeometry args={[1.6, 0.02, 16, 80]} />
            <meshBasicMaterial color="#0AFF9D" transparent opacity={0.5} />
        </mesh>
    );
}

export default function HeroGeo() {
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const { pointer } = useThree();

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();

        // Scroll-based rotation
        const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
        const scrollRotation = scrollY * 0.002;

        // Mouse follow (subtle)
        const targetRotX = pointer.y * 0.3 + scrollRotation;
        const targetRotY = pointer.x * 0.3 + t * 0.15;

        groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;

        // Scale down on scroll
        const scrollScale = Math.max(0.6, 2.2 - scrollY * 0.001);
        groupRef.current.scale.setScalar(scrollScale);

        // Core pulse
        if (coreRef.current) {
            coreRef.current.scale.setScalar(0.22 + Math.sin(t * 2) * 0.03);
        }
    });

    return (
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={groupRef} scale={2.2}>
                {/* Central nucleus */}
                <mesh ref={coreRef} scale={0.22}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial color="#0AFF9D" transparent opacity={0.8} />
                </mesh>

                {/* 3 orbital rings at different angles — React atom */}
                <Orbit rotation={[0, 0, 0]} />
                <Orbit rotation={[Math.PI / 3, 0, Math.PI / 6]} />
                <Orbit rotation={[-Math.PI / 3, 0, -Math.PI / 6]} />

                {/* Subtle glow sphere */}
                <mesh scale={2.5}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshBasicMaterial color="#0AFF9D" transparent opacity={0.02} />
                </mesh>
            </group>
        </Float>
    );
}
