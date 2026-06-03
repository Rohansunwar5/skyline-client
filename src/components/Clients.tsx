'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { CLIENTS_DATA } from '@/lib/data';

export default function Clients() {
    const shouldReduceMotion = useReducedMotion();
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    const doubled = [...CLIENTS_DATA, ...CLIENTS_DATA];

    return (
        <section id="clients" ref={ref} className="py-10 md:py-12 bg-slate-50 scroll-mt-10 overflow-hidden">
            <motion.p
                className="text-center text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-slate-400 mb-8 px-6"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : (shouldReduceMotion ? undefined : { opacity: 0, y: 12 })}
                transition={{ duration: 0.45, ease: 'easeOut' }}
            >
                Trusted by India&apos;s Leading Organizations
            </motion.p>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                <div className="flex animate-marquee">
                    {doubled.map((client, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center justify-center px-10 py-3 shrink-0 border-r border-slate-200 last:border-r-0"
                        >
                            <span className="font-heading font-black text-base md:text-lg text-slate-800 tracking-wide uppercase whitespace-nowrap">
                                {client.name}
                            </span>
                            <span className="font-body text-[11px] text-slate-400 mt-0.5 tracking-wide whitespace-nowrap">
                                {client.role}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
