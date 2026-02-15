"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileOpen ? "glass py-3" : "py-5"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <a
                        href="#"
                        className="text-xl font-bold font-[family-name:var(--font-display)] tracking-tight text-white hover:text-[var(--color-primary-500)] transition-colors"
                    >
                        AFM<span className="text-[var(--color-primary-500)]">.</span>
                    </a>

                    {/* Desktop nav */}
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

                    {/* Hamburger button — mobile only */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {mobileOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={22} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={22} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[var(--color-dark-900)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-2"
                    >
                        {links.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                                className="text-2xl font-medium text-[#94a3b8] hover:text-white py-3 px-8 rounded-xl hover:bg-white/5 transition-all"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <motion.a
                            href="mailto:azfar.faheem@gmail.com"
                            onClick={() => setMobileOpen(false)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: links.length * 0.05, duration: 0.3 }}
                            className="mt-4 px-8 py-3 text-lg font-semibold bg-[var(--color-primary-500)] text-[var(--color-dark-900)] rounded-lg hover:brightness-110 transition-all"
                        >
                            Let&apos;s Talk
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
