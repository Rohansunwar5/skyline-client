'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { Zap, Plug, Star, Lightbulb, ClipboardCheck, Cpu, ArrowRight, X, Shield, FileText, CheckCircle } from 'lucide-react';
import { ServiceItem } from '@/lib/types';
import { SERVICES_DATA } from '@/lib/data';
import { useQuoteModal } from '@/context/QuoteModalContext';
import { useRouter } from 'next/navigation';

const cardContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const cardItem = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function renderIcon(iconName: string, isHighlighted: boolean) {
    const className = `w-6 h-6 ${isHighlighted ? 'text-skyline-orange' : 'text-skyline-blue'}`;
    switch (iconName) {
        case 'Zap': return <Zap className={className} />;
        case 'Plug': return <Plug className={className} />;
        case 'Star': return <Star className="w-6 h-6 text-skyline-orange fill-skyline-orange" />;
        case 'Lightbulb': return <Lightbulb className={className} />;
        case 'ClipboardCheck': return <ClipboardCheck className={className} />;
        case 'Cpu': return <Cpu className={className} />;
        default: return <Zap className={className} />;
    }
}

function getSubDetails(category: string) {
    switch (category) {
        case 'HT': return {
            capacity: '11KV to 132KV systems',
            scope: 'Substation bays, power transformer siting, overhead routing mast structures, HT Ring main units (RMU)',
            standards: 'CEA Regulations, IS 2026/11171 compliance parameters',
        };
        case 'LT': return {
            capacity: 'Up to 1000V setups',
            scope: 'LT MCC panels, intelligent distribution bus ducts, dynamic capacitor APFC banks, cabling tray ladders',
            standards: 'IS 8623 compliance, CPWD Schedule of Works specifications',
        };
        case 'infrastructure': return {
            capacity: 'Heavy Transit / Industrial Grid tie',
            scope: 'Mass transit OHE catenaries, large SEZ distribution networks, switchyard civil framing, airport underground cable arrays',
            standards: 'RDSO Transit parameters, National Grid Code mandates',
        };
        case 'lighting': return {
            capacity: 'Smart Lux management networks',
            scope: 'Multi-km highway LED luminaire arrays, stadium sports floodlights, dynamic office architectural linear channels',
            standards: 'BEE lighting standards, DALI & KNX communications standard',
        };
        case 'testing': return {
            capacity: 'Diagnostic & Thermal Telemetry',
            scope: 'Relay CT/PT calibration studies, SF6 breaker gas testing, high-pot cable testing, thermographical panel diagnostic imaging',
            standards: 'IEEE Commissioning guidelines, NETA test specifications',
        };
        case 'automation': return {
            capacity: 'PLC / IEC 61850 protocol suites',
            scope: 'Real-time telemetry RTU dashboards, fiber optic communication nodes, automated diesel fallback transfer systems',
            standards: 'IEC 61850 Smart Grid protocol suite standard',
        };
        default: return {
            capacity: 'Standard commercial grid integration',
            scope: 'Complete corporate power cabling layout',
            standards: 'CEA electrical licensing provisions',
        };
    }
}

export default function Services() {
    const { openQuote } = useQuoteModal();
    const shouldReduceMotion = useReducedMotion();
    const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    useEffect(() => {
        if (!selectedService) return;
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedService(null); };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [selectedService]);

    return (
        <section id="services" ref={ref} className="py-20 md:py-28 bg-[#f8fafc] scroll-mt-10">
            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    className="text-center max-w-2xl mx-auto space-y-4 mb-16"
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : (shouldReduceMotion ? undefined : { opacity: 0, y: 24 })}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                >
                    <span className="font-mono text-xs font-black uppercase tracking-widest text-skyline-blue block">
                        What We Do
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl font-black text-skyline-dark tracking-tight">
                        Comprehensive Electrical Services
                    </h2>
                    <p className="font-body text-sm md:text-base text-slate-500 leading-relaxed font-normal">
                        End-to-end electrical contracting solutions engineered for scale, built for reliability, and delivered with precision.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={shouldReduceMotion ? undefined : cardContainer}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {SERVICES_DATA.map((service) => (
                        <motion.div
                            key={service.id}
                            id={`service-card-${service.id}`}
                            variants={shouldReduceMotion ? undefined : cardItem}
                            className="group relative rounded-2xl p-5 sm:p-8 border transition-all duration-300 shadow-sm flex flex-col justify-between bg-white border-slate-100 hover:bg-skyline-dark hover:border-skyline-dark hover:text-white hover:shadow-xl hover:-translate-y-1 text-slate-800 cursor-default"
                        >
                            <div>
                                <div className="flex items-center justify-between pb-6">
                                    <div className="p-3.5 rounded-xl transition bg-slate-50 group-hover:bg-white/10">
                                        {renderIcon(service.iconName, false)}
                                    </div>
                                    <span className="font-heading text-5xl font-black tracking-tight select-none opacity-20 text-slate-300 group-hover:text-slate-500">
                                        {service.number}
                                    </span>
                                </div>

                                <h3 className="font-heading text-lg font-bold tracking-tight mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-xs md:text-sm leading-relaxed mb-6 font-normal text-slate-500 group-hover:text-slate-300">
                                    {service.description}
                                </p>
                            </div>

                            <button
                                id={`service-explore-link-${service.id}`}
                                onClick={() => setSelectedService(service)}
                                className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider group/link transition outline-none cursor-pointer text-skyline-blue group-hover:text-skyline-orange focus-visible:underline"
                            >
                                <span>Explore Service</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    ))}
                </motion.div>

                <AnimatePresence>
                    {selectedService && (() => {
                        const detailedData = getSubDetails(selectedService.category);
                        return (
                            <motion.div
                                key="service-modal-backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                                onClick={() => setSelectedService(null)}
                            >
                                <motion.div
                                    key="service-modal"
                                    initial={{ scale: 0.94, opacity: 0, y: 16 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.94, opacity: 0, y: 16 }}
                                    transition={{ duration: 0.22, ease: 'easeOut' }}
                                    className="relative w-full max-w-xl overflow-hidden bg-white shadow-2xl rounded-2xl border border-slate-100 max-h-[92dvh] flex flex-col"
                                    onClick={e => e.stopPropagation()}
                                    role="dialog"
                                    aria-modal="true"
                                    aria-label={selectedService.title}
                                >
                                    <div className="flex items-center justify-between p-6 bg-skyline-dark text-white">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-white/10 rounded-lg">
                                                {renderIcon(selectedService.iconName, true)}
                                            </div>
                                            <div>
                                                <h3 className="font-heading text-lg font-bold">{selectedService.title}</h3>
                                                <p className="text-[10px] text-skyline-orange font-mono uppercase tracking-wider">Service Classification Specification</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedService(null)}
                                            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                                            aria-label="Close service details"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 text-slate-700 text-xs md:text-sm overflow-y-auto flex-1">
                                        <div>
                                            <h5 className="font-semibold text-slate-500 font-mono uppercase text-[10px] tracking-wider mb-1">Functional Outline</h5>
                                            <p className="leading-relaxed text-slate-600 font-medium">{selectedService.description}</p>
                                        </div>

                                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5">
                                            <div className="flex items-start space-x-2.5">
                                                <Shield className="w-4 h-4 text-skyline-blue shrink-0 mt-0.5" />
                                                <div>
                                                    <span className="font-bold text-skyline-dark text-xs">Standard Capacity Scope:</span>
                                                    <p className="text-slate-500 text-xs mt-0.5">{detailedData.capacity}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-2.5">
                                                <FileText className="w-4 h-4 text-skyline-blue shrink-0 mt-0.5" />
                                                <div>
                                                    <span className="font-bold text-skyline-dark text-xs">Structural Engineering Material:</span>
                                                    <p className="text-slate-500 text-xs mt-0.5">{detailedData.scope}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-2.5">
                                                <CheckCircle className="w-4 h-4 text-skyline-blue shrink-0 mt-0.5" />
                                                <div>
                                                    <span className="font-bold text-skyline-dark text-xs">ISO & National Utility Codes:</span>
                                                    <p className="text-slate-500 text-xs mt-0.5">{detailedData.standards}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 pt-2">
                                            <button
                                                onClick={() => {
                                                    openQuote(selectedService.title);
                                                    setSelectedService(null);
                                                }}
                                                className="flex-1 py-3 bg-skyline-orange hover:bg-skyline-orange-hover text-white rounded-lg text-xs font-bold uppercase tracking-wider text-center transition cursor-pointer"
                                            >
                                                Instant Quote for {selectedService.title}
                                            </button>
                                            <button
                                                onClick={() => setSelectedService(null)}
                                                className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold transition cursor-pointer"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })()}
                </AnimatePresence>
            </div>
        </section>
    );
}
