"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Dot follows tightly
    const dotSpring = { damping: 35, stiffness: 800, mass: 0.2 };
    const dotX = useSpring(mouseX, dotSpring);
    const dotY = useSpring(mouseY, dotSpring);

    // Ring follows with more lag for trailing effect
    const ringSpring = { damping: 20, stiffness: 200, mass: 0.5 };
    const ringX = useSpring(mouseX, ringSpring);
    const ringY = useSpring(mouseY, ringSpring);

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        },
        [mouseX, mouseY, isVisible]
    );

    useEffect(() => {
        // Detect touch device
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
            setIsTouchDevice(true);
            return;
        }

        const handleHoverStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.dataset.cursor === "pointer"
            ) {
                setIsHovering(true);
            }
        };

        const handleHoverEnd = () => setIsHovering(false);
        const handleLeave = () => setIsVisible(false);
        const handleEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", handleHoverStart);
        window.addEventListener("mouseout", handleHoverEnd);
        document.addEventListener("mouseleave", handleLeave);
        document.addEventListener("mouseenter", handleEnter);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", handleHoverStart);
            window.removeEventListener("mouseout", handleHoverEnd);
            document.removeEventListener("mouseleave", handleLeave);
            document.removeEventListener("mouseenter", handleEnter);
        };
    }, [onMouseMove]);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Inner dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{ x: dotX, y: dotY }}
                animate={{
                    width: isHovering ? 60 : 8,
                    height: isHovering ? 60 : 8,
                    borderRadius: "50%",
                    opacity: isVisible ? 1 : 0,
                    marginLeft: isHovering ? -30 : -4,
                    marginTop: isHovering ? -30 : -4,
                }}
                transition={{ type: "spring", damping: 20, stiffness: 400 }}
            >
                <div className="w-full h-full rounded-full bg-white" />
            </motion.div>

            {/* Outer trailing ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{ x: ringX, y: ringY }}
                animate={{
                    width: isHovering ? 80 : 40,
                    height: isHovering ? 80 : 40,
                    marginLeft: isHovering ? -40 : -20,
                    marginTop: isHovering ? -40 : -20,
                    opacity: isVisible ? 0.5 : 0,
                    borderColor: isHovering ? "rgba(10, 255, 157, 0.6)" : "rgba(10, 255, 157, 0.3)",
                }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
            >
                <div className="w-full h-full rounded-full border border-inherit" style={{ borderWidth: "1px" }} />
            </motion.div>
        </>
    );
}
