"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import FloatingParticles from "./FloatingParticles";

export default function Scene() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: true }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.3} />
                <Suspense fallback={null}>
                    <FloatingParticles />
                </Suspense>
            </Canvas>
        </div>
    );
}
