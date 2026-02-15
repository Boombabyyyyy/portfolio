"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <a href="#" className="text-xl font-bold font-[family-name:var(--font-display)] tracking-tight text-white hover:text-[var(--color-primary-500)] transition-colors">
                    AFM<span className="text-[var(--color-primary-500)]">.</span>
                </a>

                <div className="hidden md:flex items-center gap-1">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="px-4 py-2 text-sm text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href={`mailto:azfar.faheem@gmail.com`}
                        className="ml-4 px-5 py-2 text-sm font-semibold bg-[var(--color-primary-500)] text-[var(--color-dark-900)] rounded-lg hover:brightness-110 transition-all"
                    >
                        Let&apos;s Talk
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
