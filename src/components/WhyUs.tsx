'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Shield, Clock, Award, Users, TrendingUp, Map } from 'lucide-react';
import { ADVANTAGES_DATA } from '@/lib/data';

const advantageContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const advantageItem = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

function renderIcon(name: string) {
    const className = 'w-5 h-5 text-skyline-orange shrink-0';
    switch (name) {
        case 'Shield': return <Shield className={className} />;
        case 'Clock': return <Clock className={className} />;
        case 'Award': return <Award className={className} />;
        case 'Users': return <Users className={className} />;
        case 'TrendingUp': return <TrendingUp className={className} />;
        case 'Map': return <Map className={className} />;
        default: return <Shield className={className} />;
    }
}

export default function WhyUs() {
    const shouldReduceMotion = useReducedMotion();
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="why-us" ref={ref} className="py-20 md:py-28 bg-skyline-dark text-white scroll-mt-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

                    <motion.div
                        className="lg:col-span-7 space-y-8"
                        initial={shouldReduceMotion ? undefined : { opacity: 0, x: -28 }}
                        animate={isInView ? { opacity: 1, x: 0 } : (shouldReduceMotion ? undefined : { opacity: 0, x: -28 })}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                    >
                        <div className="space-y-3">
                            <span className="font-mono text-xs font-black uppercase tracking-widest text-skyline-orange block">
                                Why Skyline
                            </span>
                            <h2 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                Built on Reliability.<br />Driven by Precision.
                            </h2>
                            <p className="font-body text-sm md:text-base text-slate-400 font-normal leading-relaxed">
                                Choosing the right electrical contractor is critical. We combine decades of domain expertise with modern engineering practices, rigorous quality controls, and a deep commitment to zero-accident project delivery.
                            </p>
                        </div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-slate-950/20 p-3 sm:p-5 rounded-2xl border border-slate-800"
                            variants={shouldReduceMotion ? undefined : advantageContainer}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                        >
                            {ADVANTAGES_DATA.map((adv) => (
                                <motion.div
                                    key={adv.id}
                                    id={`why-item-${adv.id}`}
                                    variants={shouldReduceMotion ? undefined : advantageItem}
                                    className="flex items-start space-x-3.5 p-3 hover:bg-white/5 rounded-xl transition-colors duration-200"
                                >
                                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
                                        {renderIcon(adv.iconName)}
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-medium text-slate-100 text-sm">{adv.title}</h4>
                                        <p className="text-slate-400 text-xs leading-normal font-normal mt-1">{adv.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="lg:col-span-5 relative flex flex-col items-center h-full"
                        initial={shouldReduceMotion ? undefined : { opacity: 0, x: 28 }}
                        animate={isInView ? { opacity: 1, x: 0 } : (shouldReduceMotion ? undefined : { opacity: 0, x: 28 })}
                        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.12 }}
                    >
                        <div className="relative w-full h-full min-h-[320px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                            <Image
                                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80"
                                alt="Electrical Infrastructure Quality"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 40vw"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
