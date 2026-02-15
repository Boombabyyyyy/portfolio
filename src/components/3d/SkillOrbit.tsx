"use client";
import React, { useMemo } from 'react';
import { Float, Text } from '@react-three/drei';
import { personalInfo } from '@/data/portfolio';
import * as THREE from 'three';

export default function SkillOrbit() {
    const skills = personalInfo.skills;

    // Generate random positions on a sphere
    const words = useMemo(() => {
        const temp = [];
        const spherical = new THREE.Spherical();
        const phiSpan = Math.PI / (skills.length + 1);
        const thetaSpan = (Math.PI * 2) / skills.length;

        for (let i = 0; i < skills.length; i++) {
            // Distribute evenly
            spherical.set(7, phiSpan * (i + 1), thetaSpan * i);
            const pos = new THREE.Vector3().setFromSpherical(spherical);
            temp.push({
                pos,
                word: skills[i]
            });
        }
        return temp;
    }, [skills]);

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <points>
                <sphereGeometry args={[6, 32, 32]} />
                <pointsMaterial size={0.02} color="#00f0ff" transparent opacity={0.3} />
            </points>
            {words.map((item, i) => (
                <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Text
                        position={item.pos}
                        color="#ffffff"
                        fontSize={0.35}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {item.word}
                    </Text>
                </Float>
            ))}
        </group>
    );
}
