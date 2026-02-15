"use client";
import React from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { Github, Linkedin, Mail, ArrowUpRight, FileDown } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="section-padding relative">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="text-[var(--color-primary-500)] font-medium text-sm tracking-widest uppercase mb-3 block">Contact</span>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-[family-name:var(--font-display)] text-white mb-6">
                        Let&apos;s build<br />
                        <span className="text-gradient">something great</span>
                    </h2>
                    <p className="text-lg text-[#94a3b8] max-w-xl mx-auto mb-10 leading-relaxed">
                        I&apos;m currently open to new opportunities. Whether it&apos;s a project,
                        role, or just a conversation — I&apos;d love to hear from you.
                    </p>

                    <motion.a
                        href={`mailto:${personalInfo.email}`}
                        data-cursor="pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-primary-500)] text-[var(--color-dark-900)] font-semibold rounded-lg hover:brightness-110 transition-all text-lg group"
                    >
                        <Mail size={20} />
                        Say Hello
                        <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>

                    <div className="mt-12 flex justify-center gap-4">
                        {[
                            { href: personalInfo.github, icon: Github },
                            ...(personalInfo.linkedin ? [{ href: personalInfo.linkedin, icon: Linkedin }] : []),
                            { href: "/Azfar_resume_New.pdf", icon: FileDown },
                        ].map(({ href, icon: Icon }, i) => (
                            <motion.a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="pointer"
                                whileHover={{ scale: 1.15, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-[#94a3b8] hover:text-white hover:border-white/20 transition-all"
                            >
                                <Icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <div className="mt-20 pt-8 border-t border-white/5">
                    <p className="text-sm text-[#475569]">
                        © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </section>
    );
}
