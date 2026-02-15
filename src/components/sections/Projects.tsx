"use client";
import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import { ExternalLink } from "lucide-react";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 60, rotateX: 10 },
    show: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { type: "spring" as const, damping: 20, stiffness: 80 },
    },
};

export default function Projects() {
    return (
        <section id="projects" className="section-padding relative">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-[var(--color-primary-500)] font-medium text-sm tracking-widest uppercase mb-3 block">Work</span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-display)] text-white">
                        Selected<br />
                        <span className="text-gradient">projects</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariant}
                            style={{ perspective: "1000px" }}
                        >
                            <div className="glass glass-hover rounded-2xl p-8 h-full flex flex-col transition-all group relative overflow-hidden tilt-card">
                                {/* Hover glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[var(--color-primary-500)]/5 via-transparent to-[var(--color-secondary-500)]/5 pointer-events-none" />

                                {/* Number */}
                                <span className="absolute top-6 right-6 text-7xl font-bold font-[family-name:var(--font-display)] text-white/[0.03] group-hover:text-[var(--color-primary-500)]/10 transition-colors duration-500">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <div className="flex-1 relative">
                                    <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-display)] text-white mb-3 group-hover:text-[var(--color-primary-500)] transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-[#94a3b8] mb-6 leading-relaxed">{project.description}</p>
                                </div>

                                <div className="flex items-end justify-between gap-4 relative">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 4).map((t, i) => (
                                            <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-[#94a3b8] border border-white/5">
                                                {t}
                                            </span>
                                        ))}
                                        {project.tech.length > 4 && (
                                            <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-[#64748b]">
                                                +{project.tech.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-cursor="pointer"
                                            className="shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#94a3b8] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-primary-500)]/10 transition-all"
                                        >
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
