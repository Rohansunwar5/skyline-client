'use client';

import React, { useState, useMemo } from 'react';
import {
    Award,
    MapPin,
    CheckCircle2,
    Quote,
    Star,
    ArrowRight,
    FileText,
    Phone,
    Briefcase,
    Users2,
    ThumbsUp,
    Building,
    Shield,
    Milestone,
    ChevronRight,
    TrendingUp,
    DollarSign,
    Handshake
} from 'lucide-react';
import { motion } from 'motion/react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ClientItem {
    name: string;
    category: 'Government & PSU' | 'Corporate & MNC' | 'Real Estate' | 'Infrastructure';
    tagline: string;
}

const ALL_CLIENTS: ClientItem[] = [
    { name: 'CPWD', category: 'Government & PSU', tagline: 'GOVT. WORKS DEPT.' },
    { name: 'MMRDA', category: 'Infrastructure', tagline: 'METRO RAIL AUTH.' },
    { name: 'MSEDCL', category: 'Government & PSU', tagline: 'STATE ELECTRICITY' },
    { name: 'NHAI', category: 'Infrastructure', tagline: 'HIGHWAYS AUTH.' },
    { name: 'CIDCO', category: 'Infrastructure', tagline: 'CITY DEV. CORP.' },
    { name: 'AAI', category: 'Government & PSU', tagline: 'AIRPORT AUTH. INDIA' },
    { name: 'L&T', category: 'Corporate & MNC', tagline: 'ENGINEERING & CONSTR.' },
    { name: 'TATA', category: 'Corporate & MNC', tagline: 'TATA PROJECTS' },
    { name: 'Infosys', category: 'Corporate & MNC', tagline: 'IT CORPORATION' },
    { name: 'Wipro', category: 'Corporate & MNC', tagline: 'IT CORPORATION' },
    { name: 'HCL', category: 'Corporate & MNC', tagline: 'TECH CAMPUS' },
    { name: 'Siemens', category: 'Corporate & MNC', tagline: 'INDUSTRIAL MNC' },
    { name: 'Lodha', category: 'Real Estate', tagline: 'REAL ESTATE DEV.' },
    { name: 'DLF', category: 'Real Estate', tagline: 'REAL ESTATE DEV.' },
    { name: 'Godrej', category: 'Real Estate', tagline: 'PROPERTIES LTD.' },
    { name: 'Prestige', category: 'Real Estate', tagline: 'PRESTIGE GROUP' },
    { name: 'Oberoi', category: 'Real Estate', tagline: 'OBEROI REALTY' },
    { name: 'Brigade', category: 'Real Estate', tagline: 'BRIGADE GROUP' },
    { name: 'AECOM', category: 'Corporate & MNC', tagline: 'INFRASTRUCTURE' },
    { name: 'Adani', category: 'Infrastructure', tagline: 'PORTS & SEZ' },
    { name: 'GMR', category: 'Infrastructure', tagline: 'LAND AIRPORTS' },
    { name: 'Shapoorji', category: 'Corporate & MNC', tagline: 'PALLONJI GROUP' },
    { name: 'Leighton', category: 'Corporate & MNC', tagline: 'CONSTRUCTOR' },
    { name: 'Gammon', category: 'Infrastructure', tagline: 'INFRASTRUCTURE' },
    { name: 'IHCL', category: 'Corporate & MNC', tagline: 'TAJ HOTELS' },
    { name: 'Marriott', category: 'Corporate & MNC', tagline: 'HOTELS & RESORTS' },
    { name: 'Hyatt', category: 'Corporate & MNC', tagline: 'HOSPITALITY GROUP' },
    { name: 'ITC', category: 'Corporate & MNC', tagline: 'ITC HOTELS' },
    { name: 'Hilton', category: 'Corporate & MNC', tagline: 'HOSPITALITY GROUP' },
    { name: 'Welspun', category: 'Corporate & MNC', tagline: 'INFRASTRUCTURE/MNC' }
];

interface PartnerItem {
    name: string;
    role: string;
    desc: string;
    stat: string;
}

const PARTNER_LIST: PartnerItem[] = [
    {
        name: 'Jacobs Engineering Group',
        role: 'PMC & MEP CONSULTANT',
        desc: 'Global project management and MEP engineering consultancy engaged on our airport and metro infrastructure projects across India.',
        stat: 'Partner since 2014'
    },
    {
        name: 'WSP Global',
        role: 'MEP & STRUCTURAL CONSULTANT',
        desc: 'International engineering consultancy coordinating MEP specifications and design reviews on luxury commercial and high-rise projects.',
        stat: 'Partner since 2011'
    },
    {
        name: 'Systra India',
        role: 'RAIL & METRO CONSULTANT',
        desc: 'French-origin consultancy specialising in metro and urban rail systems, our primary technical partner on traction power supply projects.',
        stat: 'Partner since 2016'
    },
    {
        name: 'BIS: Bureau of Indian Standards',
        role: 'STANDARDS & CERTIFICATION BODY',
        desc: 'Active member of BIS technical committees for electrical safety standards, ensuring our practices are always aligned with the latest IS codes.',
        stat: 'Member since 2005'
    },
    {
        name: 'ECA India',
        role: 'ELECTRICAL CONTRACTORS ASSOCIATION',
        desc: 'Founding member of the Electrical Contractors Association of India, contributing to policy, training standards, and industry advocacy.',
        stat: 'Member since 1999'
    },
    {
        name: 'Turner & Townsend',
        role: 'COST & PROJECT MANAGEMENT',
        desc: 'Global cost management and project management firm engaged as PMC on several large commercial, retail, and data centre projects.',
        stat: 'Partner since 2018'
    },
    {
        name: 'Kirloskar Electric Co.',
        role: 'PREFERRED EQUIPMENT PARTNER',
        desc: 'Long-standing supply and technical partnership for transformers, switchgear, and HT equipment across all Skyline project sites.',
        stat: 'Partner since 2003'
    },
    {
        name: 'National Safety Council of India',
        role: 'SAFETY CERTIFYING BODY',
        desc: 'Corporate member of NSCI. All senior site engineers and safety officers hold NSC-certified competence certifications aligned with the OHSAS 18001 framework.',
        stat: 'Member since 2008'
    }
];

interface RepeatRelationItem {
    id: string;
    name: string;
    desc: string;
    stat: string;
    year: string;
    repeatCount: number;
}

const REPEAT_RELATIONS: RepeatRelationItem[] = [
    { id: 'mmrda', name: 'MMRDA', desc: 'METRO RAIL AUTHORITY', stat: '8 metro contracts awarded', year: 'Client since 2012', repeatCount: 8 },
    { id: 'lodha', name: 'Lodha Group', desc: 'REAL ESTATE DEVELOPER', stat: '6 luxury tower projects', year: 'Client since 2015', repeatCount: 6 },
    { id: 'marriott', name: 'Marriott International', desc: 'HOSPITALITY GROUP', stat: '5 hotel MEP projects', year: 'Client since 2016', repeatCount: 5 },
    { id: 'infosys', name: 'Infosys Limited', desc: 'IT CORPORATION', stat: '4 campus electrical works', year: 'Client since 2018', repeatCount: 4 },
    { id: 'godrej', name: 'Godrej Properties', desc: 'REAL ESTATE DEVELOPER', stat: '7 township & residential projects', year: 'Client since 2013', repeatCount: 7 },
    { id: 'adani', name: 'Adani Ports & SEZ', desc: 'PORT & INDUSTRIAL', stat: '3 port infrastructure contracts', year: 'Client since 2019', repeatCount: 3 },
    { id: 'itc', name: 'ITC Hotels', desc: 'HOSPITALITY GROUP', stat: '5 hotel electrical projects', year: 'Client since 2010', repeatCount: 5 },
    { id: 'dlf', name: 'DLF Limited', desc: 'REAL ESTATE DEVELOPER', stat: '4 commercial & residential projects', year: 'Client since 2014', repeatCount: 4 }
];

export default function ClientsPage() {
    const { openQuote } = useQuoteModal();
    const router = useRouter();
    const [selectedSector, setSelectedSector] = useState<string>('All Sectors');

    const sectorsList = ['All Sectors', 'Government & PSU', 'Corporate & MNC', 'Real Estate', 'Infrastructure'];

    const filteredClients = useMemo(() => {
        if (selectedSector === 'All Sectors') return ALL_CLIENTS;
        return ALL_CLIENTS.filter(client => client.category === selectedSector);
    }, [selectedSector]);

    const handleOpenRequestQuote = (clientStr: string) => {
        openQuote(`Strategic partnership: ${clientStr}`);
    };

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* 1. Header Hero Panel (Figma Screenshot 1 precisely formatted) */}
            <div className="relative text-white pt-10 pb-20 md:py-24 overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/client-hero.jpg"
                        alt="Clients & Partners"
                        className="w-full h-full object-cover object-center scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/70 z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    {/* Breadcrumb path */}
                    <div className="flex items-center space-x-2 text-[11px] font-mono font-bold tracking-widest text-[#a0aec0] uppercase mb-6 sm:mb-10">
                        <button onClick={() => router.push('/')} className="hover:text-amber-500 transition cursor-pointer">HOME</button>
                        <span>/</span>
                        <span className="text-amber-500">CLIENTS</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                        {/* Left Texts layout mimicking screenshot 1 precisely */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="flex items-center space-x-3">
                                <span className="w-10 h-0.5 bg-amber-500"></span>
                                <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-amber-500">
                                    TRUSTED BY INDIA'S FINEST
                                </span>
                            </div>

                            <h1 className="font-heading text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
                                200+ Clients. <br />
                                <span className="text-amber-500">One Standard.</span>
                            </h1>

                            <p className="font-body text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
                                From multinational corporations and luxury hotel chains to government agencies and flagship real estate developers, every client we serve receives the same commitment: excellence without compromise, every single time.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-3">
                                <button
                                    onClick={() => {
                                        const block = document.getElementById('client-directory');
                                        if (block) block.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg flex items-center space-x-2 transition cursor-pointer active:scale-95 text-center min-h-[44px]"
                                >
                                    <Users2 className="w-4 h-4" />
                                    <span>Our Client Base</span>
                                </button>
                                <button
                                    onClick={() => {
                                        const block = document.getElementById('testimonials-block');
                                        if (block) block.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-6 py-3 border border-slate-600 hover:border-white hover:bg-white/5 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center space-x-2 transition cursor-pointer active:scale-95 text-center min-h-[44px]"
                                >
                                    <Quote className="w-4 h-4 text-amber-500" />
                                    <span>Read Testimonials</span>
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Bottom Highlight stats bar (separated from hero) */}
            <div className="bg-[#0d1a2d] text-white border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left">
                        <div className="space-y-1">
                            <p className="text-2xl md:text-3xl font-heading font-black text-amber-500 tracking-tight">200+</p>
                            <p className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">Satisfied Clients</p>
                        </div>
                        <div className="space-y-1 md:border-l md:border-slate-800/60 md:pl-6">
                            <p className="text-2xl md:text-3xl font-heading font-black text-amber-500 tracking-tight">85%</p>
                            <p className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">Repeat Business Rate</p>
                        </div>
                        <div className="space-y-1 md:border-l md:border-slate-800/60 md:pl-6">
                            <p className="text-2xl md:text-3xl font-heading font-black text-amber-500 tracking-tight">50+</p>
                            <p className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">Fortune 500 Clients</p>
                        </div>
                        <div className="space-y-1 md:border-l md:border-slate-800/60 md:pl-6">
                            <p className="text-2xl md:text-3xl font-heading font-black text-amber-500 tracking-tight">18</p>
                            <p className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">Industry Sectors</p>
                        </div>
                        <div className="space-y-1 md:border-l md:border-slate-800/60 md:pl-6 col-span-2 md:col-span-1">
                            <p className="text-2xl md:text-3xl font-heading font-black text-amber-500 tracking-tight">4.9/5</p>
                            <p className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">Average Client Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Top-Of-Body Corporate Certifications checklist line (Screenshot 2 Top row) */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4.5">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3.5 text-xs text-slate-600 font-semibold font-mono">
                        <span className="flex items-center space-x-1.5">
                            <Shield className="w-4 h-4 text-amber-500 uppercase shrink-0" />
                            <span>ISO 9001:2015 Certified</span>
                        </span>
                        <span className="h-4 w-px bg-slate-200 hidden md:block"></span>

                        <span className="flex items-center space-x-1.5">
                            <Award className="w-4 h-4 text-amber-500 uppercase shrink-0" />
                            <span>CPWD Class-1 Registered</span>
                        </span>
                        <span className="h-4 w-px bg-slate-200 hidden md:block"></span>

                        <span className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-amber-500 uppercase shrink-0" />
                            <span>98.2% On-Time Delivery</span>
                        </span>
                        <span className="h-4 w-px bg-slate-200 hidden md:block"></span>

                        <span className="flex items-center space-x-1.5">
                            <Star className="w-4 h-4 text-amber-500 uppercase shrink-0" fill="currentColor" />
                            <span>85% Repeat Client Rate</span>
                        </span>
                        <span className="h-4 w-px bg-slate-200 hidden md:block"></span>

                        <span className="flex items-center space-x-1.5">
                            <Star className="w-4 h-4 text-amber-500 uppercase shrink-0" fill="currentColor" />
                            <span>4.95/5 Client Satisfaction</span>
                        </span>
                        <span className="h-4 w-px bg-slate-200 hidden md:block"></span>

                        <span className="flex items-center space-x-1.5">
                            <Milestone className="w-4 h-4 text-amber-500 uppercase shrink-0" />
                            <span>Pan-India Operations</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* 3. Logo Directory Grid & Category Filters (Screenshot 2 Center layout) */}
            <section id="client-directory" className="py-16 md:py-24 max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                    <div className="inline-flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-amber-500"></span>
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600">Our Clients</span>
                    </div>
                    <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                        Trusted by India's <br />
                        <span className="text-[#1d4ed8]">Leading Organisations</span>
                    </h2>
                    <p className="font-body text-sm md:text-base text-slate-500 leading-relaxed">
                        We are proud to have built lasting partnerships with government bodies, leading real estate developers, multinational corporations, infrastructure giants, and premium hospitality groups.
                    </p>
                </div>

                {/* Sector tab selectors matching Screenshot 2 perfectly */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {sectorsList.map((sector) => (
                        <button
                            key={sector}
                            onClick={() => setSelectedSector(sector)}
                            className={`px-5 py-2.5 text-xs font-bold rounded-full border transition cursor-pointer min-h-[40px] ${selectedSector === sector
                                ? 'bg-slate-900 text-white border-slate-950 shadow-md'
                                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                                }`}
                        >
                            {sector}
                        </button>
                    ))}
                </div>

                {/* Clean Logo Grid resembling the layout screenshot */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-md">
                    {filteredClients.map((client, idx) => (
                        <div
                            key={idx}
                            className="group p-5 sm:p-6 border-r border-b border-slate-100 hover:bg-slate-100/40 transition duration-200 text-center flex flex-col justify-center items-center min-h-[100px] sm:min-h-[120px] select-none"
                        >
                            <h3 className="text-xl font-heading font-black text-slate-800 tracking-tight transition group-hover:text-blue-700">
                                {client.name}
                            </h3>
                            <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mt-1 group-hover:text-amber-500">
                                {client.tagline}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Highlight colored strip bar under logo directory */}
                <div className="mt-16 bg-[#1d4ed8] text-white p-8 rounded-xl shadow-lg">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                        <div className="space-y-1.5">
                            <p className="text-3xl font-heading font-black text-white">200+</p>
                            <p className="text-[9px] font-mono text-blue-100 tracking-widest font-bold uppercase">Clients Served</p>
                        </div>
                        <div className="space-y-1.5 md:border-l md:border-white/20">
                            <p className="text-3xl font-heading font-black text-white">85%</p>
                            <p className="text-[9px] font-mono text-blue-100 tracking-widest font-bold uppercase">Repeat Business Rate</p>
                        </div>
                        <div className="space-y-1.5 md:border-l md:border-white/20">
                            <p className="text-3xl font-heading font-black text-white">18</p>
                            <p className="text-[9px] font-mono text-blue-100 tracking-widest font-bold uppercase">Industry Sectors</p>
                        </div>
                        <div className="space-y-1.5 md:border-l md:border-white/20">
                            <p className="text-3xl font-heading font-black text-white">50+</p>
                            <p className="text-[9px] font-mono text-blue-100 tracking-widest font-bold uppercase">Fortune 500 Clients</p>
                        </div>
                        <div className="space-y-1.5 md:border-l md:border-white/20 col-span-2 md:col-span-1">
                            <p className="text-3xl font-heading font-black text-amber-300">4.9★</p>
                            <p className="text-[9px] font-mono text-blue-100 tracking-widest font-bold uppercase">Avg. Client Rating</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Client Testimonials Asymmetrical Panel (Figma Screenshot 3) */}
            <section id="testimonials-block" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 md:mb-16">
                        <span className="font-mono text-[10px] font-bold text-[#1d4ed8] uppercase tracking-[0.2em]">What Clients Say</span>
                        <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Client Testimonials</h2>
                        <p className="text-slate-500 text-xs md:text-sm font-normal leading-relaxed">
                            Don't take our word for it. Here is what the clients behind India's most iconic projects have to say about working with Skyline Electronetworks.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Massive Hero Highlight Testimonial Box on Left (Anil Kumar Sharma) */}
                        <div className="lg:col-span-7 bg-[#0d1a2d] text-slate-100 p-7 md:p-10 rounded-2xl shadow-xl border border-slate-800 space-y-6 relative overflow-hidden flex flex-col justify-between sm:min-h-[460px]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.1),transparent_70%)] pointer-events-none" />
                            <Quote className="w-12 h-12 text-amber-500 opacity-80 shrink-0" />

                            <div className="space-y-6">
                                <div className="flex items-center space-x-1">
                                    <span className="bg-amber-500/10 text-amber-400 font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-amber-500/20">
                                        METRO RAIL INFRASTRUCTURE
                                    </span>
                                </div>

                                <div className="flex space-x-0.5 text-amber-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                                </div>

                                <p className="font-body text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                                    "Skyline Electronetworks delivered the traction power supply and station electrical works for Mumbai Metro Line 7 under exceptional time and quality pressures. What distinguished them was not just their technical depth, it was the discipline and transparency they brought to every phrase. Their project managers were on-site daily, their testing protocols were meticulous, and when challenges arose, they solved them without drama. The MMRDA has a zero-tolerance policy for delays on metro projects, and Skyline delivered ahead of schedule. They are now our first-choice electrical contractor for all future metro works."
                                </p>
                            </div>

                            <div className="pt-8 border-t border-slate-800 flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-blue-600/30 text-blue-400 ring-2 ring-slate-800 flex items-center justify-center font-heading font-black text-sm">
                                    AK
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-100 text-sm">Anil Kumar Sharma</h4>
                                    <p className="text-slate-400 text-[10px] font-mono mt-0.5 leading-none">
                                        Chief Engineer, Electrical, Mumbai Metropolitan Region Development Authority (MMRDA)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Side column list of styled secondary reviews */}
                        <div className="lg:col-span-5 space-y-6">

                            {/* Review 2 (Priya Ranganathan) */}
                            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/80 shadow-md flex flex-col justify-between space-y-5 sm:min-h-[210px]">
                                <Quote className="w-6 h-6 text-slate-300 transform rotate-180 self-end -mb-4 mr-1 shrink-0" />
                                <div className="space-y-3.5">
                                    <span className="bg-[#1d4ed8]/5 text-[#1d4ed8] border border-[#1d4ed8]/10 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                                        5-STAR HOTEL MEP
                                    </span>

                                    <div className="flex space-x-0.5 text-amber-500">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />)}
                                    </div>

                                    <p className="text-slate-600 text-xs leading-relaxed font-normal">
                                        "We engaged Skyline for the complete MEP electrical works on the JW Marriott Aerocity. Managing electrical installation inside a running hotel environment requires a very different level of professionalism, phased sequencing, noise control, dust management, and absolute adherence to guest experience standards. Skyline's team understood this implicitly. Their work on the ballroom lighting and DALI controls was particularly outstanding. We have since appointed them on two more Marriott properties in India."
                                    </p>
                                </div>

                                <div className="flex items-center space-x-3 pt-6 border-t border-slate-100">
                                    <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs uppercase font-mono">
                                        PR
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-xs">Priya Ranganathan</h4>
                                        <p className="text-slate-400 text-[10px] font-mono">VP, Engineering &amp; Technical Services, Marriott International, South-Asia</p>
                                    </div>
                                </div>
                            </div>

                            {/* Review 3 (Suresh Nair) */}
                            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/80 shadow-md flex flex-col justify-between space-y-5 sm:min-h-[210px]">
                                <Quote className="w-6 h-6 text-slate-300 transform rotate-180 self-end -mb-4 mr-1 shrink-0" />
                                <div className="space-y-3.5">
                                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                                        IT CAMPUS INFRASTRUCTURE
                                    </span>

                                    <div className="flex space-x-0.5 text-amber-500">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />)}
                                    </div>

                                    <p className="text-slate-600 text-xs leading-relaxed font-normal">
                                        "Infosys has extremely demanding electrical specifications for our data centres and campuses. Skyline's engineering team matched our technical requirements precisely and their documentation, from load flow studies to as-built drawings, was among the most thorough we have seen from a contractor. The post-commissioning energy audit they conducted identified savings we hadn't anticipated. We will be working with them on Phase 4 of our Pune campus."
                                    </p>
                                </div>

                                <div className="flex items-center space-x-3 pt-6 border-t border-slate-100">
                                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs uppercase font-mono">
                                        SN
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-xs">Suresh Nair</h4>
                                        <p className="text-slate-400 text-[10px] font-mono">Head, Facilities &amp; Infrastructure, Infosys Limited, Pune</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Under Testimonial Secondary Horizontals */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

                        {/* Review 4 (Vikram Mehta - Lodha group) */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200/85 shadow-md flex flex-col justify-between space-y-6">
                            <Quote className="w-6 h-6 text-slate-300 shrink-0" />
                            <div className="space-y-3">
                                <span className="bg-sky-50 text-sky-700 border border-sky-100 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                                    SUPER-LUXURY RESIDENTIAL
                                </span>
                                <div className="flex space-x-0.5 text-amber-500">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />)}
                                </div>
                                <p className="text-slate-600 text-xs leading-relaxed font-normal">
                                    "Lodha World One is one of the most complex residential electrical projects ever executed in India, 117 floors, twin 33KV substations, smart home integration, and 150 EV charging points. Skyline handled the complexity with remarkable composure. Their site team's knowledge of high-rise electrical systems and their co-ordination with other trade contractors was first class. We have now engaged them for three additional towers in our portfolio."
                                </p>
                            </div>
                            <div className="flex items-center space-x-3 pt-6 border-t border-slate-100">
                                <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs uppercase font-mono">
                                    VM
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-xs">Vikram Mehta</h4>
                                    <p className="text-slate-400 text-[10px] font-mono">Project Director, Lodha Group, Mumbai</p>
                                </div>
                            </div>
                        </div>

                        {/* Review 5 (Rajiv Desai - Adani Ports) */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200/85 shadow-md flex flex-col justify-between space-y-6">
                            <Quote className="w-6 h-6 text-slate-300 shrink-0" />
                            <div className="space-y-3">
                                <span className="bg-amber-50 text-amber-800 border border-amber-100 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                                    INDUSTRIAL PORT INFRASTRUCTURE
                                </span>
                                <div className="flex space-x-0.5 text-amber-300">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />)}
                                </div>
                                <p className="text-slate-600 text-xs leading-relaxed font-normal">
                                    "Shore power supply and explosion-proof electrical systems in a live port environment are not for the faint-hearted. Skyline's HSE record on the Mundra Port project was spotless, not a single lost-time accident across 14 months of site work. Their SCADA integration team demonstrated a level of expertise we rarely find in Indian contractors. Prompt, professional, and technically outstanding."
                                </p>
                            </div>
                            <div className="flex items-center space-x-3 pt-6 border-t border-slate-100">
                                <div className="w-9 h-9 rounded-full bg-[#1d4ed8]/10 text-blue-700 flex items-center justify-center font-bold text-xs uppercase font-mono">
                                    RD
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-xs">Rajiv Desai</h4>
                                    <p className="text-slate-400 text-[10px] font-mono">GM, Infrastructure Projects, Adani Ports &amp; SEZ, Mundra</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. Builders, Consultants & Associations block (Figma Screenshot 4) */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 md:mb-16">
                    <span className="font-mono text-xs font-bold text-[#1d4ed8] uppercase tracking-[0.2em]">Industry Partnerships</span>
                    <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        Builders, Consultants <br />
                        <span className="text-[#1d4ed8]">&amp; Industry Associations</span>
                    </h2>
                    <p className="font-body text-sm md:text-base text-slate-500 leading-relaxed font-normal">
                        Beyond our direct client relations, Skyline Electronetworks collaborates with leading PMCs, architects, MEP consultants, and industry bodies, ensuring every project benefits from the best expertise India has to offer.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PARTNER_LIST.map((partner, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-xl border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
                        >
                            <div className="space-y-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                                    {idx === 0 || idx === 5 ? <Building className="w-5 h-5" /> : idx === 3 || idx === 7 ? <Shield className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                                </div>

                                <h3 className="font-heading text-sm font-black text-slate-900 tracking-tight leading-tight">
                                    {partner.name}
                                </h3>

                                <span className="text-[9px] font-mono text-blue-700 font-bold uppercase tracking-wider block">
                                    {partner.role}
                                </span>

                                <p className="text-slate-500 text-xs leading-relaxed font-normal">
                                    {partner.desc}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                                    {partner.stat}
                                </span>
                                <Handshake className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. The Trust Index & Repeat Engagements */}
            <section className="bg-[#0b1424] text-white py-16 md:py-24 overflow-hidden border-t border-slate-800 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(251,191,36,0.05),transparent_60%)] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Left Texts and Metrics */}
                        <div className="lg:col-span-6 space-y-6">
                            <span className="font-mono text-xs font-bold text-amber-500 uppercase tracking-[0.25em]">The Trust Index</span>
                            <h2 className="font-heading text-3xl md:text-5xl font-black tracking-tight leading-tight">
                                85% of Our Business <br />
                                <span className="text-amber-500">Comes Back to Us</span>
                            </h2>
                            <p className="font-body text-sm text-slate-300 leading-relaxed font-light">
                                The highest endorsement a contractor can receive is a repeat order. When clients return to us project after project, they're saying that we not only met their expectations — we consistently exceeded them.
                            </p>
                            <p className="font-body text-sm text-slate-400 leading-relaxed font-light">
                                Our 85% repeat client rate isn't a metric we track — it's a culture we live. It reflects the trust, relationships, and track record we've built over 25 years of delivering India's most demanding electrical projects.
                            </p>

                            {/* Key Metrics Grid */}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-5 rounded-xl border border-slate-800/80 hover:border-amber-500/30 transition group">
                                    <TrendingUp className="w-5 h-5 text-amber-500 mb-2" />
                                    <p className="text-2xl font-heading font-black text-amber-500 leading-none">85%</p>
                                    <p className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider mt-1.5">Repeat Business Rate</p>
                                </div>
                                <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-5 rounded-xl border border-slate-800/80 hover:border-amber-500/30 transition group">
                                    <Users2 className="w-5 h-5 text-amber-500 mb-2" />
                                    <p className="text-2xl font-heading font-black text-amber-500 leading-none">25+</p>
                                    <p className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider mt-1.5">10+ Year Client Relationships</p>
                                </div>
                                <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-5 rounded-xl border border-slate-800/80 hover:border-amber-500/30 transition group">
                                    <DollarSign className="w-5 h-5 text-amber-500 mb-2" />
                                    <p className="text-2xl font-heading font-black text-amber-500 leading-none">₹3,200 Cr</p>
                                    <p className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider mt-1.5">Value via Repeat Clients</p>
                                </div>
                                <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-5 rounded-xl border border-slate-800/80 hover:border-amber-500/30 transition group">
                                    <Star className="w-5 h-5 text-amber-500 mb-2" />
                                    <p className="text-2xl font-heading font-black text-amber-500 leading-none">4.9★</p>
                                    <p className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider mt-1.5">Average Client Satisfaction</p>
                                </div>
                            </div>
                        </div>

                        {/* Right mini bento grid of repeating relations cards */}
                        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {REPEAT_RELATIONS.map((rep) => (
                                <div
                                    key={rep.id}
                                    className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-slate-800/65 hover:border-amber-500/30 p-5 rounded-xl flex flex-col justify-between space-y-3 transition group"
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-heading font-black text-white text-base tracking-tight group-hover:text-amber-400 transition">{rep.name}</h4>
                                            <span className="bg-amber-500/10 text-amber-400 rounded-sm px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider border border-amber-500/20">
                                                {rep.repeatCount}× Repeat
                                            </span>
                                        </div>
                                        <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider block">{rep.desc}</span>
                                    </div>

                                    <p className="font-mono text-xs text-amber-500 font-bold flex items-center space-x-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                        <span>{rep.stat}</span>
                                    </p>

                                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/70">
                                        <p className="text-[10px] text-slate-400 font-mono">{rep.year}</p>
                                        <span className="text-[9px] font-mono text-amber-500/60 font-bold">Repeat Orders: {rep.repeatCount}×</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </section>

            <section className="bg-[#1e40af] text-white py-16 px-6 relative overflow-hidden">

                {/* Subtle geometric pattern */}
                <div className="absolute inset-0 bg-repeat bg-center opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30h-10v-10h10v10zm-10-10h-10v-10h10v10zm-10-10h-10v-10h10v10zm20-20h-10v-10h10v10z' fill='%23FFFFFF' fill-opacity='.1'/%3E%3C/svg%3E")` }} />

                <div className="max-w-7xl mx-auto relative z-10 space-y-8">

                    <div className="space-y-4">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-200">
                            BECOME A CLIENT
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                            Join 200+ Organisations <br />
                            That Trust Skyline
                        </h2>
                        <p className="font-body text-sm md:text-base text-blue-100 max-w-2xl leading-relaxed">
                            Whether you're a developer, government body, hospitality group, or corporate campus, if your project demands reliable, precision-engineered electrical solutions, we'd love to be your partner. Let's start a conversation.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => handleOpenRequestQuote('New Client Project Inquiry')}
                            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold uppercase text-xs tracking-wider rounded-lg shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2 cursor-pointer active:translate-y-0.5 min-h-[44px]"
                        >
                            <Users2 className="w-4 h-4 shrink-0" />
                            <span>Enquire Now</span>
                        </button>

                        <button
                            onClick={() => router.push('/projects')}
                            className="px-6 py-3.5 border-2 border-white/80 hover:border-white hover:bg-white/10 text-white font-bold uppercase text-xs tracking-wider rounded-lg transition flex items-center justify-center space-x-2 cursor-pointer active:translate-y-0.5 min-h-[44px]"
                        >
                            <Briefcase className="w-4 h-4 shrink-0" />
                            <span>View Our Projects</span>
                        </button>

                        <button
                            onClick={() => handleOpenRequestQuote('Structural Brochure Download request')}
                            className="px-6 py-3.5 border border-white/40 hover:border-white/80 hover:bg-white/5 text-white text-xs font-semibold tracking-wider rounded-lg transition flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                        >
                            <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                            <span>Download Brochure</span>
                        </button>
                    </div>

                </div>
            </section>

        </div>
    );
}
