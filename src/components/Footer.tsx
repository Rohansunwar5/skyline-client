'use client';

import {
    MapPin,
    Phone,
    Mail,
    Linkedin,
    Twitter,
    Facebook,
    Youtube,
    ShieldAlert,
    FileText,
    Fingerprint
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/siteConfig';

export default function Footer() {
    return (
        <footer className="bg-[#050c15] text-slate-400 text-xs py-16 border-t border-slate-900/80">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                {/* Col 1: Branding block */}
                <div className="space-y-5">
                    <div className="flex items-center space-x-3">
                        <Image
                            src="/skyline-logo.png"
                            alt={SITE_CONFIG.company.name}
                            width={120}
                            height={90}
                            className="h-10 w-auto object-contain"
                        />
                        <div>
                            <span className="font-body font-extrabold text-base text-white tracking-tight block leading-tight">
                                Skyline Electronetworks
                            </span>
                            <span className="font-body text-[9px] font-bold text-slate-500 tracking-[0.14em] uppercase block mt-1">
                                Engineering Electrical Excellence
                            </span>
                        </div>
                    </div>
                    <p className="text-[12px] leading-relaxed text-slate-400 font-normal">
                        {SITE_CONFIG.company.description}
                    </p>
                    <div className="flex items-center space-x-3 pt-2">
                        <a
                            href={SITE_CONFIG.socialLinks.linkedin}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded border border-slate-800/80 flex items-center justify-center text-slate-500 hover:text-blue-500 hover:border-blue-500/50 transition duration-200"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                            href={SITE_CONFIG.socialLinks.twitter}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded border border-slate-800/80 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-400/50 transition duration-200"
                        >
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a
                            href={SITE_CONFIG.socialLinks.facebook}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded border border-slate-800/80 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-600/50 transition duration-200"
                        >
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a
                            href={SITE_CONFIG.socialLinks.youtube}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded border border-slate-800/80 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-500/50 transition duration-200"
                        >
                            <Youtube className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Col 2: Quick Links */}
                <div className="space-y-4 md:pl-4">
                    <h4 className="font-body font-bold text-white text-xs uppercase tracking-wider">
                        Quick Links
                    </h4>
                    <ul className="space-y-3.5 text-[12px]">
                        {SITE_CONFIG.navLinks.filter(l => l.name !== 'Home').map((link, i) => (
                            <li key={i}>
                                <Link
                                    href={link.href}
                                    className="text-slate-400 hover:text-white transition flex items-center group"
                                >
                                    <span className="text-blue-500 mr-2.5 font-bold transition duration-200 group-hover:translate-x-0.5">&gt;</span>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 3: Services */}
                <div className="space-y-4">
                    <h4 className="font-body font-bold text-white text-xs uppercase tracking-wider">
                        Services
                    </h4>
                    <ul className="space-y-3.5 text-[12px]">
                        {[
                            { label: 'HT Works', href: '/services' },
                            { label: 'LT Works', href: '/services' },
                            { label: 'Electrical Infrastructure', href: '/services' },
                            { label: 'Lighting Systems', href: '/services' },
                            { label: 'Testing & Commissioning', href: '/services' },
                            { label: 'SCADA & Automation', href: '/services' },
                        ].map((link, i) => (
                            <li key={i}>
                                <Link
                                    href={link.href}
                                    className="text-slate-400 hover:text-white transition flex items-center group"
                                >
                                    <span className="text-blue-500 mr-2.5 font-bold transition duration-200 group-hover:translate-x-0.5">&gt;</span>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 4: Contact Us */}
                <div className="space-y-5">
                    <h4 className="font-body font-bold text-white text-xs uppercase tracking-wider">
                        Contact Us
                    </h4>
                    <div className="space-y-4 text-[12px]">
                        {/* Registered Office */}
                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5 p-1 rounded-full text-blue-500">
                                <MapPin className="w-4 h-4 shrink-0" />
                            </div>
                            <div className="space-y-0.5">
                                <h5 className="font-bold text-white text-xs">Registered Office</h5>
                                <p className="text-slate-400 leading-relaxed">
                                    {SITE_CONFIG.address.full}
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5 p-1 rounded-full text-blue-500">
                                <Phone className="w-4 h-4 shrink-0" />
                            </div>
                            <div className="space-y-0.5">
                                <h5 className="font-bold text-white text-xs">Phone</h5>
                                <p className="text-slate-400 leading-none">
                                    <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition">{SITE_CONFIG.contact.phone}</a>
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5 p-1 rounded-full text-blue-500">
                                <Mail className="w-4 h-4 shrink-0" />
                            </div>
                            <div className="space-y-0.5">
                                <h5 className="font-bold text-white text-xs">Email</h5>
                                <p className="text-slate-400 leading-none">
                                    <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-white transition font-mono">{SITE_CONFIG.contact.email}</a>
                                </p>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="flex items-start space-x-3">
                            <div className="mt-0.5 p-1 rounded-full text-blue-500">
                                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                            </div>
                            <div className="space-y-0.5">
                                <h5 className="font-bold text-white text-xs">Working Hours</h5>
                                <p className="text-slate-400 leading-none">{SITE_CONFIG.hours.weekdays}</p>
                            </div>
                        </div>
                    </div>

                    {/* Legal / Compliance Info */}
                    <div className="border-t border-slate-800/60 pt-4 space-y-2">
                        <h5 className="font-bold text-white text-[11px] uppercase tracking-wider flex items-center space-x-1.5">
                            <ShieldAlert className="w-3 h-3 text-amber-500" />
                            <span>Regulatory Compliance</span>
                        </h5>
                        <div className="space-y-1.5 text-[10px] text-slate-400">
                            <p className="flex items-center space-x-1.5">
                                <Fingerprint className="w-3 h-3 text-blue-500 shrink-0" />
                                <span>GSTIN: {SITE_CONFIG.legal.gstin}</span>
                            </p>
                            <p className="flex items-center space-x-1.5">
                                <FileText className="w-3 h-3 text-blue-500 shrink-0" />
                                <span>Shop & Est.: {SITE_CONFIG.legal.shopEstablishment}</span>
                            </p>
                            <p className="flex items-center space-x-1.5">
                                <FileText className="w-3 h-3 text-blue-500 shrink-0" />
                                <span>Electrical License: {SITE_CONFIG.legal.electricalLicense}</span>
                            </p>
                            <p className="flex items-center space-x-1.5">
                                <FileText className="w-3 h-3 text-blue-500 shrink-0" />
                                <span>MSME: {SITE_CONFIG.legal.msme}</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6 mt-12 border-t border-slate-900/60 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500">
                <div>
                    <p>© {new Date().getFullYear()} {SITE_CONFIG.company.name}. All rights reserved.</p>
                </div>
                <div className="flex items-center space-x-5 mt-4 md:mt-0">
                    <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-white transition cursor-pointer">Terms of Use</span>
                    <span className="hover:text-white transition cursor-pointer">Sitemap</span>
                </div>
            </div>
        </footer>
    );
}
