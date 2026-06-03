'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { Phone, Grid, BookOpen, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import { SITE_CONFIG } from '@/lib/siteConfig';

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const SPECIALTIES = [
    '66KV Substation Siting',
    'OHE Transit Traction',
    'IoT Smart Lighting',
    'SCADA Telemetry Integration',
];

export default function Hero() {
    const { openQuote } = useQuoteModal();
    const shouldReduceMotion = useReducedMotion();

    const [years, setYears] = useState(0);
    const [projects, setProjects] = useState(0);
    const [engineers, setEngineers] = useState(0);
    const [states, setStates] = useState(0);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const statsRef = useRef<HTMLDivElement>(null);
    const statsInView = useInView(statsRef, { once: true });

    useEffect(() => {
        if (!statsInView) return;

        const yearsInterval = setInterval(() => setYears(prev => (prev < 25 ? prev + 1 : 25)), 40);
        const projectsInterval = setInterval(() => setProjects(prev => (prev < 500 ? prev + 15 : 500)), 20);
        const engineersInterval = setInterval(() => setEngineers(prev => (prev < 120 ? prev + 4 : 120)), 25);
        const statesInterval = setInterval(() => setStates(prev => (prev < 18 ? prev + 1 : 18)), 60);

        return () => {
            clearInterval(yearsInterval);
            clearInterval(projectsInterval);
            clearInterval(engineersInterval);
            clearInterval(statesInterval);
        };
    }, [statsInView]);

    useEffect(() => {
        if (!isProfileOpen) return;
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsProfileOpen(false); };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isProfileOpen]);

    const stats = [
        { value: years, suffix: '+', label: 'Years of experience', color: 'text-white' },
        { value: projects, suffix: '+', label: 'Projects completed', color: 'text-skyline-orange' },
        { value: engineers, suffix: '+', label: 'Expert engineers', color: 'text-white' },
        { value: states, suffix: '', label: 'States operational', color: 'text-skyline-orange' },
    ];

    return (
        <section id="hero" className="relative bg-skyline-dark text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/home-hero.jpg"
                    alt="Electrical Infrastructure"
                    className="w-full h-full object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/70 z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
            </div>

            {/* min-h uses dvh so mobile browser chrome doesn't cut content */}
            <div className="relative z-[25] max-w-7xl mx-auto px-5 sm:px-6 pt-20 pb-14 md:pt-32 md:pb-24 flex flex-col justify-center min-h-[88dvh] md:min-h-[82dvh]">
                <motion.div
                    className="max-w-3xl space-y-5 sm:space-y-6"
                    variants={shouldReduceMotion ? undefined : containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={shouldReduceMotion ? undefined : itemVariants}
                        className="flex items-center space-x-2 text-skyline-orange"
                    >
                        <span className="w-6 sm:w-8 h-[2px] bg-skyline-orange block shrink-0" />
                        <span className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest">
                            Electrical Contracting Excellence
                        </span>
                    </motion.div>

                    {/* H1 — scales down on very small screens to prevent overflow */}
                    <motion.h1
                        variants={shouldReduceMotion ? undefined : itemVariants}
                        className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-none"
                    >
                        <span className="block text-white">Skyline</span>
                        <span className="block mt-1 sm:mt-2 text-skyline-orange">Electronetworks</span>
                    </motion.h1>

                    <motion.div variants={shouldReduceMotion ? undefined : itemVariants} className="space-y-3 sm:space-y-4">
                        <h2 className="font-body text-lg sm:text-xl md:text-2xl font-semibold text-slate-200 tracking-tight">
                            {SITE_CONFIG.company.tagline}
                        </h2>
                        <p className="font-body text-sm md:text-base text-slate-400 font-normal leading-relaxed max-w-xl">
                            From high-tension distribution networks to intelligent lighting systems, we deliver end-to-end electrical contracting solutions with uncompromising precision, safety, and efficiency across India&apos;s most demanding infrastructure projects.
                        </p>
                    </motion.div>

                    {/* CTA buttons — stack gracefully on narrow screens */}
                    <motion.div variants={shouldReduceMotion ? undefined : itemVariants} className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                        <button
                            id="hero-cta-quote-orange"
                            onClick={() => openQuote()}
                            className="flex items-center space-x-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-skyline-orange hover:bg-skyline-orange-hover text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xl cursor-pointer transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-skyline-orange min-h-[44px]"
                        >
                            <Phone className="w-4 h-4 shrink-0" />
                            <span>Request a Quote</span>
                        </button>

                        <Link
                            id="hero-cta-view-projects"
                            href="/projects"
                            className="flex items-center space-x-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-skyline-dark/80 hover:bg-skyline-dark-light text-white border border-slate-600 hover:border-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-h-[44px]"
                        >
                            <Grid className="w-4 h-4 text-skyline-orange shrink-0" />
                            <span>View Our Projects</span>
                        </Link>

                        <button
                            id="hero-cta-company-profile"
                            onClick={() => setIsProfileOpen(true)}
                            className="flex items-center space-x-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-400 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-h-[44px]"
                        >
                            <BookOpen className="w-4 h-4 text-skyline-orange shrink-0" />
                            <span>Company Profile</span>
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Stats bar — 2 cols on mobile, 4 on md+ */}
            <div ref={statsRef} className="relative z-30 w-full bg-[#0B1F3A1F] border-t border-slate-800">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 text-center select-none">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                            animate={statsInView ? { opacity: 1, y: 0 } : (shouldReduceMotion ? undefined : { opacity: 0, y: 16 })}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                            className="py-6 sm:py-8 px-3 sm:px-4 flex flex-col items-center justify-center space-y-1"
                        >
                            <span className={`font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${stat.color}`}>
                                {stat.value}{stat.suffix}
                            </span>
                            <span className="font-mono text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Company Profile modal — bottom sheet on mobile, right panel on sm+ */}
            <AnimatePresence>
                {isProfileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-end sm:p-4 bg-slate-900/80 backdrop-blur-sm"
                        onClick={() => setIsProfileOpen(false)}
                    >
                        <motion.div
                            initial={{ y: 48, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 48, opacity: 0 }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                            className="w-full sm:max-w-lg bg-slate-950 border-t sm:border border-slate-800 rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[88dvh] sm:h-[85dvh]"
                            onClick={e => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Company Profile"
                        >
                            {/* Bottom-sheet drag handle on mobile */}
                            <div className="sm:hidden flex justify-center pt-2.5 pb-0 shrink-0">
                                <div className="w-10 h-1 bg-slate-700 rounded-full" />
                            </div>

                            <div className="p-4 sm:p-6 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-white">
                                <div className="flex items-center space-x-2">
                                    <BookOpen className="w-5 h-5 text-skyline-orange" />
                                    <h3 className="font-heading text-base sm:text-lg font-bold">Company Profile & Certs</h3>
                                </div>
                                <button
                                    onClick={() => setIsProfileOpen(false)}
                                    className="px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer text-xs font-semibold min-h-[44px]"
                                    aria-label="Close profile panel"
                                >
                                    Close
                                </button>
                            </div>

                            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 flex-1 text-slate-300 text-xs">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-mono text-skyline-orange font-bold uppercase tracking-widest">ABOUT THE EPC CORP</span>
                                    <p className="leading-relaxed">
                                        Established in 1999, Skyline Electronetworks has grown into one of India&apos;s pre-eminent Class-I Electrical Contracting corporations. We deliver high-reliability Engineering, Procurement, and Construction (EPC) services for massive state-backed transit corridors, high-voltage substations, and intensive smart commercial enclosures.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <span className="text-[10px] font-mono text-skyline-orange font-bold uppercase tracking-widest">CORPORATE SPECIALTIES</span>
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3 font-medium text-white">
                                        {SPECIALTIES.map((item) => (
                                            <div key={item} className="p-2.5 sm:p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center space-x-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                <span className="text-[10px] sm:text-[11px] leading-tight">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-3 sm:p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <ShieldAlert className="w-4 h-4 text-amber-500" />
                                        <span className="font-bold text-white text-xs">Contracting Licensure Information</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-relaxed">
                                        Registered CPWD Class-1 (No: CPWD/ELECT/CLASS-I/10294). Permitted for all central, military, and private developers with zero budget caps. ISO 9001:2015 Registered, ISO 45001:2018 Safety Registered.
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsProfileOpen(false)}
                                        className="w-full py-3.5 bg-skyline-blue hover:bg-skyline-blue-hover text-white rounded-lg flex items-center justify-center space-x-1.5 font-bold uppercase tracking-wider text-xs transition min-h-[44px]"
                                    >
                                        <span>Connect with Engineering Desk</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
