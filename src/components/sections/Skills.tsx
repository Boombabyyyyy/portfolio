"use client";
import React from "react";
import { motion } from "framer-motion";

const categories: { name: string; skills: string[] }[] = [
    { name: "Languages", skills: ["TypeScript", "JavaScript", "Python", "C#", "C++", "Dart"] },
    { name: "Frontend", skills: ["React", "Next.js", "React Native", "Flutter", "Vue.js"] },
    { name: "Backend", skills: ["ASP.NET Core", "Flask", "Node.js"] },
    { name: "AI & Data", skills: ["AI/ML", "GenAI", "NumPy", "Pandas", "NLP"] },
    { name: "Cloud & DevOps", skills: ["Docker", "Kubernetes", "GCP", "Firebase"] },
    { name: "Databases", skills: ["MSSQL", "PostgreSQL", "MongoDB", "SQLite", "Redis"] },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring" as const, damping: 20, stiffness: 100 },
    },
};

const tagContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const tagItem = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, damping: 15, stiffness: 200 } },
};

export default function Skills() {
    return (
        <section id="skills" className="section-padding relative">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-[var(--color-primary-500)] font-medium text-sm tracking-widest uppercase mb-3 block">Skills</span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-display)] text-white">
                        Technical<br />
                        <span className="text-gradient">arsenal</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {categories.map((cat, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariant}
                            className="glass glass-hover rounded-2xl p-6 transition-all tilt-card"
                            style={{ perspective: "800px" }}
                        >
                            <h3 className="text-sm font-semibold text-[var(--color-primary-500)] uppercase tracking-wider mb-4">
                                {cat.name}
                            </h3>
                            <motion.div
                                variants={tagContainer}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="flex flex-wrap gap-2"
                            >
                                {cat.skills.map((skill, j) => (
                                    <motion.span
                                        key={j}
                                        variants={tagItem}
                                        className="px-3 py-1.5 text-sm text-[#cbd5e1] bg-white/5 rounded-lg border border-white/5 hover:border-[var(--color-primary-500)]/30 hover:bg-[var(--color-primary-500)]/5 hover:text-[var(--color-primary-500)] transition-all cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
