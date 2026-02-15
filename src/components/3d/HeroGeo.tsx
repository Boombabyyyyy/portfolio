"use client";
import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export default function HeroGeo() {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const { pointer } = useThree();

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();

        // Scroll-based rotation
        const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
        const scrollRotation = scrollY * 0.002;

        // Mouse follow (subtle)
        const targetRotX = pointer.y * 0.3 + scrollRotation;
        const targetRotY = pointer.x * 0.3 + t * 0.15;

        // Smooth interpolation
        meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.05;
        meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.05;

        // Scale down as user scrolls past hero
        const scrollScale = Math.max(0.5, 2.2 - scrollY * 0.001);
        meshRef.current.scale.setScalar(scrollScale);

        if (glowRef.current) {
            glowRef.current.rotation.copy(meshRef.current.rotation);
            glowRef.current.scale.setScalar(scrollScale * 0.85);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            {/* Main wireframe shape */}
            <mesh ref={meshRef} scale={2.2}>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <MeshDistortMaterial
                    color="#0AFF9D"
                    distort={0.25}
                    speed={2}
                    roughness={0.1}
                    metalness={0.9}
                    wireframe={true}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Inner glow core */}
            <mesh ref={glowRef} scale={1.8}>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <meshBasicMaterial color="#0AFF9D" transparent opacity={0.05} />
            </mesh>

            {/* Outer glow sphere */}
            <mesh scale={3.5}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color="#0AFF9D" transparent opacity={0.02} />
            </mesh>
        </Float>
    );
}
