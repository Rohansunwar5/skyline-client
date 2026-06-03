'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { PhoneCall, Send } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/siteConfig';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

export default function ContactSection() {
    const shouldReduceMotion = useReducedMotion();
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="contact" ref={ref} className="relative text-white py-20 overflow-hidden">
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
                <motion.div
                    className="max-w-3xl space-y-6"
                    variants={shouldReduceMotion ? undefined : containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <motion.span
                        variants={shouldReduceMotion ? undefined : itemVariants}
                        className="font-mono text-xs font-black text-amber-300 uppercase tracking-widest block"
                    >
                        Start a Conversation
                    </motion.span>

                    <motion.h2
                        variants={shouldReduceMotion ? undefined : itemVariants}
                        className="font-heading text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight"
                    >
                        Let&apos;s power your next project:
                    </motion.h2>

                    <motion.p
                        variants={shouldReduceMotion ? undefined : itemVariants}
                        className="text-blue-50 text-sm md:text-base leading-relaxed font-normal max-w-2xl"
                    >
                        Have a project in mind? Our team is ready to assess your requirements and deliver a tailored electrical solution that meets your timeline and budget.
                    </motion.p>

                    <motion.div
                        variants={shouldReduceMotion ? undefined : itemVariants}
                        className="flex flex-wrap items-center gap-4 pt-4"
                    >
                        <a
                            href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
                            className="flex items-center space-x-2 px-6 py-3 bg-white hover:bg-slate-50 text-skyline-blue text-xs font-black uppercase tracking-wider rounded-lg shadow-xl transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            <PhoneCall className="w-4 h-4" />
                            <span>Call Us Now</span>
                        </a>

                        <a
                            href={`mailto:${SITE_CONFIG.contact.email}`}
                            className="flex items-center space-x-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black uppercase tracking-wider rounded-lg shadow-lg transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                        >
                            <Send className="w-4 h-4" />
                            <span>Send an Email</span>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
