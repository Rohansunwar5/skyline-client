'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    Building,
    Zap,
    Award,
    Globe,
    Check,
    Download,
    ShieldCheck,
    Clock,
    DollarSign,
    Users,
    CheckSquare,
    PhoneCall,
    MapPin,
    ChevronRight,
    Sparkles,
    Target
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import CTASection from './CTASection';

export default function AboutPage() {
    const router = useRouter();
    const { openQuote } = useQuoteModal();
    const [activeChip, setActiveChip] = useState<string>('Maharashtra');
    const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

    // Scroll-driven progress for the milestone timeline spine
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 60%', 'end 70%']
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    // Quarter-century journey, key milestones
    const milestones = [
        {
            phase: 'Foundation',
            year: '1999',
            title: 'Company Incorporated in Mumbai',
            desc: "Skyline Electronetworks was founded with 12 engineers and a vision to bring engineering excellence to India's electrical contracting industry."
        },
        {
            phase: 'Milestone',
            year: '2005',
            title: 'First 33kV Substation Commissioned',
            desc: 'Completed our first major HT substation project for MSEDCL — marking our entry into high-voltage power infrastructure works.'
        },
        {
            phase: 'Expansion',
            year: '2010',
            title: 'ISO 9001 Certification & National Expansion',
            desc: 'Achieved ISO 9001 certification and opened regional offices in Delhi, Pune, and Hyderabad, expanding our national footprint to 8 states.'
        },
        {
            phase: 'Landmark Project',
            year: '2016',
            title: 'Metro Rail Traction Power Contract Awarded',
            desc: 'Secured our first metro rail traction power supply project — a defining moment that established Skyline as a critical infrastructure contractor.'
        },
        {
            phase: 'Recognition',
            year: '2024',
            title: '500th Project Completed & CPWD Class-I Registration',
            desc: "Completed our 500th project and received CPWD Class-I registration, enabling participation in India's largest public infrastructure tenders."
        }
    ];

    // States list for India operations
    const keyStates = [
        { name: 'Maharashtra', desc: 'Central Headquarters, active across Mumbai, Pune, Nagpur over 12 HT projects.', highlight: true },
        { name: 'Delhi NCR', desc: 'Regional HQ for North, commissioned 4 metro substations and smart street lighting.', highlight: true },
        { name: 'Gujarat', desc: 'High-voltage industrial cabling spanning Dahej SEZ and chemical refinery grids.', highlight: true },
        { name: 'Telangana', desc: 'SCADA automation and smart lighting projects inside Hyderabad technological hubs.', highlight: true },
        { name: 'Tamil Nadu', desc: 'LT wiring, main panel distribution design for major manufacturing factories.', highlight: true },
        { name: 'Karnataka', desc: 'Dedicated engineering squad servicing tech-parks and substation commissionings.', highlight: true },
        { name: 'West Bengal', desc: 'Traction electrification & OHE transit power grids.', highlight: false },
        { name: 'Rajasthan', desc: 'Solar evacuation substation grid connectivity works.', highlight: false },
        { name: 'UP', desc: 'Power substation development across key highway sectors.', highlight: false },
        { name: 'MP', desc: 'Rural transmission line development & automation.', highlight: false },
        { name: 'Punjab', desc: 'Commercial distribution networks inside urban zones.', highlight: false },
        { name: 'Haryana', desc: 'Industrial high-tension switchyard erections.', highlight: false }
    ];

    // Map nodes representing coordinates on our stylized India map
    const mapNodes = [
        { city: 'Mumbai', top: '55%', left: '33%', principal: true },
        { city: 'Delhi', top: '28%', left: '40%', principal: true },
        { city: 'Pune', top: '61%', left: '35%', principal: false },
        { city: 'Hyderabad', top: '63%', left: '50%', principal: true },
        { city: 'Chennai', top: '75%', left: '54%', principal: true },
        { city: 'Ahmedabad', top: '48%', left: '28%', principal: true },
        { city: 'Kolkata', top: '48%', left: '74%', principal: false },
        { city: 'Bengaluru', top: '72%', left: '44%', principal: false }
    ];

    const handleDownload = (type: string) => {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);

        // Simulate real download trigger
        const link = document.createElement('a');
        link.href = '#';
        // Let's create a visual feedback
    };

    const scrollToOverview = () => {
        const el = document.getElementById('overview');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div id="skyline-about-page" className="bg-[#f8fafc] min-h-screen text-slate-800 animate-fade-in">

            {/* SECTION 1: Breadcrumbs & Hero Header Segment */}
            <div className="bg-[#050c18] relative text-white pt-6 overflow-hidden min-h-[calc(100dvh-71px)] flex flex-col justify-between">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/about-hero.jpg"
                        alt="About Skyline Electronetworks"
                        className="w-full h-full object-cover object-center scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/70 z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                    {/* Breadcrumb strip */}
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 pb-6 sm:pb-12 font-medium tracking-wide">
                        <span
                            onClick={() => router.push('/')}
                            className="hover:text-white cursor-pointer transition flex items-center"
                        >
                            Home
                        </span>
                        <span className="text-slate-600 font-bold">/</span>
                        <span className="text-skyline-orange font-bold">About Us</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                        <div className="lg:col-span-8 space-y-6">

                            <div className="inline-flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-skyline-orange"></span>
                                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-skyline-orange">
                                    Our Story &amp; Legacy
                                </span>
                            </div>

                            <h1 className="font-heading text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                                About <span className="text-skyline-orange">Skyline</span> <br className="hidden md:block" />Electronetworks
                            </h1>

                            <p className="text-slate-300 text-sm md:text-lg leading-relaxed font-normal max-w-3xl">
                                For over 25 years, we have been the trusted backbone of India's power infrastructure, delivering precision-engineered electrical solutions across industries, institutions, and critical public projects.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <button
                                    onClick={scrollToOverview}
                                    className="px-6 py-3 bg-skyline-orange hover:bg-skyline-orange-hover text-slate-950 text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-amber-500/10 transition-all duration-200 cursor-pointer flex items-center space-x-2 min-h-[44px]"
                                >
                                    <Clock className="w-4 h-4" />
                                    <span>Our Journey</span>
                                </button>

                                <button
                                    onClick={() => openQuote()}
                                    className="px-6 py-3 bg-blue-950/40 hover:bg-blue-900/40 border border-slate-700 hover:border-slate-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer flex items-center space-x-2 min-h-[44px]"
                                >
                                    <PhoneCall className="w-4 h-4 text-skyline-orange" />
                                    <span>Get in Touch</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Floating Stat Strip (homepage style) */}
                <div className="relative z-30 w-full bg-[#0B1F3A1F] border-t border-slate-800 mt-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 text-center select-none">
                        <div className="py-5 sm:py-8 px-3 sm:px-4 flex flex-col items-center justify-center space-y-1">
                            <span className="font-heading text-2xl md:text-3xl font-black text-white tracking-tight">1999, Mumbai</span>
                            <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400">Established</span>
                        </div>
                        <div className="py-5 sm:py-8 px-3 sm:px-4 flex flex-col items-center justify-center space-y-1">
                            <span className="font-heading text-xl md:text-2xl font-black text-skyline-orange tracking-tight">HT / LT Electrical Works</span>
                            <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400">Specialisation</span>
                        </div>
                        <div className="py-5 sm:py-8 px-3 sm:px-4 flex flex-col items-center justify-center space-y-1">
                            <span className="font-heading text-sm md:text-base font-black text-white tracking-tight">ISO 9001:2015 | OHSAS 18001</span>
                            <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400">Certification</span>
                        </div>
                        <div className="py-5 sm:py-8 px-3 sm:px-4 flex flex-col items-center justify-center space-y-1">
                            <span className="font-heading text-2xl md:text-3xl font-black text-skyline-orange tracking-tight">18 States</span>
                            <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400">Presence across India</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* SECTION 2: Company Overview & Image Overlay (Figma Screenshot 2) */}
            <section id="overview" className="pt-14 pb-20 md:pt-20 md:pb-24 bg-white scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Left Column: Text & Checklist */}
                        <div className="lg:col-span-7 space-y-7">
                            <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-widest text-skyline-blue block mb-2">
                                    Company Overview
                                </span>
                                <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                    India's Premier Electrical <br />Contracting Partner
                                </h2>
                            </div>

                            {/* Blockquote styled phrase */}
                            <div className="pl-5 border-l-4 border-skyline-orange py-1 bg-slate-50/50 pr-4 rounded-r">
                                <p className="font-body font-semibold text-slate-800 italic text-sm md:text-base leading-relaxed">
                                    "We don't just connect cables, we connect ambitions to reality, powering the infrastructure that powers India."
                                </p>
                            </div>

                            <p className="text-slate-600 text-sm leading-relaxed">
                                Founded in 1999, Skyline Electronetworks Pvt. Ltd. has grown from a regional electrical contractor into one of India's most trusted names in high-voltage and low-voltage electrical contracting. With a legacy built on precision, safety, and engineering excellence, we have successfully delivered over 500 projects spanning metro rail systems, international airports, industrial parks, smart cities, and commercial complexes.
                            </p>

                            <p className="text-slate-600 text-sm leading-relaxed mt-[-8px]">
                                Our multidisciplinary team of 120+ licensed engineers, project managers, and certified technicians operates with a single-minded commitment: to deliver electrical infrastructure that is reliable, safe, and future-ready.
                            </p>

                            {/* Checklist items */}
                            <div className="space-y-4 pt-2">
                                {[
                                    {
                                        title: 'CPWD Registered: Class I Electrical Contractor',
                                        desc: 'Eligible for large-scale government and public sector projects across all Indian states.',
                                        icon: <Award className="w-4 h-4 text-blue-600" />,
                                        bg: 'bg-blue-50 border-blue-200'
                                    },
                                    {
                                        title: '25+ Years of Uninterrupted Operations',
                                        desc: 'A track record of consistent delivery through every industry cycles since inception.',
                                        icon: <Clock className="w-4 h-4 text-amber-600" />,
                                        bg: 'bg-amber-50 border-amber-200'
                                    },
                                    {
                                        title: 'Zero Major Safety Incidents: 8 Consecutive Years',
                                        desc: 'Our safety-first culture is embedded in every process, SOP, and site protocol.',
                                        icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
                                        bg: 'bg-emerald-50 border-emerald-200'
                                    },
                                    {
                                        title: '120+ Certified Engineers & Technical Professionals',
                                        desc: 'A skilled, multidirectional workforce supported by continuous training and upskilling.',
                                        icon: <Users className="w-4 h-4 text-indigo-600" />,
                                        bg: 'bg-indigo-50 border-indigo-200'
                                    },
                                    {
                                        title: 'End-to-End Turnkey Delivery',
                                        desc: 'Design, procurement, installation, testing, and commissioning, all under one roof.',
                                        icon: <Zap className="w-4 h-4 text-orange-500" />,
                                        bg: 'bg-orange-50 border-orange-200'
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start space-x-3.5">
                                        <div className={`mt-1 w-8 h-8 ${item.bg} border rounded-lg flex items-center justify-center shrink-0`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-body font-bold text-slate-900 text-sm">{item.title}</h4>
                                            <p className="text-slate-500 text-xs leading-normal mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Download Brochure button */}
                            <div className="pt-4">
                                <button
                                    onClick={() => handleDownload('profile')}
                                    className="px-5 py-3 bg-white border border-slate-300 hover:border-slate-800 text-slate-800 text-xs font-black uppercase tracking-wider rounded-lg transition duration-200 flex items-center space-x-2 cursor-pointer shadow-sm active:scale-95 min-h-[44px] flex-wrap"
                                >
                                    <Download className={`w-4 h-4 text-skyline-blue ${downloadSuccess ? 'animate-bounce' : ''}`} />
                                    <span>{downloadSuccess ? 'Downloading Company Profile...' : 'Download Company Profile'}</span>
                                </button>
                            </div>

                        </div>

                        {/* Right Column: Custom Rounded Image containing floating labels */}
                        <div className="lg:col-span-5 relative flex justify-center">

                            <div className="relative w-full max-w-[320px] sm:max-w-[390px] aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                <img
                                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
                                    alt="Electrical Infrastructure Project"
                                    className="w-full h-full object-cover object-center scale-[1.02]"
                                />

                                {/* Top Left Badge inside Image card */}
                                <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-sm border border-slate-800/50 px-3 py-1.5 rounded text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                                    Est. 1999 - Mumbai
                                </div>

                                {/* Floating Certifications Stack in bottom right */}
                                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-slate-105 rounded-xl p-3 space-y-2 shadow-lg max-w-[200px]">

                                    {/* ISO */}
                                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-800">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                                        <span>ISO 9001:2015 Certified</span>
                                    </div>

                                    {/* OHSAS */}
                                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-800">
                                        <span className="w-2 h-2 rounded-full bg-[#f59e0b] shrink-0"></span>
                                        <span>OHSAS 18001 Certified</span>
                                    </div>

                                    {/* CPWD */}
                                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-800">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                                        <span>CPWD Class-I Registered</span>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </section>


            {/* SECTION 3: Vision & Mission Section (Dark Slate Background) */}
            <section className="py-16 md:py-24 bg-[#0a1120] text-white relative overflow-hidden">
                {/* Decorative Grid and Background shapes */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-900/20 rounded-full filter blur-[120px] opacity-40"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                    <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
                        <span className="font-mono text-xs font-bold text-skyline-orange tracking-widest uppercase block mb-3">
                            Our Direction
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight">
                            Vision & Mission
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

                        {/* Column 1: Our Vision */}
                        <div className="bg-[#111a2e]/60 border border-slate-800/80 rounded-2xl p-5 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                            <div className="space-y-6">

                                {/* Custom radar/target box icon */}
                                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center rounded-xl shrink-0">
                                    <Target className="w-6 h-6 text-skyline-orange" />
                                </div>

                                <div className="space-y-2">
                                    <span className="font-mono text-[10px] font-bold text-skyline-orange uppercase tracking-wider block">
                                        Our Vision
                                    </span>
                                    <h3 className="font-heading font-bold text-xl md:text-2xl text-white tracking-tight">
                                        To Be India's Most Trusted Electrical Infrastructure Partner
                                    </h3>
                                </div>

                                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                                    We envision a future where every major infrastructure milestone in India, every airport, metro, industrial hub, and smart city, is powered by the reliability and expertise of Skyline Electronetworks.
                                </p>

                                {/* Golden bullet list */}
                                <ul className="space-y-3.5 pt-2">
                                    {[
                                        'Be the benchmark for electrical contracting quality across India by 2030.',
                                        'Expand our pan-India presence to all 28 states with specialised regional teams.',
                                        'Pioneer sustainable, energy-efficient electrical infrastructure for the next generation.',
                                        'Achieve ₹1,000 Cr+ revenue through excellence-driven growth by 2028.'
                                    ].map((bullet, idx) => (
                                        <li key={idx} className="flex items-start space-x-3 text-slate-300 text-xs md:text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-skyline-orange shrink-0 mt-2"></span>
                                            <span className="leading-relaxed">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>

                        {/* Column 2: Our Mission */}
                        <div className="bg-[#111a2e]/60 border border-slate-800/80 rounded-2xl p-5 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                            <div className="space-y-6">

                                {/* Custom star/achievement box icon */}
                                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 flex items-center justify-center rounded-xl shrink-0">
                                    <Sparkles className="w-6 h-6 text-blue-400" />
                                </div>

                                <div className="space-y-2">
                                    <span className="font-mono text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                                        Our Mission
                                    </span>
                                    <h3 className="font-heading font-bold text-xl md:text-2xl text-white tracking-tight">
                                        Deliver Excellence at Every Volt, Every Connection
                                    </h3>
                                </div>

                                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                                    Our mission is to engineer, install, and commission electrical infrastructure of the highest calibre, on time, within budget, and to the strictest safety and quality standards that our clients and communities deserve.
                                </p>

                                {/* Star-blue bullet list */}
                                <ul className="space-y-3.5 pt-2">
                                    {[
                                        'Provide end-to-end electrical solutions with zero compromise on safety or quality.',
                                        'Invest continuously in our workforce through training, certification, and technology.',
                                        'Foster long-term partnerships through transparency, integrity, and accountability.',
                                        'Embrace innovative technologies to reduce project timelines and lifecycle costs.'
                                    ].map((bullet, idx) => (
                                        <li key={idx} className="flex items-start space-x-3 text-slate-300 text-xs md:text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2"></span>
                                            <span className="leading-relaxed">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>

                    </div>

                </div>
            </section>


            {/* SECTION 4: The Skyline Advantage Grid */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
                        <span className="font-mono text-xs font-bold text-skyline-blue tracking-widest uppercase block mb-3">
                            Why Skyline
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                            The Skyline Advantage
                        </h2>
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed mt-3">
                            What separates us from the competition isn't just our capabilities, it's our unwavering commitment to every project, every client, every day.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {[
                            {
                                num: '01',
                                icon: <ShieldCheck className="w-6 h-6 text-skyline-orange" />,
                                iconBg: 'bg-amber-50 group-hover:bg-amber-500/15',
                                iconColor: 'text-skyline-orange',
                                title: 'Zero Lost-Time Incidents, 8 Years Running',
                                desc: 'Safety is not a metric for us, it\'s a culture. Every Skyline site operates under stringent HSE protocols, daily safety audits, PPE compliance checks, and OHSAS 18001-certified management systems. Our workforce goes home safe, every single day.'
                            },
                            {
                                num: '02',
                                icon: <Clock className="w-6 h-6 text-skyline-blue" />,
                                iconBg: 'bg-blue-50 group-hover:bg-blue-500/15',
                                iconColor: 'text-skyline-blue',
                                title: '98.2% On-Time Delivery',
                                desc: 'We leverage agile project management, resource buffering, and real-time tracking to consistently beat timelines without cutting corners. This punctuality keeps commercial installations on target.'
                            },
                            {
                                num: '03',
                                icon: <CheckSquare className="w-6 h-6 text-emerald-600" />,
                                iconBg: 'bg-emerald-50 group-hover:bg-emerald-500/15',
                                iconColor: 'text-emerald-600',
                                title: 'ISO-Certified Quality Systems',
                                desc: 'ISO 9001:2015 certified processes ensure every material, weld, connection, and test meets documented quality standards with full traceability. We execute quality inspections at each system link.'
                            },
                            {
                                num: '04',
                                icon: <Users className="w-6 h-6 text-indigo-600" />,
                                iconBg: 'bg-indigo-50 group-hover:bg-indigo-500/15',
                                iconColor: 'text-indigo-600',
                                title: 'Expert 120+ Member Workforce',
                                desc: 'Licensed electrical engineers, ITI-trained technicians, or PMP-certified project managers, all in-house, continuously trained and upskilled to deal with high-complication power-grids.'
                            },
                            {
                                num: '05',
                                icon: <DollarSign className="w-6 h-6 text-amber-600" />,
                                iconBg: 'bg-amber-50 group-hover:bg-amber-500/15',
                                iconColor: 'text-amber-600',
                                title: 'Value-Engineered Cost Control',
                                desc: 'Our procurement strength, vendor relationships, and lean execution model deliver premium quality at highly competitive project costs. We eliminate unnecessary materials markup.'
                            },
                            {
                                num: '06',
                                icon: <Zap className="w-6 h-6 text-rose-500" />,
                                iconBg: 'bg-rose-50 group-hover:bg-rose-500/15',
                                iconColor: 'text-rose-500',
                                title: '24x7 Post-Completion Support',
                                desc: 'Our commitment doesn\'t end at handover. We offer AMC plans, emergency response, and dedicated support helplines for all project clients to diagnose any telemetry discrepancies post-execution.'
                            }
                        ].map((card, idx) => (
                            <div
                                key={idx}
                                className="group bg-white text-slate-900 rounded-2xl p-5 sm:p-8 relative overflow-hidden border border-slate-200 shadow-md transition-all duration-300 hover:-translate-y-2 hover:bg-[#0a1424] hover:text-white hover:border-skyline-orange/30 hover:shadow-2xl hover:shadow-skyline-orange/5"
                            >
                                <div className="absolute right-6 top-4 font-heading text-8xl font-black text-slate-200 leading-none select-none group-hover:text-white/15 transition-colors duration-300">
                                    {card.num}
                                </div>
                                <div className="space-y-5 relative z-10">
                                    <div className={`w-11 h-11 ${card.iconBg} flex items-center justify-center rounded-xl transition-colors duration-300`}>
                                        {card.icon}
                                    </div>
                                    <h3 className="font-body font-bold text-base md:text-lg">
                                        {card.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs leading-relaxed group-hover:text-slate-400 transition-colors duration-300">
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            </section>


            {/* SECTION 4.5: Our Journey — Key Milestones Timeline */}
            <section id="milestones" className="py-16 md:py-28 bg-[#070d1a] text-white relative overflow-hidden">
                {/* Decorative dot grid + ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
                <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-skyline-orange/10 rounded-full filter blur-[140px] opacity-50"></div>
                <div className="absolute -bottom-32 -left-40 w-96 h-96 bg-blue-900/20 rounded-full filter blur-[120px] opacity-40"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                    {/* Section heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center max-w-2xl mx-auto mb-14 md:mb-24"
                    >
                        <span className="font-mono text-xs font-bold text-skyline-orange tracking-widest uppercase block mb-3">
                            Our Journey
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight">
                            Key Milestones
                        </h2>
                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-4">
                            A quarter-century of growth, delivered one project at a time.
                        </p>
                    </motion.div>

                    {/* Timeline grid: sticky rail (desktop) + milestone stack */}
                    <div ref={timelineRef} className="grid grid-cols-1 lg:grid-cols-12 gap-y-2 lg:gap-x-12">

                        {/* Left: sticky year rail (desktop only) */}
                        <div className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-32">
                                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 block mb-5">
                                    1999 &mdash; 2024
                                </span>
                                <div className="space-y-4">
                                    {milestones.map((m, idx) => (
                                        <div key={idx} className="flex items-baseline gap-3">
                                            <span className="font-heading text-2xl font-black text-slate-700 tabular-nums leading-none">
                                                {m.year}
                                            </span>
                                            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-600 truncate">
                                                {m.phase}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: the spine + milestone entries */}
                        <div className="lg:col-span-9 relative">

                            {/* Spine track (background) */}
                            <div className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-px bg-slate-800/80" aria-hidden="true"></div>

                            {/* Spine progress fill (scroll-driven) */}
                            <motion.div
                                style={{ height: lineHeight }}
                                className="absolute left-[11px] sm:left-[15px] top-2 w-px bg-gradient-to-b from-skyline-orange via-skyline-orange to-skyline-orange/0 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                                aria-hidden="true"
                            ></motion.div>

                            <div className="space-y-10 md:space-y-16">
                                {milestones.map((m, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 32 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-100px' }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative pl-10 sm:pl-14 group"
                                    >
                                        {/* Node dot on the spine */}
                                        <span className="absolute left-0 top-1.5 flex items-center justify-center w-[23px] h-[23px] sm:w-[31px] sm:h-[31px]">
                                            <span className="absolute inset-0 rounded-full bg-skyline-orange/15 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                            <motion.span
                                                initial={{ scale: 0.4, opacity: 0.4 }}
                                                whileInView={{ scale: 1, opacity: 1 }}
                                                viewport={{ once: true, margin: '-100px' }}
                                                transition={{ duration: 0.5, ease: 'backOut', delay: 0.1 }}
                                                className="relative w-3 h-3 rounded-full bg-skyline-orange ring-4 ring-[#070d1a] shadow-[0_0_14px_rgba(245,158,11,0.7)] z-10"
                                            ></motion.span>
                                        </span>

                                        {/* Milestone card */}
                                        <div className="bg-[#0f1a2e]/70 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-5 sm:p-7 transition-all duration-300 group-hover:border-skyline-orange/30 group-hover:bg-[#111e35]/80 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-skyline-orange/5">

                                            {/* Phase chip + year */}
                                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-skyline-orange bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                                                    {m.phase}
                                                </span>
                                                <span className="font-heading text-3xl sm:text-4xl font-black text-white/10 tabular-nums leading-none">
                                                    {m.year}
                                                </span>
                                            </div>

                                            <h3 className="font-body font-bold text-lg sm:text-xl text-white tracking-tight">
                                                {m.title}
                                            </h3>

                                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2.5">
                                                {m.desc}
                                            </p>

                                            {/* Footer year detail */}
                                            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-800/60">
                                                <Clock className="w-3.5 h-3.5 text-slate-600" />
                                                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                                                    Year: <span className="text-slate-300 font-bold">{m.year}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* SECTION 5: Operational Presence Across India */}
            <section className="py-16 md:py-24 bg-[#07101e] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
                <div className="absolute top-20 right-[-100px] w-96 h-96 bg-blue-600/10 rounded-full filter blur-[100px]"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left side: content cards */}
                        <div className="lg:col-span-6 space-y-6">
                            <div>
                                <span className="font-mono text-xs font-bold text-skyline-orange tracking-widest uppercase block mb-2">
                                    Pan-India Operations
                                </span>
                                <h2 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                    Operational Presence <br />Across India
                                </h2>
                                <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-4">
                                    From the metros of Mumbai and Delhi to the industrial corridors of Gujarat and the emerging cities of Tier-2 India, Skyline Electronetworks has the people, infrastructure, and experience to deliver anywhere.
                                </p>
                            </div>

                            {/* Grid of details cards */}
                            <div className="space-y-3 pt-2">

                                {/* Offices card */}
                                <div className="bg-[#111e35]/80 border border-slate-800 p-4.5 rounded-xl flex items-start space-x-3">
                                    <div className="p-2 bg-blue-900/30 border border-blue-900/40 rounded-lg text-skyline-orange mt-0.5">
                                        <Building className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">Regional Offices</span>
                                        <span className="block text-slate-200 text-xs font-semibold mt-1">
                                            Mumbai • Delhi • Pune • Hyderabad • Chennai • Ahmedabad
                                        </span>
                                    </div>
                                </div>

                                {/* States card */}
                                <div className="bg-[#111e35]/80 border border-slate-800 p-4.5 rounded-xl flex items-start space-x-3">
                                    <div className="p-2 bg-blue-900/30 border border-blue-900/40 rounded-lg text-skyline-orange mt-0.5">
                                        <Globe className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">Active Project States</span>
                                        <span className="block text-slate-200 text-xs font-semibold mt-1">
                                            18 States & 3 Union Territories
                                        </span>
                                    </div>
                                </div>

                                {/* Projects card */}
                                <div className="bg-[#111e35]/80 border border-slate-800 p-4.5 rounded-xl flex items-start space-x-3">
                                    <div className="p-2 bg-blue-900/30 border border-blue-900/40 rounded-lg text-skyline-orange mt-0.5">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">Active Sites Currently</span>
                                        <span className="block text-slate-200 text-xs font-semibold mt-1">
                                            24 Simultaneous Projects in Progress
                                        </span>
                                    </div>
                                </div>

                                {/* Support card */}
                                <div className="bg-[#111e35]/80 border border-slate-800 p-4.5 rounded-xl flex items-start space-x-3">
                                    <div className="p-2 bg-blue-900/30 border border-blue-900/40 rounded-lg text-skyline-orange mt-0.5">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">24x7 Operations</span>
                                        <span className="block text-slate-200 text-xs font-semibold mt-1">
                                            Round-the-clock site supervision & emergency support
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Right side: Interactive map representation */}
                        <div className="lg:col-span-6 flex flex-col items-center">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4 select-none">
                                Skyline Electronetworks, India Operational Coverage
                            </span>

                            {/* Map Outline Blueprint mockup visual */}
                            <div className="relative w-full aspect-[1/1] max-w-[420px] bg-[#0c1628] border border-blue-950 rounded-2xl overflow-hidden p-6 shadow-2xl flex items-center justify-center">

                                {/* SVG India simplified region outline backdrop */}
                                <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] opacity-30 text-blue-900 shrink-0" fill="currentColor">
                                    {/* Stylized polygon layout matching a general map outline */}
                                    <path d="M40,5 L50,8 L60,15 L58,25 L68,32 L72,40 L70,48 L58,55 L55,65 L52,78 L49,95 L46,95 L44,80 L32,68 L25,60 L24,52 L20,44 L25,38 L28,30 L32,25 L35,18 L35,10 Z" />
                                </svg>

                                {/* Interactive map nodes overlay */}
                                {mapNodes.map((node, i) => (
                                    <div
                                        key={i}
                                        style={{ top: node.top, left: node.left }}
                                        className="absolute"
                                    >
                                        {/* Ring animation */}
                                        <div className="relative flex items-center justify-center">
                                            <span className="absolute w-6 h-6 rounded-full bg-skyline-blue/20 animate-ping"></span>
                                            <span className={`w-2.5 h-2.5 rounded-full ${node.principal ? 'bg-skyline-orange' : 'bg-skyline-blue'} border border-white z-10`}></span>

                                            {/* Name label */}
                                            <span className="absolute left-3.5 whitespace-nowrap bg-slate-950/80 backdrop-blur-sm text-[9px] font-bold text-white px-1.5 py-0.5 rounded border border-slate-800">
                                                {node.city}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Expanded narrative for active chip */}
                            <div className="mt-6 w-full max-w-[420px] bg-[#111e35]/50 border border-slate-900 rounded-xl p-4 min-h-[70px]">
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 rounded-full bg-skyline-orange"></span>
                                    <span className="text-xs font-bold text-white">{activeChip} Coverage:</span>
                                </div>
                                <p className="text-slate-450 text-[11px] leading-relaxed mt-1">
                                    {keyStates.find(state => state.name === activeChip)?.desc || 'Active regional branch supporting heavy engineering operations.'}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Bottom Chips grid list to toggle description card */}
                    <div className="mt-14 border-t border-slate-900 pt-8">
                        <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4">
                            Select State to inspect project capacity
                        </span>
                        <div className="flex flex-wrap gap-2.5">
                            {keyStates.map((state, i) => {
                                const isSelected = activeChip === state.name;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setActiveChip(state.name)}
                                        className={`px-3.5 py-2.5 rounded-full text-[11px] font-bold tracking-tight transition duration-200 cursor-pointer min-h-[36px] ${isSelected
                                            ? 'bg-skyline-orange text-slate-950 shadow-md'
                                            : state.highlight
                                                ? 'bg-[#111e35] text-slate-200 border border-blue-900/40 hover:bg-[#162744]'
                                                : 'bg-[#0f192b]/40 text-slate-550 border border-slate-900 hover:text-white'
                                            }`}
                                    >
                                        {state.highlight && <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>}
                                        {state.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </section>


            {/* SECTION 6: CTA Banner (reusable component) */}
            <CTASection onDownload={() => handleDownload('brochure')} downloadSuccess={downloadSuccess} />

        </div>
    );
}
