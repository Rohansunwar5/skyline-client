'use client';

import React from 'react';
import { PhoneCall, Download } from 'lucide-react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import { SITE_CONFIG } from '@/lib/siteConfig';

interface CTASectionProps {
    onDownload?: () => void;
    downloadSuccess?: boolean;
}

export default function CTASection({ onDownload, downloadSuccess }: CTASectionProps) {
    const { openQuote } = useQuoteModal();

    return (
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
                        Start a Partnership
                    </span>

                    <h2 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Let's Build the Future <br />of India's Power Grid
                    </h2>

                    <p className="text-blue-50 text-sm md:text-base leading-relaxed font-normal max-w-2xl">
                        Whether you're planning a large-scale infrastructure project or need a trusted electrical partner for your next development — we are ready to deliver. Let's talk.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <button
                            onClick={() => openQuote()}
                            className="px-6 py-3 bg-white hover:bg-slate-50 text-skyline-blue text-xs font-black uppercase tracking-wider rounded-lg shadow-xl cursor-pointer transition active:scale-95"
                        >
                            Request a Quote
                        </button>

                        <a
                            href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
                            className="px-6 py-3 border border-white/60 hover:border-white hover:bg-white/5 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition cursor-pointer flex items-center space-x-2"
                        >
                            <PhoneCall className="w-4.5 h-4.5" />
                            <span>Call Us Now</span>
                        </a>

                        <button
                            onClick={onDownload}
                            className="px-6 py-3 bg-[#f59e0b] hover:bg-amber-600 text-slate-950 text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-amber-500/10 transition cursor-pointer flex items-center space-x-2"
                        >
                            <Download className="w-4 h-4 text-slate-950" />
                            <span>{downloadSuccess ? 'Downloading Brochure...' : 'Download Brochure'}</span>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
