"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";

export default function CanvasContainer({ children }: { children?: React.ReactNode }) {
    return (
        <div className="fixed inset-0 -z-10 h-screen w-full bg-black">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 2]}
            >
                <color attach="background" args={["#050505"]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Sparkles count={50} scale={10} size={2} speed={0.4} opacity={0.5} />
                {children}
            </Canvas>
        </div>
    );
}
