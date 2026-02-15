"use client";
import React from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { MapPin, GraduationCap, Briefcase, Code2 } from "lucide-react";

const stats = [
    { icon: Briefcase, label: "Years Experience", value: "3+" },
    { icon: Code2, label: "Projects Shipped", value: "15+" },
    { icon: GraduationCap, label: "Education", value: "BITS & IIT" },
    { icon: MapPin, label: "Based In", value: "Mumbai" },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const item = {
    hidden: { opacity: 0, y: 30, rotateX: 15 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring" as const, damping: 20, stiffness: 100 } },
};

export default function About() {
    return (
        <section id="about" className="section-padding relative">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-[var(--color-primary-500)] font-medium text-sm tracking-widest uppercase mb-3 block">About</span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-display)] text-white">
                        Crafting digital<br />
                        <span className="text-gradient">experiences</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="lg:col-span-3"
                    >
                        <div className="glass rounded-2xl p-8 sm:p-10 tilt-card">
                            <p className="text-lg sm:text-xl text-[#cbd5e1] leading-relaxed mb-6">
                                {personalInfo.bio}
                            </p>
                            <p className="text-lg text-[#94a3b8] leading-relaxed">
                                With degrees from <span className="text-white font-medium">BITS Pilani</span> and{" "}
                                <span className="text-white font-medium">IIT Madras</span>, I bring a strong academic
                                foundation in Computer Science, AI, and Data Science to every project I lead.
                            </p>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="lg:col-span-2 grid grid-cols-2 gap-4"
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={item}
                                className="glass glass-hover rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-default tilt-card transition-all"
                                style={{ perspective: "800px" }}
                            >
                                <stat.icon className="w-5 h-5 text-[var(--color-primary-500)] mb-3" />
                                <span className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] text-white mb-1">{stat.value}</span>
                                <span className="text-xs text-[#64748b] uppercase tracking-wider">{stat.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
