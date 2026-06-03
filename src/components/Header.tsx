'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, Award, Menu, X, ChevronRight } from 'lucide-react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import { SITE_CONFIG } from '@/lib/siteConfig';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { openQuote } = useQuoteModal();

    const navLinks = SITE_CONFIG.navLinks;

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="sticky top-0 z-40 w-full bg-white shadow-md">
            <div className="hidden lg:block w-full bg-[#0a1424] text-slate-300 text-[11px] py-2 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between font-medium">
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center space-x-1.5 hover:text-white transition">
                            <MapPin className="w-3.5 h-3.5 text-skyline-orange" />
                            <span>Registered Office: Bangalore, India</span>
                        </span>
                        <span className="flex items-center space-x-1.5 text-slate-400">
                            <Award className="w-3.5 h-3.5 text-skyline-orange" />
                            <span>Electrical License: {SITE_CONFIG.legal.electricalLicense}</span>
                        </span>
                    </div>

                    <div className="flex items-center space-x-6">
                        <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`} className="flex items-center space-x-1.5 hover:text-white transition">
                            <Phone className="w-3.5 h-3.5 text-skyline-orange" />
                            <span>{SITE_CONFIG.contact.phone}</span>
                        </a>
                        <a href={`mailto:${SITE_CONFIG.contact.email}`} className="flex items-center space-x-1.5 hover:text-white transition">
                            <Mail className="w-3.5 h-3.5 text-skyline-orange" />
                            <span>{SITE_CONFIG.contact.email}</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    <Link
                        href="/"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-3 group outline-none"
                    >
                        <Image
                            src="/skyline-logo.png"
                            alt={SITE_CONFIG.company.name}
                            width={120}
                            height={90}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                        <div>
                            <div className="flex items-baseline space-x-1">
                                <span className="font-heading text-lg font-black text-slate-900 tracking-tight">Skyline</span>
                                <span className="font-heading text-lg font-black text-skyline-blue tracking-tight">Electronetworks</span>
                            </div>
                            <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
                                Power Infrastructure Solutions
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-7">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-semibold transition-all relative py-1.5 ${active
                                            ? 'text-skyline-blue font-bold'
                                            : 'text-slate-600 hover:text-skyline-blue'
                                        }`}
                                >
                                    {link.name}
                                    {active && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-skyline-blue rounded-full"></span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden md:block">
                        <button
                            id="header-cta-quote-btn"
                            onClick={() => openQuote()}
                            className="px-5 py-2.5 bg-skyline-blue hover:bg-skyline-blue-hover text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all duration-200 cursor-pointer active:scale-95"
                        >
                            Request a Quote
                        </button>
                    </div>

                    {/* Hamburger Mobile Menu Toggle Button */}
                    <button
                        id="mobile-menu-toggle-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-slate-700 hover:text-skyline-blue hover:bg-slate-50 rounded-lg transition"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* 3. Mobile Navigation Full Drawer */}
            {isMobileMenuOpen && (
                <div id="mobile-nav-drawer" className="md:hidden fixed inset-x-0 top-[71px] bottom-0 z-30 bg-slate-900/90 backdrop-blur-md animate-fade-in flex justify-end">
                    <div className="w-4/5 max-w-sm bg-white h-full px-6 py-8 flex flex-col justify-between shadow-2xl">
                        <div className="space-y-6">
                            <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-100 pb-2">
                                Site Navigation
                            </span>
                            <nav className="flex flex-col space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={closeMobileMenu}
                                        className="flex items-center justify-between text-base font-semibold text-slate-800 hover:text-skyline-blue py-2 border-b border-slate-50 transition"
                                    >
                                        <span>{link.name}</span>
                                        <ChevronRight className="w-4 h-4 text-slate-400" />
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="space-y-4">
                            <button
                                id="mobile-drawer-cta-quote-btn"
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    openQuote();
                                }}
                                className="w-full py-3 bg-skyline-blue hover:bg-skyline-blue-hover text-white text-sm font-bold uppercase tracking-wide rounded-xl shadow-lg transition active:scale-95 text-center"
                            >
                                Request a Quote
                            </button>
                            <div className="text-center text-[10px] text-slate-400 font-mono">
                                <p>{SITE_CONFIG.contact.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
