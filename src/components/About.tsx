'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowRight, Circle } from 'lucide-react';

const bulletPoints = [
    'CPWD Registered Class-I Electrical Contractor',
    'ISO 9001:2015 & OHSAS 18001 certified',
    'Integrated project delivery',
    '24×7 operations & maintenance',
];

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

export default function About() {
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="about"
            ref={ref}
            className="py-20 md:py-28 bg-white scroll-mt-10 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    <motion.div
                        className="lg:col-span-7 space-y-6"
                        initial={shouldReduceMotion ? undefined : { opacity: 0, x: -32 }}
                        animate={isInView ? { opacity: 1, x: 0 } : (shouldReduceMotion ? undefined : { opacity: 0, x: -32 })}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                    >
                        <div className="space-y-2">
                            <span className="font-mono text-xs font-bold uppercase tracking-widest text-skyline-blue">
                                Who We Are
                            </span>
                            <h2 className="font-heading text-3xl md:text-5xl font-black text-skyline-dark tracking-tight leading-tight">
                                Powering India&apos;s<br />Infrastructure Since 1999
                            </h2>
                        </div>

                        <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
                            <p>
                                Skyline Electronetworks is a premier electrical contracting company specializing in high-voltage and low-voltage power systems, electrical infrastructure development, and turnkey project execution for industrial, commercial, and public sector clients.
                            </p>
                            <p>
                                With a fleet of certified engineers and a proven track record spanning 25 years, we have become the trusted electrical partner for some of India&apos;s most complex and prestigious infrastructure projects from metro rail systems to smart industrial parks.
                            </p>
                        </div>

                        <motion.ul
                            className="space-y-3.5 pt-2"
                            variants={shouldReduceMotion ? undefined : staggerContainer}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                        >
                            {bulletPoints.map((bullet, idx) => (
                                <motion.li
                                    key={idx}
                                    variants={shouldReduceMotion ? undefined : fadeUp}
                                    className="flex items-start space-x-3 text-slate-700 text-xs md:text-sm"
                                >
                                    <span className="w-5 h-5 bg-skyline-blue shrink-0 flex items-center justify-center rounded-full mt-0.5 shadow-sm">
                                        <Circle className="w-3 h-3 text-white fill-white" />
                                    </span>
                                    <span className="leading-tight font-bold">{bullet}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <div className="pt-4">
                            <button
                                id="about-learn-more-btn"
                                onClick={() => {
                                    router.push('/about');
                                    window.scrollTo({ top: 0, behavior: 'instant' });
                                }}
                                className="px-6 py-3 bg-skyline-blue hover:bg-skyline-dark text-white text-xs font-black uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer flex items-center space-x-2 shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-skyline-blue"
                            >
                                <span>Learn More About Us</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="lg:col-span-5 relative w-full flex justify-center"
                        initial={shouldReduceMotion ? undefined : { opacity: 0, x: 32 }}
                        animate={isInView ? { opacity: 1, x: 0 } : (shouldReduceMotion ? undefined : { opacity: 0, x: 32 })}
                        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
                    >
                        <div className="absolute top-12 right-12 w-32 h-32 bg-[#bfdbfe] rounded-full filter blur-xl opacity-40 -z-5 animate-pulse" />
                        <div className="absolute -top-6 -right-6 w-36 h-36 bg-skyline-blue/10 rounded-full -z-10" />

                        <div className="relative w-full max-w-[340px] aspect-[3/4] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border-4 border-white hover:rotate-1 transition-transform duration-300">
                            <Image
                                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80"
                                alt="Electrical Engineering Professional"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 1024px) 100vw, 340px"
                            />

                            <div
                                id="about-fact-badge"
                                className="absolute bottom-0 left-0 right-0 p-5 bg-[#0a1424] text-white border-t border-slate-800"
                            >
                                <div className="flex items-center space-x-1">
                                    <span className="font-heading text-2xl font-black text-skyline-orange tracking-tight">500+</span>
                                    <div className="h-5 w-[1px] bg-slate-700 mx-2" />
                                    <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-slate-300 leading-none">
                                        Projects Successfully Delivered
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
