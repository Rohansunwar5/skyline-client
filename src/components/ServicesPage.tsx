'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Zap,
    Plug,
    Star,
    Lightbulb,
    ClipboardCheck,
    Cpu,
    ArrowRight,
    ShieldCheck,
    CheckCircle,
    Shield,
    FileText,
    Check,
    PhoneCall,
    Activity,
    Layers,
    Wrench,
    Gauge
} from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useQuoteModal } from '@/context/QuoteModalContext';

import Link from 'next/link';
import CTASection from './CTASection';

const commissioningSteps = [
    {
        step: '01',
        name: 'Pre-Commissioning Checks',
        desc: 'Visual inspection, megger tests, continuity checks.',
        icon: FileText,
    },
    {
        step: '02',
        name: 'Protection Relay Testing',
        desc: 'Secondary injection, pick-up, timing, coordination.',
        icon: Shield,
    },
    {
        step: '03',
        name: 'Power Quality Analysis',
        desc: 'Harmonics, voltage, THD, power factor.',
        icon: Activity,
    },
    {
        step: '04',
        name: 'Load Testing',
        desc: 'Full-load, partial-load, and emergency load tests.',
        icon: Gauge,
    },
    {
        step: '05',
        name: 'Final Energisation',
        desc: 'Supervised energisation, snag rectification, handover.',
        icon: CheckCircle,
    },
];

function CommissioningSteps() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-80px' });

    return (
        <div ref={containerRef} className="relative select-none py-6">
            <div className="relative flex flex-col lg:flex-row items-stretch lg:items-start justify-between">

                {/* Desktop horizontal connector track (unchanged) */}
                <div className="hidden lg:block absolute top-[44px] left-[9%] right-[9%] h-[1.5px] bg-slate-200 z-0" />
                <motion.div
                    className="hidden lg:block absolute top-[44px] left-[9%] h-[1.5px] z-0"
                    style={{ background: 'linear-gradient(90deg, #0f2a4e 0%, #1e4a8a 60%, #0f2a4e 100%)' }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '82%' } : { width: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                />

                {commissioningSteps.map((step, idx) => {
                    const Icon = step.icon;
                    const isLast = idx === commissioningSteps.length - 1;
                    return (
                        <motion.div
                            key={step.step}
                            className="relative flex-1 group cursor-default"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 + idx * 0.12 }}
                        >
                            {/*
                             * Mobile:  flex-row — circle on left, text on right (full width, no cramping)
                             * Desktop: flex-col — circle on top, text below (original centered layout)
                             */}
                            <div className="flex flex-row lg:flex-col items-stretch lg:items-center lg:text-center">

                                {/* Left column (mobile) / Top (desktop): circle + vertical connector */}
                                <div className="flex flex-col items-center shrink-0 mr-4 sm:mr-5 lg:mr-0 lg:mb-5">
                                    <div className="relative z-10">
                                        <div className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-skyline-blue flex items-center justify-center z-10">
                                            <span className="text-[8px] font-black text-white leading-none">{step.step}</span>
                                        </div>
                                        <motion.div
                                            className="w-[72px] h-[72px] lg:w-[88px] lg:h-[88px] rounded-full border border-slate-800 bg-white flex items-center justify-center shadow-sm transition-all duration-300 group-hover:border-slate-900 group-hover:shadow-md"
                                            whileHover={{ scale: 1.07 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        >
                                            <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-slate-700 group-hover:text-skyline-blue transition-colors duration-300" strokeWidth={1.5} />
                                        </motion.div>
                                    </div>

                                    {/* Mobile vertical connector — grows to fill step height, bridging to next circle */}
                                    {!isLast && (
                                        <div className="lg:hidden flex-1 w-[1.5px] min-h-[20px] mt-2 bg-slate-200" />
                                    )}
                                </div>

                                {/* Right column (mobile) / Below (desktop): step text */}
                                <div className={`flex-1 lg:flex-none pt-1.5 lg:pt-0 ${isLast ? '' : 'pb-6 lg:pb-0'}`}>
                                    <h4 className="font-heading font-bold text-slate-900 text-[13px] leading-snug mb-1.5 text-left lg:text-center lg:max-w-[130px] lg:mx-auto">
                                        {step.name}
                                    </h4>
                                    <p className="text-slate-400 text-[11px] leading-relaxed text-left lg:text-center lg:max-w-[140px] lg:mx-auto">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

export default function ServicesPage() {
    const { openQuote } = useQuoteModal();

    const [activeTab, setActiveTab] = useState<string>('ht');
    const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

    // References to scroll sections
    const htRef = useRef<HTMLDivElement>(null);
    const ltRef = useRef<HTMLDivElement>(null);
    const infraRef = useRef<HTMLDivElement>(null);
    const lightingRef = useRef<HTMLDivElement>(null);
    const testingRef = useRef<HTMLDivElement>(null);
    const executionRef = useRef<HTMLDivElement>(null);

    const tabs = [
        { id: 'ht', label: 'HT Works', icon: Zap, ref: htRef },
        { id: 'lt', label: 'LT Works', icon: Plug, ref: ltRef },
        { id: 'infra', label: 'Elec. Infrastructure', icon: Star, ref: infraRef },
        { id: 'lighting', label: 'Lighting Systems', icon: Lightbulb, ref: lightingRef },
        { id: 'testing', label: 'Testing & Commissioning', icon: ClipboardCheck, ref: testingRef },
        { id: 'execution', label: 'Project Execution', icon: Cpu, ref: executionRef },
    ];

    const handleTabClick = (tabId: string, ref: React.RefObject<HTMLDivElement | null>) => {
        setActiveTab(tabId);
        if (ref.current) {
            const headerOffset = 90;
            const elementPosition = ref.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Set active tab based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;

            for (const tab of tabs) {
                if (tab.ref.current) {
                    const top = tab.ref.current.offsetTop;
                    const height = tab.ref.current.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveTab(tab.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDownload = () => {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
    };

    return (
        <div id="skyline-services-page" className="bg-[#f8fafc] min-h-screen text-slate-800 animate-fade-in scroll-smooth">

            {/* SECTION 1: Breadcrumbs & Applet Hero Header */}
            <div className="bg-[#050c18] relative text-white pt-6 pb-28 overflow-hidden border-b border-slate-900">

                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/home-hero.jpg"
                        alt="Electrical Infrastructure"
                        className="w-full h-full object-cover object-center scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/70 z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                    {/* Breadcrumb strip */}
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 pb-6 sm:pb-12 font-medium tracking-wide">
                        <Link
                            href="/"
                            className="hover:text-white cursor-pointer transition flex items-center"
                        >
                            Home
                        </Link>
                        <span className="text-slate-600 font-bold">/</span>
                        <span className="text-skyline-orange font-bold">Services</span>
                    </div>

                    <div className="max-w-4xl space-y-6 pt-2">

                        <div className="inline-flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-skyline-orange"></span>
                            <span className="text-skyline-orange font-mono text-[11px] font-bold uppercase tracking-[0.2em]">Our Complete Service Portfolio</span>
                        </div>

                        <h1 className="font-heading text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
                            Electrical Services <br />
                            Built for <span className="text-skyline-orange">India's Scale</span>
                        </h1>

                        <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed font-normal max-w-3xl">
                            From high-tension transmission to smart lighting systems — Skyline Electronetworks delivers end-to-end electrical contracting solutions engineered for reliability, safety, and performance at any scale. Fully licensed Class I contracting with pan-India agility.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <button
                                onClick={() => handleTabClick('ht', htRef)}
                                className="px-6 py-3 bg-skyline-orange hover:bg-skyline-orange-hover text-slate-950 text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-amber-500/10 transition duration-200 cursor-pointer flex items-center space-x-2 active:scale-95 min-h-[44px]"
                            >
                                <Layers className="w-4 h-4" />
                                <span>Explore Services</span>
                            </button>

                            <button
                                onClick={() => openQuote('General Electrical Services')}
                                className="px-6 py-3 bg-blue-950/40 hover:bg-blue-900/40 border border-slate-700 hover:border-slate-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition duration-200 cursor-pointer flex items-center space-x-2 active:scale-95 min-h-[44px]"
                            >
                                <PhoneCall className="w-4 h-4 text-skyline-orange" />
                                <span>Request a Quote</span>
                            </button>
                        </div>

                    </div>
                </div>

                {/* Sub-navigation Menu for Service Categories / Scroll Spy row */}
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#091122]/90 backdrop-blur-md border-t border-slate-900/80">
                    <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-none flex items-center space-x-1 md:space-x-3 py-3 md:py-4">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isSelected = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id, tab.ref)}
                                    className={`flex items-center space-x-2 px-4 py-2.5 border rounded-full text-xs font-bold tracking-tight transition duration-200 shrink-0 outline-none cursor-pointer min-h-[44px] ${isSelected
                                        ? 'bg-skyline-orange/10 border-skyline-orange text-skyline-orange'
                                        : 'bg-transparent border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                        }`}
                                >
                                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-skyline-orange' : 'text-slate-400'}`} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Stats row directly aligned beneath the hero card fold */}
            <div className="bg-skyline-blue text-white py-8 sm:py-10 shadow-lg relative z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">

                    <div className="px-3 sm:px-4 flex flex-col justify-center">
                        <span className="block font-heading text-3xl md:text-4xl font-black text-white">500+</span>
                        <span className="block font-body text-[11px] font-bold text-blue-100 uppercase tracking-widest mt-1">Projects Delivered</span>
                    </div>

                    <div className="px-4 border-r border-white/10 last:border-0 flex flex-col justify-center">
                        <span className="block font-heading text-3xl md:text-4xl font-black text-white">25+</span>
                        <span className="block font-body text-[11px] font-bold text-blue-100 uppercase tracking-widest mt-1">Years Experience</span>
                    </div>

                    <div className="px-4 border-r border-white/10 last:border-0 flex flex-col justify-center">
                        <span className="block font-heading text-3xl md:text-4xl font-black text-white">120+</span>
                        <span className="block font-body text-[11px] font-bold text-blue-100 uppercase tracking-widest mt-1">Certified Engineers</span>
                    </div>

                    <div className="px-4 border-r border-white/10 last:border-0 flex flex-col justify-center select-none">
                        <span className="block font-heading text-3xl md:text-4xl font-black text-white">18</span>
                        <span className="block font-body text-[11px] font-bold text-blue-100 uppercase tracking-widest mt-1">States Operational</span>
                    </div>

                    <div className="px-4 last:border-0 flex flex-col justify-center">
                        <span className="block font-heading text-3xl md:text-4xl font-black text-white">98.2%</span>
                        <span className="block font-body text-[11px] font-bold text-blue-100 uppercase tracking-widest mt-1">On-Time Delivery</span>
                    </div>

                </div>
            </div>


            {/* SECTION 2: Dedicated Service Divisions listing */}
            <div className="py-16 space-y-16 md:space-y-28 lg:space-y-36">

                {/* 01. High Tension (HT) Works Division */}
                <div ref={htRef} className="scroll-mt-28">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">

                        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

                            {/* Left Column: Picture card with spec labels */}
                            <div className="w-full lg:w-5/12 relative flex flex-col justify-center order-1 lg:order-1">

                                <span className="font-mono text-xs font-bold text-skyline-blue uppercase tracking-widest block mb-1">
                                    Service 01
                                </span>
                                <h2 className="font-heading text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                                    High Tension (HT) Works
                                </h2>
                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mt-3 mb-6">
                                    Complete turnkey HT electrical works from design and procurement through to site commissioning — supporting voltages up to 220kV across India's most demanding industrial and public infrastructure projects.
                                </p>

                                <div className="relative w-full aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-xl border-4 border-white group">
                                    <img
                                        src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80"
                                        alt="High Tension Switchyard works"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                                    {/* Overlay banner */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-[#0a1120]/90 backdrop-blur-sm border border-slate-800/50 p-4 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center space-x-2.5">
                                            <Zap className="w-5 h-5 text-skyline-orange" />
                                            <div>
                                                <span className="block text-white font-body font-bold text-xs">HT Works Division</span>
                                                <span className="block text-white/80 text-[9px] font-mono">Upto 220 Kv system turnkey delivery.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Scope chips overlay */}
                                <div className="flex flex-wrap gap-2 mt-4 select-none">
                                    {['11kV', '33kV', '66kV', '110kV', '220kV', 'Outdoor / GIS'].map((chip, idx) => (
                                        <span key={idx} className="bg-slate-150-hover text-slate-700 text-[10px] font-bold px-3.5 py-1 rounded-md border border-slate-205">
                                            {chip}
                                        </span>
                                    ))}
                                </div>

                            </div>

                            {/* Right Column: Cards stack list (HT Sub-services) */}
                            <div className="w-full lg:w-7/12 space-y-4 order-2 lg:order-2">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                    <h4 className="font-body font-black text-[#040c16] text-xs uppercase tracking-wider">Engineering Disciplines</h4>
                                    <button
                                        onClick={() => openQuote('HT Works & Substations')}
                                        className="text-xs font-bold text-skyline-blue hover:text-skyline-blue-hover transition flex items-center space-x-1"
                                    >
                                        <span>Get a Quote</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        {
                                            title: 'HT Substations — Erection & Commissioning',
                                            desc: 'Design, supply, erection, and commissioning of outdoor / indoor HT substations including 11kV, 33kV, 66kV, 132kV, and 220kV grid stations for industries, utilities, and infrastructure sectors.',
                                            tags: ['11kV', '33kV', '66kV', '132kV', '220kV', 'Outdoor / GIS']
                                        },
                                        {
                                            title: 'HT Cable Laying & Jointing',
                                            desc: 'Trenching, laying, and jointing of XLPE / PILC HT power cables in industrial corridors, metro rail networks, oil ports, and underground utility ducts across urban and rural environments.',
                                            tags: ['XLPE', 'PILC', 'Armoured Cables']
                                        },
                                        {
                                            title: 'Transformer Installation & Maintenance',
                                            desc: 'Supply, erection, oil filling, commissioning, and annual maintenance of power transformers from 100 kVA to 100 MVA, including tap changers, bushings, and protection relay panels.',
                                            tags: ['Up to 100 MVA', 'OLTC / NTC']
                                        },
                                        {
                                            title: 'Switchgear & Protection Panels',
                                            desc: 'Procurement, installation, and commissioning of VCBs, SF6 breakers, isolators, CT/PT panels, relay protection panels, and metering cubicles as per CEA / BIS standards.',
                                            tags: ['VCB', 'SF6', 'Relay Protection']
                                        },
                                        {
                                            title: 'Overhead Line (OHL) Construction',
                                            desc: 'Design and construction of 11kV, 33kV, and 66kV overhead transmission and distribution lines including power erection, stringing, and substation adjustments.',
                                            tags: ['CEA Compliance', 'HT Line', 'Double Circuit']
                                        },
                                        {
                                            title: 'Earthing & Lightning Protection',
                                            desc: 'Design and installation of earthing systems, equipment earthing, chemical earthing electrodes, and lightning protection / surge arrestor systems as per IS 3043 standards.',
                                            tags: ['IS 3043', 'Chemical Earthing', 'SPD']
                                        }
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white border border-slate-150 hover:border-slate-300 hover:shadow-md transition-all duration-300 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                                            <div className="space-y-2">
                                                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                                                    <Zap className="w-4 h-4 text-skyline-orange" />
                                                </div>
                                                <h4 className="font-body font-bold text-slate-800 text-[13px] md:text-sm leading-tight">{item.title}</h4>
                                                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 select-none pt-2 border-t border-slate-100">
                                                {item.tags.map((tag, i) => (
                                                    <span key={i} className="text-[9px] font-bold uppercase tracking-wider text-skyline-blue bg-blue-50/50 px-2.5 py-0.5 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                {/* 02. Low Tension (LT) Works Division */}
                <div ref={ltRef} className="scroll-mt-28 bg-[#f1f5f9]/50 py-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">

                        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

                            {/* Left Column: Cards Stack (LT Sub-services) */}
                            <div className="w-full lg:w-7/12 space-y-4 order-2 lg:order-1">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                                    <h4 className="font-body font-black text-[#040c16] text-xs uppercase tracking-wider">System Specifications</h4>
                                    <button
                                        onClick={() => openQuote('LT Panels & Cabling Networks')}
                                        className="text-xs font-bold text-skyline-blue hover:text-skyline-blue-hover transition flex items-center space-x-1"
                                    >
                                        <span>Get a Quote</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        {
                                            title: 'LT Panels & Distribution Board Installation',
                                            desc: 'Supply, fabrication, and installation of LT main distribution panels, ACBs, MCCBs, bus chambers, capacitor banks, and sub-distribution boards for factories, hospitals, and commercial towers.',
                                            tags: ['415V', 'ACB', 'MCCB', 'Bus Duct', 'MCC', 'PFC']
                                        },
                                        {
                                            title: 'LT Cable Networks & Trays',
                                            desc: 'Laying, termination, and commissioning of LT power, control, and instrumentation cables; cable trays and trunking fabrication and installation across industrial and commercial sites.',
                                            tags: ['Armoured', 'GI / FRLS', 'Modular Trunking']
                                        },
                                        {
                                            title: 'Bus Duct & Busbar Systems',
                                            desc: 'Supply and erection of sandwich and non-segregated phase bus duct systems from 630A to 6300A for power-intensive data centers, manufacturing plants, and commercial high-rises.',
                                            tags: ['Up to 6300A', 'Sandwich BD', 'Rising Mains']
                                        },
                                        {
                                            title: 'Internal Wiring & Power Outlets',
                                            desc: 'Complete internal wiring for industrial plants, commercial complexes, hospitals, and residential buildings — including power outlets, DB wiring, concealed / surface conduit, and earthing systems.',
                                            tags: ['IS 732', 'Concealed / Surface']
                                        },
                                        {
                                            title: 'Motor Control Centres (MCC)',
                                            desc: 'Design, fabrication, and installation of motor control centers for pumping stations, manufacturing lines, HVAC systems, and water treatment plants — with DOL, star-delta, and VFD starters.',
                                            tags: ['DOL / SD', 'VFD', 'Soft Starter']
                                        },
                                        {
                                            title: 'DG Set Integration & Changeover',
                                            desc: 'Installation and integration of diesel generator sets from 62.5 kVA to 2500 kVA, including AMF panels, manual / automatic changeover systems, and synchronizing panels for critical load applications.',
                                            tags: ['AMF', 'Synchronization', 'Up to 2500 kVA']
                                        }
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white border border-slate-200 hover:border-slate-350 hover:shadow-md transition-all duration-300 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                                            <div className="space-y-2">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                                                    <Plug className="w-4 h-4 text-skyline-blue" />
                                                </div>
                                                <h4 className="font-body font-bold text-slate-800 text-[13px] md:text-sm leading-tight">{item.title}</h4>
                                                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 select-none pt-2 border-t border-slate-105">
                                                {item.tags.map((tag, i) => (
                                                    <span key={i} className="text-[9px] font-bold uppercase tracking-wider text-skyline-blue bg-blue-50/50 px-2.5 py-0.5 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            {/* Right Column: Picture with specs */}
                            <div className="w-full lg:w-5/12 relative flex flex-col justify-center order-1 lg:order-2">

                                <span className="font-mono text-xs font-bold text-skyline-blue uppercase tracking-widest block mb-1">
                                    Service 02
                                </span>
                                <h2 className="font-heading text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                                    Low Tension (LT) Works
                                </h2>
                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mt-3 mb-6">
                                    Comprehensive low-tension industrial wiring systems, distribution boards, bus ducts, and complete wiring networks delivered to the most stringent standards for commercial, industrial, and residential projects across India.
                                </p>

                                <div className="relative w-full aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-xl border-4 border-white group">
                                    <img
                                        src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                                        alt="Low Tension Control Panels list"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                                    {/* Overlay banner */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-[#0a1120]/90 backdrop-blur-sm border border-slate-800/50 p-4 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center space-x-2.5">
                                            <Plug className="w-5 h-5 text-skyline-blue" />
                                            <div>
                                                <span className="block text-white font-body font-bold text-xs">LT Works Division</span>
                                                <span className="block text-white/80 text-[9px] font-mono">415V systems · Full panel fabrication</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Scope chips overlay */}
                                <div className="flex flex-wrap gap-2 mt-4 select-none">
                                    {['415V', 'ACB', 'MCCB', 'Bus Ducts', 'APFC Panels', 'Cable Trays'].map((chip, idx) => (
                                        <span key={idx} className="bg-slate-200 text-slate-700 text-[10px] font-bold px-3 py-1 rounded-md border border-slate-300">
                                            {chip}
                                        </span>
                                    ))}
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                {/* 03. Electrical Infrastructure Division */}
                <div ref={infraRef} className="scroll-mt-28">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">

                        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

                            {/* Left Column: Picture card */}
                            <div className="w-full lg:w-5/12 relative flex flex-col justify-center order-1">

                                <span className="font-mono text-xs font-bold text-skyline-blue uppercase tracking-widest block mb-1">
                                    Service 03
                                </span>
                                <h2 className="font-heading text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                                    Electrical Infrastructure
                                </h2>
                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mt-3 mb-6">
                                    Large-scale electrical infrastructure development for townships, airports, metro rail systems, SEZs, and smart industrial corridors — engineered for decades of reliable operation.
                                </p>

                                <div className="relative w-full aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-xl border-4 border-white group">
                                    <img
                                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
                                        alt="Heavy electrical infrastructure"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                                    {/* Overlay banner */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-[#0a1120]/90 backdrop-blur-sm border border-slate-800/50 p-4 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center space-x-2.5">
                                            <Star className="w-5 h-5 text-emerald-500" />
                                            <div>
                                                <span className="block text-white font-body font-bold text-xs">Primary Infrastructure</span>
                                                <span className="block text-white/80 text-[9px] font-mono">Airports · Metro · SEZ · Ports</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Scope chips overlay */}
                                <div className="flex flex-wrap gap-2 mt-4 select-none">
                                    {['Airports', 'Metro Rail', 'Smart City', 'Industrial Parks', 'Switchyards'].map((chip, idx) => (
                                        <span key={idx} className="bg-slate-150-hover text-slate-700 text-[10px] font-bold px-3 py-1 rounded-md border border-slate-205">
                                            {chip}
                                        </span>
                                    ))}
                                </div>

                            </div>

                            {/* Right Column: Cards Stack */}
                            <div className="w-full lg:w-7/12 space-y-4 order-2">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                    <h4 className="font-body font-black text-[#040c16] text-xs uppercase tracking-wider">Sector Specific Infrastructure</h4>
                                    <button
                                        onClick={() => openQuote('Heavy Electrical Infrastructure')}
                                        className="text-xs font-bold text-skyline-blue hover:text-skyline-blue-hover transition flex items-center space-x-1"
                                    >
                                        <span>Get a Quote</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        {
                                            title: 'Airport Electrical Systems',
                                            desc: 'Complete electrical infrastructure for greenfield and brownfield airports, HT/LT networks, airfield lighting, CCR systems, baggage handling power, control tower UPS, and airside earthing.',
                                            tags: ['Airport', 'Metro Rail', 'Smart City', 'Industrial Park', 'Switchyard']
                                        },
                                        {
                                            title: 'Metro Rail Traction & Power Supply',
                                            desc: 'Traction power supply systems, 33kV / 11kV power substations, OHE (Overhead Equipment), auxiliary systems, station building, and transmission evacuation for metro rail projects.',
                                            tags: ['Traction Power', 'OHE', 'Third Rail']
                                        },
                                        {
                                            title: 'Industrial Park & SEZ Electrification',
                                            desc: 'Master planning and implementation of complete electrical distribution networks for SEZs, industrial parks, and manufacturing hubs — including dedicated feeders, metering infrastructure, and ring main units.',
                                            tags: ['Ring Main Units', 'Dedicated Feeders']
                                        },
                                        {
                                            title: 'Smart City & Township Electrical',
                                            desc: 'Integrated electrical infrastructure for smart townships, housing developments, and mixed-use urban projects — including underground distribution, smart metering, and EV charging infrastructure.',
                                            tags: ['Smart Meters', 'EV Charging', 'UG Networks']
                                        },
                                        {
                                            title: 'Port & Maritime Electrical Systems',
                                            desc: 'HT/LT electrification for port terminals, jetties, and ship-to-shore crane systems — including shore power supply connections, explosion-proof systems, and marine-grade earthing networks.',
                                            tags: ['Shore Power', 'Ex-Proof', 'Marine Grade']
                                        },
                                        {
                                            title: 'Renewable Energy Integration',
                                            desc: 'Grid integration of solar, wind, and hybrid renewable energy systems — including power conditioning units, injection transformers, net metering, and synchronization with grid infrastructure.',
                                            tags: ['Solar', 'PCU', 'Net Metering']
                                        }
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white border border-slate-150 hover:border-slate-300 hover:shadow-md transition-all duration-300 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                                            <div className="space-y-2">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                                                    <Star className="w-4 h-4 text-emerald-600" />
                                                </div>
                                                <h4 className="font-body font-bold text-slate-800 text-[13px] md:text-sm leading-tight">{item.title}</h4>
                                                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 select-none pt-2 border-t border-slate-100">
                                                {item.tags.map((tag, i) => (
                                                    <span key={i} className="text-[9px] font-bold uppercase tracking-wider text-skyline-blue bg-blue-50/50 px-2.5 py-0.5 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                {/* 04. Lighting Systems Division */}
                <div ref={lightingRef} className="scroll-mt-28 bg-[#f1f5f9]/50 py-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">

                        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

                            {/* Left Column: Cards Stack */}
                            <div className="w-full lg:w-7/12 space-y-4 order-2 lg:order-1">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                                    <h4 className="font-body font-black text-[#040c16] text-xs uppercase tracking-wider">Lux & Control Systems</h4>
                                    <button
                                        onClick={() => openQuote('Street, Arena & Façade Lighting')}
                                        className="text-xs font-bold text-skyline-blue hover:text-skyline-blue-hover transition flex items-center space-x-1"
                                    >
                                        <span>Get a Quote</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        {
                                            title: 'Smart LED Highway & Street Lighting',
                                            desc: 'Design and implementation of energy-efficient LED street and highway lighting systems with IoT-based central management, dimming control, and remote fault monitoring for national and state highways.',
                                            tags: ['Highway', 'Stadium', 'Façade', 'Industrial', 'Tunnel', 'DALI / DMX']
                                        },
                                        {
                                            title: 'Stadium & Sports Floodlighting',
                                            desc: 'High-mast and floodlighting solutions for stadiums, training grounds, and open arenas — meeting ICC, FIFA, and IOC lighting standards with beam control, spill reduction, and emergency lighting backup.',
                                            tags: ['ICC / FIFA Std', 'High Mast', 'UPS Backup']
                                        },
                                        {
                                            title: 'Architectural & Façade Lighting',
                                            desc: 'Custom architectural lighting for government buildings, monuments, corporate HQs, and commercial complexes — including LED façade wash, uplighting, programmable DMX/DALI control, and RGBW systems.',
                                            tags: ['DALI', 'DMX', 'RGBW']
                                        },
                                        {
                                            title: 'Industrial & Warehouse Lighting',
                                            desc: 'High-bay LED lighting for factories, warehouses, logistics hubs, and cold-storage facilities — with lux-level design as per NBC / IS 3646, occupancy sensors, and emergency lighting circuits.',
                                            tags: ['High Bay LED', 'IS 3646', 'Emergency Lighting']
                                        },
                                        {
                                            title: 'Tunnel & Underground Lighting',
                                            desc: 'Specialized lighting for road tunnels, metro tunnels, and underground car parks — including transition zone luminaires, emergency exit lighting, UPS-backed circuits, and fire-rated cabling.',
                                            tags: ['Transition Zone', 'UPS Backed', 'Fire Rated']
                                        },
                                        {
                                            title: 'External Area & Landscape Lighting',
                                            desc: 'Landscape, garden, car park, and perimeter lighting for townships, hospitals, educational institutions, and commercial campuses — with solar hybrid and photocell auto-control options.',
                                            tags: ['Solar Hybrid', 'Photocell', 'IP65+']
                                        }
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white border border-slate-200 hover:border-slate-350 hover:shadow-md transition-all duration-300 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                                            <div className="space-y-2">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                                                    <Lightbulb className="w-4 h-4 text-[#4f46e5]" />
                                                </div>
                                                <h4 className="font-body font-bold text-slate-800 text-[13px] md:text-sm leading-tight">{item.title}</h4>
                                                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 select-none pt-2 border-t border-slate-105">
                                                {item.tags.map((tag, i) => (
                                                    <span key={i} className="text-[9px] font-bold uppercase tracking-wider text-skyline-blue bg-blue-50/50 px-2.5 py-0.5 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            {/* Right Column: Picture with specs */}
                            <div className="w-full lg:w-5/12 relative flex flex-col justify-center order-1 lg:order-2">

                                <span className="font-mono text-xs font-bold text-skyline-blue uppercase tracking-widest block mb-1">
                                    Service 04
                                </span>
                                <h2 className="font-heading text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                                    Lighting Systems
                                </h2>
                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mt-3 mb-6">
                                    From smart LED highway lighting to stadium floodlighting and DALI-controlled architectural systems — we design, supply, and commission lighting solutions that reduce energy consumption and enhance safety.
                                </p>

                                <div className="relative w-full aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-xl border-4 border-white group">
                                    <img
                                        src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
                                        alt="High Mast Lighting corridor setup"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                                    {/* Overlay banner */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-[#0a1120]/90 backdrop-blur-sm border border-slate-800/50 p-4 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center space-x-2.5">
                                            <Lightbulb className="w-5 h-5 text-[#f59e0b]" />
                                            <div>
                                                <span className="block text-white font-body font-bold text-xs">Illumination Division</span>
                                                <span className="block text-white/80 text-[9px] font-mono">LED · Smart Control · Energy Audit</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Scope chips overlay */}
                                <div className="flex flex-wrap gap-2 mt-4 select-none">
                                    {['High Mast', 'DALI Systems', 'Architectural Faccade', 'IoT Dimming', 'Tunnel Lighting'].map((chip, idx) => (
                                        <span key={idx} className="bg-slate-205 text-slate-700 text-[10px] font-bold px-3 py-1 rounded-md border border-slate-300">
                                            {chip}
                                        </span>
                                    ))}
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                {/* 05. Testing & Commissioning Division (Featuring Timeline Chart) */}
                <div ref={testingRef} className="scroll-mt-28">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">

                        {/* Structural header and Infographics process flow */}
                        <div className="text-center max-w-3xl mx-auto space-y-4">
                            <span className="font-mono text-xs font-bold text-skyline-blue tracking-widest uppercase block">
                                Service 05 • Rigorous Pre-Grid Handover Verification
                            </span>
                            <h2 className="font-heading text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                                Testing & Commissioning
                            </h2>
                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto">
                                Every electrical substation and distribution board undergoes rigorous testing to guarantee fault-free operations under severe grid loads. Our procedure from checks to live energisation:
                            </p>
                        </div>

                        {/* AWWWARDS-LEVEL PROCESS STEPS — dark cinematic track */}
                        <CommissioningSteps />

                        <div className="flex flex-col xl:flex-row items-center gap-12 lg:gap-16 pt-6">

                            {/* Left Column: Picture */}
                            <div className="w-full lg:w-5/12 relative flex flex-col justify-center">

                                <div className="relative w-full aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-xl border-4 border-white group">
                                    <img
                                        src="https://images.pexels.com/photos/5767595/pexels-photo-5767595.jpeg?auto=compress&cs=tinysrgb&w=800"
                                        alt="Electrical Engineer auditing boards"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                                    {/* Overlay banner */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-[#0a1120]/90 backdrop-blur-sm border border-slate-800/50 p-4 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center space-x-2.5">
                                            <ClipboardCheck className="w-5 h-5 text-skyline-blue" />
                                            <div>
                                                <span className="block text-white font-body font-bold text-xs">Expert Testing Division</span>
                                                <span className="block text-slate-450 text-[9px] font-mono">ETAP calibration and validation</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Scope chips */}
                                <div className="flex flex-wrap gap-2 mt-4 select-none">
                                    {['CEA Compliant', 'BIS Compliant', 'Megger Testing', 'Thermography'].map((chip, idx) => (
                                        <span key={idx} className="bg-slate-150-hover text-slate-700 text-[10px] font-bold px-3.5 py-1 rounded-md border border-slate-205">
                                            {chip}
                                        </span>
                                    ))}
                                </div>

                            </div>

                            {/* Right Column: Cards Stack */}
                            <div className="w-full lg:w-7/12 space-y-4">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                    <h4 className="font-body font-black text-[#040c16] text-xs uppercase tracking-wider">Calibration Specifications</h4>
                                    <button
                                        onClick={() => openQuote('HT Testing & Commissioning')}
                                        className="text-xs font-bold text-skyline-blue hover:text-skyline-blue-hover transition flex items-center space-x-1"
                                    >
                                        <span>Get a Quote</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        {
                                            title: 'Relay Protection & Coord Studies',
                                            desc: 'Short-circuit and coordination diagnostics using ETAP / DigSILENT software — followed by primary and secondary injection tests.',
                                            tags: ['ETAP', 'Secondary Injection', 'Coordination']
                                        },
                                        {
                                            title: 'Insulation & Continuity Checks',
                                            desc: 'Insulation resistance measurements (IR), polarization index calculations (PI), and continuity testing of critical HT cabling.',
                                            tags: ['IR Testing', 'PI Indexes', 'MV Tests']
                                        },
                                        {
                                            title: 'Thermal Imaging & Power THD',
                                            desc: 'Thermographic scans to pinpoint component hotspots; power quality summaries covering harmonics (THD), surges, and transients.',
                                            tags: ['Thermography', 'THD Reports', 'Power Quality']
                                        },
                                        {
                                            title: 'Earth Resistance studies',
                                            desc: 'Soil resistivity mapping, earth grid loop tests, step and touch potential studies in compliance with IS 3043 / IEEE 80 rules.',
                                            tags: ['IS 3043 Standards', 'IEEE 80', 'Soil Survey']
                                        }
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white border border-slate-150 hover:border-slate-300 hover:shadow-md transition-all duration-300 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                                            <div className="space-y-2">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                                                    <ClipboardCheck className="w-4 h-4 text-skyline-blue" />
                                                </div>
                                                <h4 className="font-body font-bold text-slate-800 text-[13px] md:text-sm leading-tight">{item.title}</h4>
                                                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 select-none pt-2 border-t border-slate-100">
                                                {item.tags.map((tag, i) => (
                                                    <span key={i} className="text-[9px] font-bold uppercase tracking-wider text-skyline-blue bg-blue-50/50 px-2.5 py-0.5 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                {/* 06. SCADA & Automation / Complete Project Execution Section (Dark background matching screenshot 7) */}
                <div ref={executionRef} className="scroll-mt-28 bg-[#070e1c] text-white py-16 md:py-24 relative overflow-hidden">

                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
                    <div className="absolute -bottom-40 -left-10 w-96 h-96 bg-blue-900/10 rounded-full filter blur-[100px] opacity-50"></div>

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16 relative z-10">

                        <div className="text-center max-w-3xl mx-auto space-y-4">
                            <span className="font-mono text-xs font-bold text-skyline-orange tracking-widest uppercase block">
                                Service 06 • Turnkey Engineering Standards
                            </span>
                            <h2 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight">
                                Complete Project Execution
                            </h2>
                            <p className="text-slate-450 text-xs md:text-sm leading-relaxed">
                                Our turnkey project execution capability spans the entire blueprint lifecycle — from design, procurement, and material inspections to final witnessed synchronization, handover, and ongoing AMC maintenance. One partner, absolute safety.
                            </p>
                        </div>

                        {/* Turnkey Blueprint Grid (Figma Screenshot 7 Layout) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    id: '01',
                                    title: 'Design & Engineering',
                                    desc: 'Detailed schematic preparation prepared by our experienced in-house power design drawing squad.',
                                    bullets: ['SLD & layout drawings', 'Load flow & short circuit studies', 'Cable & equipment schedules', 'Compliance documentation']
                                },
                                {
                                    id: '02',
                                    title: 'Procurement & Supply Chain',
                                    desc: 'Vendor-independent component supply directly from verified manufacturers with Material Traceability approvals.',
                                    bullets: ['Factory acceptance tests (FAT)', 'Third-party inspections', 'Logistics & site delivery', 'Material tracking system']
                                },
                                {
                                    id: '03',
                                    title: 'Construction & Installation',
                                    desc: 'Mobilisation, civil foundation casting, board erections, cable routing, jointing, and auxiliary cable integrations.',
                                    bullets: ['Daily site progress reports', 'HSE compliance monitoring', 'Milestone-based tracking', 'Snag list management']
                                },
                                {
                                    id: '04',
                                    title: 'Testing, Commissioning & Handover',
                                    desc: 'Pre-commissioning tests, relay calibration studies, dual grid synch, as-built drawing, and O&M manuals handover.',
                                    bullets: ['Witnessed commissioning', 'As-built documentation', 'O&M manuals', 'Staff training sessions']
                                },
                                {
                                    id: '05',
                                    title: 'AMC & Maintenance Services',
                                    desc: 'Comprehensive annual maintenance contracts for substations, lighting, and engines — offering robust diagnostic safety.',
                                    bullets: ['Preventive maintenance schedules', '24x7 emergency response', 'Spare parts inventory', 'Predictive maintenance reports']
                                },
                                {
                                    id: '06',
                                    title: 'SCADA & Remote Monitoring',
                                    desc: 'Full-grid synchronization with SCADA, remote terminal boards, IoT transceivers monitoring fault and telemetry values.',
                                    bullets: ['Real-time monitoring dashboard', 'Automated fault alerts', 'Energy consumption analytics', 'OT cybersecurity hardening']
                                }
                            ].map((card, idx) => (
                                <div
                                    key={idx}
                                    className="bg-[#111c30]/50 border border-slate-800/80 rounded-2xl p-5 sm:p-8 hover:border-slate-700 hover:bg-[#111c30]/70 transition-all duration-300 flex flex-col justify-between space-y-6 relative group"
                                >
                                    <span className="absolute top-6 right-8 font-heading text-5xl font-black text-slate-800/25 group-hover:text-skyline-orange/10 select-none transition-colors">
                                        {card.id}
                                    </span>

                                    <div className="space-y-4">
                                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                                            {idx === 0 && <FileText className="w-5 h-5 text-skyline-orange" />}
                                            {idx === 1 && <Layers className="w-5 h-5 text-skyline-orange" />}
                                            {idx === 2 && <Wrench className="w-5 h-5 text-skyline-orange" />}
                                            {idx === 3 && <ClipboardCheck className="w-5 h-5 text-skyline-orange" />}
                                            {idx === 4 && <ShieldCheck className="w-5 h-5 text-skyline-orange" />}
                                            {idx === 5 && <Cpu className="w-5 h-5 text-skyline-orange" />}
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="font-heading font-medium text-[15px] md:text-base text-white tracking-tight">{card.title}</h3>
                                            <p className="text-slate-400 text-xs leading-relaxed">{card.desc}</p>
                                        </div>

                                        {/* Specifications checklist bullets */}
                                        <ul className="space-y-2 pt-2 border-t border-slate-850">
                                            {card.bullets.map((bullet, i) => (
                                                <li key={i} className="flex items-start space-x-2 text-slate-300 text-xs">
                                                    <Check className="w-3.5 h-3.5 text-skyline-orange stroke-[3] shrink-0 mt-0.5" />
                                                    <span className="leading-tight">{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>

                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>

            <CTASection onDownload={handleDownload} downloadSuccess={downloadSuccess} />

        </div>
    );
}
