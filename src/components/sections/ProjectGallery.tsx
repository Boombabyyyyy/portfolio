"use client";
import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { projects } from '@/data/portfolio';
import TiltCard from '@/components/ui/TiltCard';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectGallery() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-dark-900">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-10 pl-20">
                    {/* Title Card */}
                    <div className="flex flex-col justify-center min-w-[500px]">
                        <h2 className="text-9xl font-display font-bold text-white mb-6 leading-[0.8]">SELECTED<br /><span className="text-primary-500">WORKS</span></h2>
                        <p className="text-gray-300 max-w-md text-xl leading-relaxed">Drag to explore the archive of deployed systems and experiments.</p>
                        <div className="mt-12 flex gap-4 items-center">
                            <span className="w-20 h-[2px] bg-primary-500 block"></span>
                            <span className="text-primary-500 uppercase tracking-widest text-sm font-bold">Scroll Down</span>
                        </div>
                    </div>

                    {/* Project Cards */}
                    {projects.map((project, index) => (
                        <TiltCard key={index} className="w-[600px] h-[70vh] flex-shrink-0">
                            <div className="group relative w-full h-full bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm hover:border-primary-500/50 transition-colors">
                                <div className="absolute top-0 right-0 p-10 z-20">
                                    <span className="text-6xl font-display font-bold text-white/5 group-hover:text-primary-500/20 transition-colors">
                                        0{index + 1}
                                    </span>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                                    <h3 className="text-4xl font-display font-bold mb-4">{project.title}</h3>
                                    <p className="text-gray-400 mb-6 line-clamp-3 text-lg">{project.description}</p>

                                    <div className="flex gap-4 items-center">
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-primary-500 text-black font-bold rounded-full hover:scale-105 transition-transform">
                                                View Project
                                            </a>
                                        )}
                                        <div className="flex gap-2">
                                            {project.tech.slice(0, 3).map((t, i) => (
                                                <span key={i} className="px-3 py-1 border border-white/20 rounded-full text-xs text-gray-300">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Background Image Placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-secondary-900/20 -z-10 group-hover:scale-110 transition-transform duration-700"></div>
                            </div>
                        </TiltCard>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
