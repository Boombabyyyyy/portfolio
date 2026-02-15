"use client";
import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingShapeProps {
    position: [number, number, number];
    geometry: "box" | "octahedron" | "torus" | "torusKnot" | "icosahedron";
    scale: number;
    rotationSpeed: [number, number, number];
    color: string;
}

function FloatingShape({ position, geometry, scale, rotationSpeed, color }: FloatingShapeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialY = useRef(position[1]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();

        // Gentle rotation
        meshRef.current.rotation.x += rotationSpeed[0];
        meshRef.current.rotation.y += rotationSpeed[1];
        meshRef.current.rotation.z += rotationSpeed[2];

        // Float up and down
        meshRef.current.position.y = initialY.current + Math.sin(t * 0.5 + position[0]) * 0.3;

        // Subtle drift on x
        meshRef.current.position.x = position[0] + Math.sin(t * 0.3 + position[1]) * 0.15;
    });

    const geo = useMemo(() => {
        switch (geometry) {
            case "box":
                return <boxGeometry args={[1, 1, 1]} />;
            case "octahedron":
                return <octahedronGeometry args={[1, 0]} />;
            case "torus":
                return <torusGeometry args={[1, 0.3, 8, 16]} />;
            case "torusKnot":
                return <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />;
            case "icosahedron":
                return <icosahedronGeometry args={[1, 0]} />;
            default:
                return <boxGeometry args={[1, 1, 1]} />;
        }
    }, [geometry]);

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            {geo}
            <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
        </mesh>
    );
}

// Scroll-reactive wrapper — shifts all shapes based on scroll position
function ScrollParallax({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!groupRef.current) return;
        const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
        const maxScroll = typeof document !== "undefined" ? document.body.scrollHeight - window.innerHeight : 1;
        const progress = scrollY / maxScroll;

        // Shift the whole group up as user scrolls (parallax)
        groupRef.current.position.y = progress * 8;
        // Gentle rotation based on scroll
        groupRef.current.rotation.y = progress * 0.5;
    });

    return <group ref={groupRef}>{children}</group>;
}

// Predefined positions to scatter shapes across viewport
const shapes: FloatingShapeProps[] = [
    { position: [-6, 3, -8], geometry: "torusKnot", scale: 0.5, rotationSpeed: [0.002, 0.003, 0.001], color: "#0AFF9D" },
    { position: [7, -2, -12], geometry: "octahedron", scale: 0.7, rotationSpeed: [0.003, 0.002, 0.002], color: "#A960EE" },
    { position: [-4, -5, -10], geometry: "box", scale: 0.4, rotationSpeed: [0.001, 0.004, 0.002], color: "#0AFF9D" },
    { position: [5, 4, -6], geometry: "icosahedron", scale: 0.6, rotationSpeed: [0.002, 0.001, 0.003], color: "#A960EE" },
    { position: [-8, 0, -15], geometry: "torus", scale: 0.8, rotationSpeed: [0.001, 0.002, 0.001], color: "#0AFF9D" },
    { position: [3, -6, -9], geometry: "torusKnot", scale: 0.35, rotationSpeed: [0.003, 0.001, 0.002], color: "#3dffc0" },
    { position: [9, 2, -14], geometry: "box", scale: 0.45, rotationSpeed: [0.002, 0.003, 0.001], color: "#A960EE" },
    { position: [-3, 6, -11], geometry: "octahedron", scale: 0.5, rotationSpeed: [0.001, 0.002, 0.003], color: "#3dffc0" },
    { position: [0, -4, -7], geometry: "icosahedron", scale: 0.3, rotationSpeed: [0.004, 0.001, 0.002], color: "#0AFF9D" },
    { position: [-7, -3, -13], geometry: "torus", scale: 0.55, rotationSpeed: [0.002, 0.003, 0.001], color: "#A960EE" },
    { position: [6, 5, -16], geometry: "torusKnot", scale: 0.4, rotationSpeed: [0.001, 0.002, 0.002], color: "#0AFF9D" },
    { position: [-5, 7, -9], geometry: "box", scale: 0.35, rotationSpeed: [0.003, 0.001, 0.003], color: "#3dffc0" },
];

export default function FloatingParticles() {
    return (
        <ScrollParallax>
            {shapes.map((shape, i) => (
                <FloatingShape key={i} {...shape} />
            ))}
        </ScrollParallax>
    );
}
