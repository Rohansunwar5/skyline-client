'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';
import { ProjectItem } from '@/lib/types';
import { PROJECTS_DATA } from '@/lib/data';

function ProjectCard({
    proj,
    onInspect,
    delay = 0,
    isInView,
    reduceMotion,
    className = '',
}: {
    proj: ProjectItem;
    onInspect: (p: ProjectItem) => void;
    delay?: number;
    isInView: boolean;
    reduceMotion: boolean | null;
    className?: string;
}) {
    return (
        <motion.div
            className={`group relative flex flex-col justify-between rounded-2xl bg-slate-900 overflow-hidden shadow-lg border border-slate-800 ${className}`}
            initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : (reduceMotion ? undefined : { opacity: 0, y: 28 })}
            transition={{ duration: 0.55, delay, ease: 'easeOut' }}
        >
            <img
                src={proj.imageUrl}
                alt={proj.title}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-55 group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />

            <div className="relative z-20 p-4 sm:p-6 self-start">
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-skyline-blue text-white font-mono text-[10px] font-bold rounded-md uppercase tracking-wider">
                    {proj.category}
                </span>
            </div>

            <div className="relative z-20 p-4 sm:p-6 text-white space-y-2 sm:space-y-3">
                <div className="space-y-1">
                    <span className="flex items-center space-x-1.5 text-slate-300 font-mono text-[10px]">
                        <MapPin className="w-3.5 h-3.5 text-skyline-orange shrink-0" />
                        <span>{proj.location}</span>
                    </span>
                    <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold tracking-tight group-hover:text-skyline-orange transition">
                        {proj.title}
                    </h3>
                </div>

                {proj.description && (
                    <p className="text-slate-300 text-xs leading-relaxed font-normal line-clamp-2">
                        {proj.description}
                    </p>
                )}

                <div className="flex items-center justify-end pt-2 border-t border-slate-800">
                    <button
                        onClick={() => onInspect(proj)}
                        className="px-2.5 py-1.5 bg-skyline-orange hover:bg-skyline-orange-hover text-white text-[11px] font-bold tracking-wider uppercase rounded flex items-center space-x-1 transition cursor-pointer min-h-[36px]"
                    >
                        <span>Spec Sheets</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();
    const [inspectingProject, setInspectingProject] = useState<ProjectItem | null>(null);

    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    useEffect(() => {
        if (!inspectingProject) return;
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setInspectingProject(null); };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [inspectingProject]);

    const metro = PROJECTS_DATA.find(p => p.id === 'mumbai-metro-line-3');
    const airport = PROJECTS_DATA.find(p => p.id === 'navi-mumbai-airport');
    const substation = PROJECTS_DATA.find(p => p.id === 'pune-sez-substation');
    const highway = PROJECTS_DATA.find(p => p.id === 'nh48-highway-lighting');

    const reduceMotion = shouldReduceMotion ?? false;

    return (
        <section id="projects" ref={ref} className="py-20 md:py-28 bg-white scroll-mt-10">
            <div className="max-w-7xl mx-auto px-5 sm:px-6">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
                    <motion.div
                        className="space-y-3 sm:space-y-4 max-w-2xl"
                        initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : (reduceMotion ? undefined : { opacity: 0, y: 20 })}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                    >
                        <span className="font-mono text-xs font-black uppercase tracking-widest text-skyline-blue block">
                            Our Work
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-black text-skyline-dark tracking-tight">
                            Project Highlights
                        </h2>
                        <p className="font-body text-sm md:text-base text-slate-500 max-w-lg leading-relaxed font-normal">
                            A selection of landmark projects that demonstrate our capability and scale.
                        </p>
                    </motion.div>

                    {/* Desktop "View All" CTA */}
                    <motion.div
                        className="hidden md:block"
                        initial={reduceMotion ? undefined : { opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : (reduceMotion ? undefined : { opacity: 0 })}
                        transition={{ duration: 0.55, delay: 0.2 }}
                    >
                        <button
                            id="view-all-projects-btn"
                            onClick={() => router.push('/projects')}
                            className="px-6 py-3 border-2 border-slate-300 hover:border-skyline-dark hover:bg-skyline-dark/5 text-skyline-dark text-xs font-bold uppercase tracking-wider rounded-lg transition cursor-pointer min-h-[44px]"
                        >
                            Explore Full Portfolio →
                        </button>
                    </motion.div>
                </div>

                {/* Bento grid — single column on mobile, 2 columns on lg+ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
                    <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-6 lg:gap-8">
                        {metro && (
                            <ProjectCard
                                proj={metro}
                                onInspect={setInspectingProject}
                                delay={0}
                                isInView={isInView}
                                reduceMotion={reduceMotion}
                                /* Shorter on mobile to reduce scroll depth */
                                className="flex-1 min-h-[280px] sm:min-h-[360px] lg:min-h-[460px]"
                            />
                        )}
                        {airport && (
                            <ProjectCard
                                proj={airport}
                                onInspect={setInspectingProject}
                                delay={0.1}
                                isInView={isInView}
                                reduceMotion={reduceMotion}
                                className="min-h-[220px] sm:min-h-[250px] lg:min-h-[290px]"
                            />
                        )}
                    </div>

                    <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-6 lg:gap-8">
                        {substation && (
                            <ProjectCard
                                proj={substation}
                                onInspect={setInspectingProject}
                                delay={0.05}
                                isInView={isInView}
                                reduceMotion={reduceMotion}
                                className="flex-1 min-h-[260px] sm:min-h-[320px] lg:min-h-[360px]"
                            />
                        )}
                        {highway && (
                            <ProjectCard
                                proj={highway}
                                onInspect={setInspectingProject}
                                delay={0.15}
                                isInView={isInView}
                                reduceMotion={reduceMotion}
                                className="flex-1 min-h-[260px] sm:min-h-[320px] lg:min-h-[360px]"
                            />
                        )}
                    </div>
                </div>

                {/* Mobile-only "View All" CTA below the grid */}
                <div className="mt-8 md:hidden">
                    <button
                        onClick={() => router.push('/projects')}
                        className="w-full py-3.5 border-2 border-slate-300 hover:border-skyline-dark hover:bg-skyline-dark/5 text-skyline-dark text-xs font-bold uppercase tracking-wider rounded-lg transition cursor-pointer min-h-[44px] flex items-center justify-center space-x-2"
                    >
                        <span>Explore Full Portfolio</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <AnimatePresence>
                    {inspectingProject && (
                        <motion.div
                            key="project-modal-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/80 backdrop-blur-sm"
                            onClick={() => setInspectingProject(null)}
                        >
                            <motion.div
                                key="project-modal"
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 40, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl border-t sm:border border-slate-100 max-h-[92dvh] flex flex-col"
                                onClick={e => e.stopPropagation()}
                                role="dialog"
                                aria-modal="true"
                                aria-label={inspectingProject.title}
                            >
                                {/* Mobile drag handle */}
                                <div className="sm:hidden flex justify-center pt-2.5 shrink-0">
                                    <div className="w-10 h-1 bg-slate-300 rounded-full" />
                                </div>

                                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <span className="text-[10px] font-mono text-skyline-blue font-bold tracking-widest uppercase bg-indigo-50 px-2 py-0.5 rounded">Tender Spec Dossier</span>
                                            <h3 className="font-heading text-base sm:text-lg font-black text-skyline-dark mt-1 leading-tight">{inspectingProject.title}</h3>
                                        </div>
                                        <button
                                            onClick={() => setInspectingProject(null)}
                                            className="p-2 bg-slate-50 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
                                            aria-label="Close project details"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                                        <p>{inspectingProject.description}</p>
                                        <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                                            <span className="font-mono font-bold text-slate-500 uppercase tracking-wider text-[10px] block">Technical Commissioning Checklist</span>
                                            <ul className="space-y-2">
                                                {inspectingProject.specs.map((spVal, specIdx) => (
                                                    <li key={specIdx} className="flex items-center space-x-2 text-slate-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-skyline-orange shrink-0" />
                                                        <span className="font-medium text-xs">{spVal}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-1">
                                        <Link
                                            href="/contact"
                                            onClick={() => setInspectingProject(null)}
                                            className="flex-1 py-3 bg-skyline-dark hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider text-center rounded-lg transition min-h-[44px] flex items-center justify-center"
                                        >
                                            Request Electrical Blueprint
                                        </Link>
                                        <button
                                            onClick={() => setInspectingProject(null)}
                                            className="px-4 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold transition cursor-pointer min-h-[44px]"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
