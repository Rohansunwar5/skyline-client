'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, PhoneCall, Layers, ClipboardList } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/siteConfig';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA } from '@/lib/data';

const SECTORS = ['All Projects', 'High-Rise', 'Hotels', 'Residential', 'IT Buildings', 'Infrastructure'];

const SECTOR_COUNTS = SECTORS.reduce<Record<string, number>>((acc, s) => {
    acc[s] = s === 'All Projects'
        ? PROJECTS_DATA.length
        : PROJECTS_DATA.filter(p => p.sector === s).length;
    return acc;
}, {});

const STATUS_STYLES: Record<string, string> = {
    COMPLETED: 'bg-emerald-500/90 text-white',
    ONGOING: 'bg-amber-500/90 text-slate-950',
    UPCOMING: 'bg-blue-500/90 text-white',
};

const STATUS_DOT: Record<string, string> = {
    COMPLETED: 'bg-emerald-300',
    ONGOING: 'bg-amber-300',
    UPCOMING: 'bg-blue-300',
};

type SortKey = 'newest' | 'value' | 'az';

function sortProjects(projects: typeof PROJECTS_DATA, sort: SortKey) {
    const copy = [...projects];
    if (sort === 'newest') return copy.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    if (sort === 'az') return copy.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'value') {
        return copy.sort((a, b) => {
            const parse = (v?: string) => parseFloat((v ?? '0').replace(/[₹,\sCr+]/g, '')) || 0;
            return parse(b.value) - parse(a.value);
        });
    }
    return copy;
}

export default function ProjectsPage() {
    const router = useRouter();
    const [activeSector, setActiveSector] = useState('All Projects');
    const [sort, setSort] = useState<SortKey>('newest');

    const filtered = useMemo(() => {
        const base = activeSector === 'All Projects'
            ? PROJECTS_DATA
            : PROJECTS_DATA.filter(p => p.sector === activeSector);
        return sortProjects(base, sort);
    }, [activeSector, sort]);

    return (
        <div className="bg-[#f8fafc] min-h-screen">

            {/* Hero */}
            <div className="bg-[#050c18] relative text-white pt-6 pb-16 md:pb-28 overflow-hidden border-b border-slate-900">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/project-hero.jpg"
                        alt="Landmark Projects"
                        className="w-full h-full object-cover object-center scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/70 z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 pb-6 sm:pb-12 font-medium tracking-wide">
                        <button onClick={() => router.push('/')} className="hover:text-white cursor-pointer transition">Home</button>
                        <span className="text-slate-600 font-bold">/</span>
                        <span className="text-skyline-orange font-bold">Projects</span>
                    </div>

                    <div className="max-w-4xl space-y-6 pt-2">
                        <div className="inline-flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-skyline-orange" />
                            <span className="text-skyline-orange font-mono text-[11px] font-bold uppercase tracking-[0.2em]">Our Portfolio — 25 Years of Delivery</span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
                            Projects That Define <span className="text-skyline-orange">Our Legacy</span>
                        </h1>
                        <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed font-normal max-w-3xl">
                            From metro rail traction systems and international airports to luxury hotels and intelligent high-rises — every project reflects our commitment to engineering excellence.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <button
                                onClick={() => { document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
                                className="px-6 py-3 bg-skyline-orange hover:bg-skyline-orange-hover text-slate-950 text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-amber-500/10 transition duration-200 cursor-pointer flex items-center space-x-2 active:scale-95 min-h-[44px]"
                            >
                                <Layers className="w-4 h-4" />
                                <span>Browse Portfolio</span>
                            </button>
                            <button
                                onClick={() => router.push('/contact')}
                                className="px-6 py-3 bg-blue-950/40 hover:bg-blue-900/40 border border-slate-700 hover:border-slate-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition duration-200 cursor-pointer flex items-center space-x-2 active:scale-95 min-h-[44px]"
                            >
                                <PhoneCall className="w-4 h-4 text-skyline-orange" />
                                <span>Start a Project</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats strip */}
            <div className="bg-skyline-blue text-white shadow-lg relative z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 py-7 sm:py-8 text-center">
                    {[
                        { value: '500+', label: 'Projects Completed' },
                        { value: '18', label: 'States Covered' },
                        { value: '₹3,200 Cr+', label: 'Value Executed' },
                        { value: '98.2%', label: 'On-Time Delivery' },
                        { value: '24', label: 'Live Projects' },
                    ].map(s => (
                        <div key={s.label} className="px-2 sm:px-4 flex flex-col justify-center">
                            <span className="block font-heading text-3xl md:text-4xl font-black text-white">{s.value}</span>
                            <span className="block font-body text-[11px] font-bold text-blue-100 uppercase tracking-widest mt-1">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Portfolio section */}
            <section id="projects-grid" className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">

                {/* Header row: title+subtitle LEFT | filter pills RIGHT */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                    <div>
                        <h2 className="font-heading text-2xl font-black text-slate-900 tracking-tight">Project Portfolio</h2>
                        <p className="text-slate-400 text-[13px] mt-1">Click a category to filter projects by sector</p>
                    </div>

                    {/* Sector filter pills */}
                    <div className="flex flex-wrap gap-2">
                        {SECTORS.map(sector => {
                            const active = activeSector === sector;
                            return (
                                <button
                                    key={sector}
                                    onClick={() => setActiveSector(sector)}
                                    className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer border min-h-[40px] ${active
                                        ? 'bg-skyline-blue text-white border-skyline-blue shadow-sm'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    {sector}
                                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                        {SECTOR_COUNTS[sector]}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Sort + count bar */}
                <div className="flex items-center justify-between mb-7 pb-4 border-b border-slate-200">
                    <p className="text-slate-500 text-[13px]">
                        Showing <span className="font-bold text-slate-800">{filtered.length}</span> projects
                    </p>
                    <div className="flex items-center gap-1">
                        <span className="text-slate-400 text-[12px] mr-2 font-medium">Sort:</span>
                        {(['newest', 'value', 'az'] as SortKey[]).map((key) => {
                            const labels: Record<SortKey, string> = { newest: 'Newest', value: 'By Value', az: 'A–Z' };
                            return (
                                <button
                                    key={key}
                                    onClick={() => setSort(key)}
                                    className={`px-3 py-2 text-[11px] font-bold rounded-md transition cursor-pointer min-h-[36px] ${sort === key
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                                        }`}
                                >
                                    {labels[key]}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Masonry-style grid — 3 columns, variable heights via image aspect ratio */}
                <AnimatePresence mode="popLayout">
                    {filtered.length > 0 ? (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-0">
                            {filtered.map((project, idx) => {
                                // Alternate tall/short cards for visual rhythm
                                const isTall = idx % 5 === 0 || idx % 5 === 3;
                                return (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: (idx % 6) * 0.05 }}
                                        className="break-inside-avoid mb-4 sm:mb-5 group cursor-pointer"
                                    >
                                        <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300">

                                            {/* Image */}
                                            <div className={`relative overflow-hidden ${isTall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                                                <picture>
                                                    <source media="(max-width: 767px)" srcSet={project.mobileImageUrl} />
                                                    <img
                                                        src={project.imageUrl}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                                                        referrerPolicy="no-referrer"
                                                    />
                                                </picture>
                                                {/* Gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                                                {/* Top badges row */}
                                                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between gap-2">
                                                    {/* Sector badge */}
                                                    <span className="px-2.5 py-1 rounded-md font-mono text-[9px] font-bold uppercase tracking-wider text-white"
                                                        style={{ background: 'rgba(15,42,78,0.85)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                        {project.sector}
                                                    </span>

                                                    {/* Status badge */}
                                                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[9px] font-black uppercase tracking-wider ${STATUS_STYLES[project.status]}`}
                                                        style={{ backdropFilter: 'blur(6px)' }}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
                                                        {project.status === 'COMPLETED' ? '✦ Completed' : project.status === 'ONGOING' ? '● Ongoing' : '◆ Upcoming'}
                                                    </span>
                                                </div>

                                                {/* Bottom text overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <div className="flex items-center gap-1.5 mb-1">
                                                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                                                        <span className="text-[10px] text-slate-300 font-mono leading-none">{project.location}</span>
                                                    </div>
                                                    <h3 className="font-heading font-black text-white text-[15px] leading-snug tracking-tight group-hover:text-amber-100 transition-colors">
                                                        {project.title}
                                                    </h3>
                                                    {project.value && (
                                                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 border border-white/10">
                                                            <span className="text-[9px] font-bold font-mono text-white/70 uppercase tracking-wider">Value</span>
                                                            <span className="text-[9px] font-black font-mono text-skyline-orange">{project.value}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16 bg-white border border-slate-200 rounded-2xl"
                        >
                            <ClipboardList className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500 text-sm font-medium">No projects in this sector.</p>
                            <button
                                onClick={() => setActiveSector('All Projects')}
                                className="mt-4 px-5 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-950 transition"
                            >
                                View All Projects
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </section>

            {/* CTA — Start a Conversation */}
            <section className="relative text-white py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/contact.jpg"
                        alt="Contact Skyline Electronetworks"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-skyline-blue/95 via-blue-900/90 to-blue-950/85 z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-950/90 to-transparent z-10" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
                    <div className="max-w-3xl space-y-6">
                        <span className="font-mono text-xs font-black text-amber-300 uppercase tracking-widest block">
                            ADD YOURS TO THE LIST
                        </span>

                        <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                            Let's Build Your Next Landmark Project
                        </h2>

                        <p className="text-blue-50 text-sm md:text-base leading-relaxed font-normal max-w-2xl">
                            Join 200+ satisfied clients who trust Skyline Electronetworks to power their most important projects — on time, on budget, zero compromise.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <button
                                onClick={() => router.push('/contact')}
                                className="px-6 py-3 bg-white hover:bg-slate-50 text-skyline-blue text-xs font-black uppercase tracking-wider rounded-lg shadow-xl transition active:scale-95 cursor-pointer min-h-[44px]"
                            >
                                Request a Quote
                            </button>

                            <a
                                href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
                                className="px-6 py-3 border border-white/60 hover:border-white hover:bg-white/5 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition cursor-pointer flex items-center space-x-2 min-h-[44px]"
                            >
                                <PhoneCall className="w-4 h-4" />
                                <span>Call Us Now</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
