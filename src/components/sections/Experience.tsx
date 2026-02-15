"use client";
import React from "react";
import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";

export default function Experience() {
    return (
        <section id="experience" className="section-padding relative">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-[var(--color-primary-500)] font-medium text-sm tracking-widest uppercase mb-3 block">Career</span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-display)] text-white">
                        Professional<br />
                        <span className="text-gradient">journey</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary-500)]/0 via-[var(--color-primary-500)]/30 to-[var(--color-primary-500)]/0 md:-translate-x-px" />

                    {experience.map((job, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: isEven ? -60 : 60, rotateY: isEven ? -5 : 5 }}
                                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row mb-12 last:mb-0 ${!isEven ? "md:flex-row-reverse" : ""}`}
                                style={{ perspective: "1000px" }}
                            >
                                {/* Glowing node */}
                                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[var(--color-primary-500)] -translate-x-[5px] md:-translate-x-1.5 top-8 z-10 shadow-[0_0_12px_var(--color-primary-500)]" />

                                {/* Card */}
                                <div className="w-full md:w-[calc(50%-2rem)] ml-12 md:ml-0">
                                    <div className="glass glass-hover rounded-2xl p-6 sm:p-8 transition-all group tilt-card">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-xs font-mono text-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10 px-3 py-1 rounded-full">
                                                {job.period}
                                            </span>
                                            <span className="text-xs text-[#64748b]">{job.location}</span>
                                        </div>
                                        <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-white mb-1 group-hover:text-[var(--color-primary-500)] transition-colors">
                                            {job.role}
                                        </h3>
                                        <p className="text-[#94a3b8] mb-4">{job.company}</p>
                                        <ul className="space-y-2">
                                            {job.achievements.map((a, i) => (
                                                <li key={i} className="text-sm text-[#94a3b8] leading-relaxed flex gap-2">
                                                    <span className="text-[var(--color-primary-500)] mt-1 shrink-0">›</span>
                                                    <span>{a}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Spacer */}
                                <div className="hidden md:block w-[calc(50%-2rem)]" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
