"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import HeroGeo from "@/components/3d/HeroGeo";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Parallax layers — different speeds for each element
    const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const taglineY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const ctaY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* 3D background — hero-specific canvas */}
            <div className="absolute inset-0 z-[1]">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#A960EE" />
                    <pointLight position={[-10, -5, -10]} intensity={1} color="#0AFF9D" />
                    <Suspense fallback={null}>
                        <HeroGeo />
                    </Suspense>
                </Canvas>
            </div>

            {/* Radial gradient overlay */}
            <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,_transparent_30%,_var(--color-dark-900)_80%)]" />

            {/* Top/bottom fade */}
            <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[var(--color-dark-900)]/40 via-transparent to-[var(--color-dark-900)]" />

            {/* Content — each layer has different parallax speed */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    style={{ y: badgeY, opacity }}
                    className="flex justify-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-primary-500)]/20 bg-[var(--color-primary-500)]/5 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-[var(--color-primary-500)] animate-pulse" />
                        <span className="text-[var(--color-primary-500)] text-sm font-medium tracking-wide">
                            Available for opportunities
                        </span>
                    </motion.div>
                </motion.div>

                <motion.div style={{ y: nameY, opacity }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-[family-name:var(--font-display)] leading-[0.9] tracking-tighter mb-6"
                    >
                        <span className="text-white">Azfar</span>{" "}
                        <span className="text-gradient">Mustafa</span>
                    </motion.h1>
                </motion.div>

                <motion.div style={{ y: taglineY, opacity }}>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.7 }}
                        className="text-lg sm:text-xl md:text-2xl text-[#94a3b8] max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        <span className="text-white font-medium">Technical Lead</span> building
                        scalable systems at the intersection of{" "}
                        <span className="text-[var(--color-primary-500)]">AI</span> and modern
                        engineering.
                    </motion.p>
                </motion.div>

                <motion.div style={{ y: ctaY, opacity }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <a
                            href="#projects"
                            data-cursor="pointer"
                            className="px-8 py-3.5 bg-[var(--color-primary-500)] text-[var(--color-dark-900)] font-semibold rounded-lg hover:brightness-110 hover:scale-105 transition-all text-sm sm:text-base"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            data-cursor="pointer"
                            className="px-8 py-3.5 border border-white/10 text-white rounded-lg hover:bg-white/5 hover:scale-105 transition-all text-sm sm:text-base"
                        >
                            Get In Touch
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-[#475569]"
                >
                    <ArrowDown size={24} />
                </motion.div>
            </motion.div>
        </section>
    );
}
