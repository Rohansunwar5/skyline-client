'use client';

import React, { useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQuoteModal } from '@/context/QuoteModalContext';
import {
    Phone,
    Mail,
    MapPin,
    MessageSquare,
    Clock,
    Send,
    HelpCircle,
    ChevronDown,
    Check,
    ArrowRight,
    Globe,
    Award,
    ShieldAlert,
    ExternalLink,
    Laptop,
    Linkedin,
    Twitter,
    Facebook,
    Youtube,
    Fingerprint,
    FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_CONFIG } from '@/lib/siteConfig';

interface MapLocation {
    id: string;
    name: string;
    phone: string;
    address: string;
    coords: { lat: string; lng: string };
    googleMapsUrl: string;
    visualHighlight: string;
}

const OFFICE_LOCATIONS: MapLocation[] = [
    {
        id: 'bangalore-office',
        name: 'Bangalore Office',
        phone: SITE_CONFIG.contact.phone,
        address: SITE_CONFIG.address.full,
        coords: { lat: "13.0293° N", lng: "77.5200° E" },
        googleMapsUrl: 'https://maps.google.com/?q=Peenya+Industrial+Area+Bangalore',
        visualHighlight: 'Peenya Industrial Area, 2nd Phase, KIDB Main Road — major electrical & manufacturing hub.'
    },
    {
        id: 'delhi-office',
        name: 'Delhi Office',
        phone: '+91 11 2345 6789',
        address: 'Unit 502, Connaught House, Connaught Place, New Delhi — 110001',
        coords: { lat: "28.6304° N", lng: "77.2177° E" },
        googleMapsUrl: 'https://maps.google.com/?q=Connaught+Place+New+Delhi',
        visualHighlight: 'Inner Circle, block block, close to Metro junction and central government administrative blocks.'
    },
    {
        id: 'pune-office',
        name: 'Pune Office',
        phone: '+91 20 4567 8901',
        address: '3rd Floor, Tech Park One, Yerwada, Pune, Maharashtra — 411006',
        coords: { lat: "18.5529° N", lng: "73.8797° E" },
        googleMapsUrl: 'https://maps.google.com/?q=Yerwada+Pune+Tech+Park',
        visualHighlight: 'Kalyani Nagar corridor, next to elite software hubs and heavy electrical logistics hubs.'
    },
    {
        id: 'hyderabad-office',
        name: 'Hyderabad',
        phone: '+91 40 5678 9012',
        address: 'Level 12, Cyber Towers, Hitec City, Madhapur, Hyderabad, Telangana — 500081',
        coords: { lat: "17.4504° N", lng: "78.3811° E" },
        googleMapsUrl: 'https://maps.google.com/?q=Cyber+Towers+Hitec+City+Hyderabad',
        visualHighlight: 'Core IT District, near heavy substation testing hubs and government utility boards.'
    }
];

export default function ContactPage() {
    const router = useRouter();
    const { openQuote } = useQuoteModal();

    const [activeTab, setActiveTab] = useState<'general' | 'project' | 'quote'>('general');
    const [activeMapTab, setActiveMapTab] = useState<string>('mumbai-hq');
    const [activeFaq, setActiveFaq] = useState<number | null>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [ticketNumber, setTicketNumber] = useState<string>('');

    const formRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'General Enquiry',
        message: ''
    });

    const handleTabChange = (tab: 'general' | 'project' | 'quote') => {
        setActiveTab(tab);
        let defaultSubject = 'General Enquiry';
        if (tab === 'project') defaultSubject = 'Project & Tendering RFP';
        if (tab === 'quote') defaultSubject = 'Request a Quote / AMC BOQ';

        setFormData(prev => ({
            ...prev,
            subject: defaultSubject
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTicketNumber(`TK-${Math.floor(10000 + Math.random() * 90000)}`);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subject: activeTab === 'general' ? 'General Enquiry' : activeTab === 'project' ? 'Project & Tendering RFP' : 'Request a Quote / AMC BOQ',
                message: ''
            });
        }, 1500);
    };

    const selectedMapDetail = useMemo(() => {
        return OFFICE_LOCATIONS.find(loc => loc.id === activeMapTab) || OFFICE_LOCATIONS[0];
    }, [activeMapTab]);

    const faqs = [
        {
            q: 'How quickly can Skyline mobilize a team for a new project?',
            a: 'With active engineering operations in 18 states, we can typically deploy supervisory staffs, field testing equipment, and technical crew to any major urban center in India within 4 to 7 business days of formal contract sign-off.'
        },
        {
            q: 'What is the minimum project value you accept for bidding?',
            a: 'We primarily focus on electrical contracting, substations, and transmission works starting from ₹2 Crores (20 Million INR). This allows us to dedicate high-caliber safety supervisors, premium materials, and certified technicians to every active installation site.'
        },
        {
            q: 'Do you provide AMC services for electrical systems you didn\'t install?',
            a: 'Yes! Our custom Operations & Auditing desk provides full thermographic reviews, safety compliance checks, and relay coordinate mapping before adopting AMC responsibilities for systems assembled by third-party contracting firms.'
        },
        {
            q: 'How do I submit a tender document or BOQ for custom pricing?',
            a: `You can upload files directly through our "Request a Quote" tab, email our commercial division at ${SITE_CONFIG.contact.email}, or launch the interactive "Send Inquiry" button to consult directly with our bid desk.`
        },
        {
            q: 'Is Skyline Electronetworks registered with official government bodies?',
            a: 'Yes, we hold a Class-I CPWD Electrical Contracting License, and are registered with state electricity board approvals across key Indian industrial zones. Our processes meet premium ISO 9001 and OHSAS 18001 guidelines.'
        },
        {
            q: 'What is the best way to track milestones on my ongoing project?',
            a: 'Every corporate client is synchronized with a dedicated Project Management Coordinator. We issue double-checked weekly milestone Gantt logs, material requisition sheets, and electrical inspector clearances continuously.'
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* 1. HERO HEADER BANNER */}
            <div className="relative text-white pt-10 pb-20 md:py-24 overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/contact-hero.jpg"
                        alt="Contact Skyline Electronetworks"
                        className="w-full h-full object-cover object-center scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/70 z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    <div className="flex items-center space-x-2 text-[11px] font-mono font-bold tracking-widest text-[#a0aec0] uppercase mb-6 sm:mb-10">
                        <button onClick={() => router.push('/')} className="hover:text-amber-500 transition cursor-pointer">HOME</button>
                        <span>/</span>
                        <span className="text-amber-500">CONTACT US</span>
                    </div>

                    <div className="max-w-3xl space-y-6">
                        <div className="flex items-center space-x-3">
                            <span className="w-10 h-0.5 bg-amber-500"></span>
                            <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-amber-500">
                                GET IN TOUCH
                            </span>
                        </div>

                        <h1 className="font-heading text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
                            Let's Power Your <br />
                            <span className="text-amber-500">Next Project</span>
                        </h1>

                        <p className="font-body text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
                            Whether you have a project brief, a technical query, or simply want to explore a partnership — our team is ready to respond. Reach us by phone, email, WhatsApp, or fill the enquiry form below.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-3">
                            <a
                                href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
                                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg flex items-center space-x-2 transition cursor-pointer active:scale-95 text-center min-h-[44px]"
                            >
                                <Phone className="w-4 h-4 text-slate-950" />
                                <span>Call Now ({SITE_CONFIG.contact.phone})</span>
                            </a>

                            <button
                                onClick={() => {
                                    if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="px-6 py-3 border border-slate-600 hover:border-white hover:bg-white/5 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center space-x-2 transition cursor-pointer active:scale-95 text-center min-h-[44px]"
                            >
                                <MessageSquare className="w-4 h-4 text-amber-500" />
                                <span>Send Enquiry</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-8 border-t border-slate-800/80">
                        <div className="bg-slate-900/50 backdrop-blur border border-slate-800/60 p-4.5 rounded-xl space-y-1.5 hover:bg-slate-900/80 transition shadow-inner">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black block">PHONE</span>
                            <p className="text-sm font-bold text-amber-500">{SITE_CONFIG.contact.phone}</p>
                        </div>
                        <div className="bg-slate-900/50 backdrop-blur border border-slate-800/60 p-4.5 rounded-xl space-y-1.5 hover:bg-slate-900/80 transition shadow-inner">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black block">EMAIL INBOX</span>
                            <p className="text-sm font-bold text-white leading-normal truncate">{SITE_CONFIG.contact.email}</p>
                        </div>
                        <div className="bg-slate-900/50 backdrop-blur border border-slate-800/60 p-4.5 rounded-xl space-y-1.5 hover:bg-slate-900/80 transition shadow-inner">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black block">WEBSITE</span>
                            <p className="text-sm font-bold text-amber-500">{SITE_CONFIG.contact.website}</p>
                        </div>
                        <div className="bg-slate-900/50 backdrop-blur border border-slate-800/60 p-4.5 rounded-xl space-y-1.5 hover:bg-slate-900/80 transition shadow-inner">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black block">REGISTERED OFFICE</span>
                            <p className="text-sm font-bold text-slate-200">Peenya, Bangalore — 560058</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* 2. SPLIT LAYOUT: DETAILED DIRECT CARDS & INTERACTIVE FORM CARD */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <span className="w-6 h-0.5 bg-blue-600"></span>
                                <span className="font-mono text-xs font-black text-blue-700 uppercase tracking-wider">GET IN TOUCH</span>
                            </div>
                            <h2 className="font-heading text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                                Our Contact Details
                            </h2>
                            <p className="font-body text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                                We have offices across India and a dedicated team ready to assist with project enquiries, technical questions, partnership opportunities, and general support.
                            </p>
                        </div>

                        <div className="space-y-4">

                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2 group hover:border-slate-300 transition duration-150">
                                <div className="flex items-center space-x-3.5">
                                    <span className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                                        <Phone className="w-5 h-5" />
                                    </span>
                                    <div className="space-y-0.5">
                                        <span className="text-[9.5px] font-mono uppercase text-slate-400 tracking-wider font-bold block">TELEPHONE</span>
                                        <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`} className="text-slate-900 hover:text-blue-700 text-sm font-black tracking-tight block">
                                            {SITE_CONFIG.contact.phone}
                                        </a>
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-500 pl-13 leading-tight font-light">{SITE_CONFIG.hours.weekdays}</p>
                                <div className="pl-13 pt-1">
                                    <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`} className="text-blue-600 hover:text-blue-800 text-[10.5px] font-bold uppercase tracking-wider flex items-center space-x-1">
                                        <span>Call Now</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2 group hover:border-slate-300 transition duration-150">
                                <div className="flex items-center space-x-3.5">
                                    <span className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                                        <MessageSquare className="w-5 h-5" />
                                    </span>
                                    <div className="space-y-0.5">
                                        <span className="text-[9.5px] font-mono uppercase text-slate-400 tracking-wider font-bold block">WHATSAPP BUSINESS</span>
                                        <a href={`https://wa.me/${SITE_CONFIG.contact.phone.replace(/\s/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-emerald-700 text-sm font-black tracking-tight block">
                                            {SITE_CONFIG.contact.phone}
                                        </a>
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-500 pl-13 leading-tight font-light">Quick responses for project queries &amp; custom quotes</p>
                                <div className="pl-13 pt-1">
                                    <a href={`https://wa.me/${SITE_CONFIG.contact.phone.replace(/\s/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 text-[10.5px] font-bold uppercase tracking-wider flex items-center space-x-1">
                                        <span>Chat on WhatsApp</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2 group hover:border-slate-300 transition duration-150">
                                <div className="flex items-center space-x-3.5">
                                    <span className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                                        <Mail className="w-5 h-5" />
                                    </span>
                                    <div className="space-y-0.5">
                                        <span className="text-[9.5px] font-mono uppercase text-slate-400 tracking-wider font-bold block">GENERAL ENQUIRIES</span>
                                        <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-slate-900 hover:text-indigo-700 text-sm font-black tracking-tight block truncate select-all">
                                            {SITE_CONFIG.contact.email}
                                        </a>
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-500 pl-13 leading-tight font-light">Typical response within 24 hours on premium business days</p>
                                <div className="pl-13 pt-1">
                                    <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-indigo-600 hover:text-indigo-800 text-[10.5px] font-bold uppercase tracking-wider flex items-center space-x-1">
                                        <span>Send Email</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2 group hover:border-slate-300 transition duration-150">
                                <div className="flex items-center space-x-3.5">
                                    <span className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                                        <Award className="w-5 h-5" />
                                    </span>
                                    <div className="space-y-0.5">
                                        <span className="text-[9.5px] font-mono uppercase text-slate-400 tracking-wider font-bold block">PROJECT &amp; TECHNICAL ENQUIRIES</span>
                                        <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-slate-900 hover:text-purple-700 text-sm font-black tracking-tight block truncate select-all">
                                            {SITE_CONFIG.contact.email}
                                        </a>
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-500 pl-13 leading-tight font-light">For public tenders, bill of quantities (BOQ), and joint venture partnerships</p>
                                <div className="pl-13 pt-1">
                                    <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-purple-600 hover:text-purple-800 text-[10.5px] font-bold uppercase tracking-wider flex items-center space-x-1">
                                        <span>Send Email</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2 group hover:border-slate-300 transition duration-150">
                                <div className="flex items-center space-x-3.5">
                                    <span className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                                        <MapPin className="w-5 h-5" />
                                    </span>
                                    <div className="space-y-0.5">
                                        <span className="text-[9.5px] font-mono uppercase text-slate-400 tracking-wider font-bold block">REGISTERED OFFICE</span>
                                        <span className="text-slate-900 text-xs font-black tracking-tight block">
                                            Peenya Industrial Area
                                        </span>
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-500 pl-13 leading-relaxed font-light">
                                    {SITE_CONFIG.address.full}
                                </p>
                                <div className="pl-13 pt-1">
                                    <button
                                        onClick={() => {
                                            setActiveMapTab('bangalore-office');
                                            const mapBlock = document.getElementById('maps-element-anchor');
                                            if (mapBlock) mapBlock.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="text-amber-600 hover:text-amber-700 text-[10.5px] font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                                    >
                                        <span>View on Map</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-red-50/50 border border-red-150 rounded-xl p-5 shadow-sm space-y-2 group hover:bg-red-50 hover:border-red-200 transition duration-150">
                                <div className="flex items-center space-x-3.5">
                                    <span className="w-10 h-10 rounded-lg bg-red-100 text-red-650 flex items-center justify-center shrink-0 border border-red-200">
                                        <ShieldAlert className="w-5 h-5" />
                                    </span>
                                    <div className="space-y-0.5">
                                        <span className="text-[9.50px] font-mono uppercase text-red-500 tracking-wider font-bold block">EMERGENCY CONTACT</span>
                                        <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`} className="text-red-750 hover:text-red-800 text-sm font-black tracking-tight block">
                                            {SITE_CONFIG.contact.phone}
                                        </a>
                                    </div>
                                </div>
                                <p className="text-[11px] text-red-600/90 pl-13 leading-relaxed font-light">
                                    For urgent electrical enquiries and emergency service requests
                                </p>
                                <div className="pl-13 pt-1">
                                    <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`} className="text-red-750 hover:text-red-900 text-[10.5px] font-bold uppercase tracking-wider flex items-center space-x-1 font-mono">
                                        <span>Call Emergency</span>
                                        <ArrowRight className="w-3 h-3 animate-pulse" />
                                    </a>
                                </div>
                            </div>

                        </div>

                        <div className="space-y-3 pt-4">
                            <span className="font-mono text-[9.5px] font-black text-slate-400 tracking-widest uppercase block">
                                REGIONAL BRANCH NETWORKS
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="bg-white border border-slate-150 p-3.5 rounded-lg text-xs leading-normal space-y-1">
                                    <p className="font-bold text-slate-900">New Delhi Branch</p>
                                    <p className="font-mono text-[10.5px] text-slate-500">+91 11 2345 6789</p>
                                </div>
                                <div className="bg-white border border-slate-150 p-3.5 rounded-lg text-xs leading-normal space-y-1">
                                    <p className="font-bold text-slate-900">Pune Branch</p>
                                    <p className="font-mono text-[10.5px] text-slate-500">+91 20 4567 8901</p>
                                </div>
                                <div className="bg-white border border-slate-150 p-3.5 rounded-lg text-xs leading-normal space-y-1">
                                    <p className="font-bold text-slate-900">Hyderabad Branch</p>
                                    <p className="font-mono text-[10.5px] text-slate-500">+91 40 5678 9012</p>
                                </div>
                                <div className="bg-white border border-slate-150 p-3.5 rounded-lg text-xs leading-normal space-y-1">
                                    <p className="font-bold text-slate-900">Chennai Branch</p>
                                    <p className="font-mono text-[10.5px] text-slate-500">+91 44 6789 0123</p>
                                </div>
                                <div className="bg-white border border-slate-150 p-3.5 rounded-lg text-xs leading-normal space-y-1">
                                    <p className="font-bold text-slate-900">Ahmedabad Branch</p>
                                    <p className="font-mono text-[10.5px] text-slate-500">+91 79 7890 1234</p>
                                </div>
                                <div className="bg-white border border-slate-150 p-3.5 rounded-lg text-xs leading-normal space-y-1">
                                    <p className="font-bold text-slate-900">Bengaluru Branch</p>
                                    <p className="font-mono text-[10.5px] text-slate-500">+91 80 8901 2345</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0b1424] text-white p-5 rounded-2xl border border-slate-850 shadow-lg space-y-4">
                            <div className="flex items-center space-x-2 text-[10.5px] font-mono font-bold text-amber-500 uppercase tracking-wider">
                                <Clock className="w-3.5 h-3.5 text-amber-500" />
                                <span>BUSINESS WORKING HOURS</span>
                            </div>

                            <div className="space-y-2.5 text-xs">

                                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                                    <span className="text-slate-350">Monday — Saturday</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-slate-200">9:30 AM — 6:30 PM</span>
                                        <span className="bg-emerald-500/10 text-emerald-400 font-mono text-[8.5px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider border border-emerald-500/20">
                                            OPEN
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                                    <span className="text-slate-350">Sunday</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-slate-450 italic">Closed</span>
                                        <span className="bg-slate-800 text-slate-500 font-mono text-[8.5px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider border border-slate-700/50">
                                            CLOSED
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-slate-350">Public Holidays</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-slate-400">Closed</span>
                                        <span className="bg-slate-800 text-slate-500 font-mono text-[8.5px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider border border-slate-700/50">
                                            CLOSED
                                        </span>
                                    </div>
                                </div>

                            </div>

                            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 flex items-start space-x-2.5">
                                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-[10px] text-slate-400 leading-normal">
                                    {SITE_CONFIG.hours.weekdays}
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#0b1424] text-white p-5 rounded-2xl border border-slate-850 shadow-lg space-y-4">
                            <div className="flex items-center space-x-2 text-[10.5px] font-mono font-bold text-amber-500 uppercase tracking-wider">
                                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                                <span>REGULATORY COMPLIANCE</span>
                            </div>
                            <div className="space-y-2.5 text-xs">
                                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                                    <span className="text-slate-350 flex items-center gap-1.5">
                                        <Fingerprint className="w-3 h-3 text-blue-500" /> GSTIN
                                    </span>
                                    <span className="text-slate-200 font-mono">{SITE_CONFIG.legal.gstin}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                                    <span className="text-slate-350 flex items-center gap-1.5">
                                        <FileText className="w-3 h-3 text-blue-500" /> Shop & Est.
                                    </span>
                                    <span className="text-slate-200 font-mono text-[10px]">{SITE_CONFIG.legal.shopEstablishment}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                                    <span className="text-slate-350 flex items-center gap-1.5">
                                        <FileText className="w-3 h-3 text-blue-500" /> Electrical License
                                    </span>
                                    <span className="text-slate-200 font-mono">{SITE_CONFIG.legal.electricalLicense}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-350 flex items-center gap-1.5">
                                        <FileText className="w-3 h-3 text-blue-500" /> MSME
                                    </span>
                                    <span className="text-slate-200 font-mono text-[10px]">{SITE_CONFIG.legal.msme}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2.5 pt-2">
                            <span className="font-mono text-[9px] font-black text-slate-400 tracking-widest uppercase block">
                                FOLLOW US ON EXECUTIVE NETWORKS
                            </span>
                            <div className="flex flex-wrap gap-2.5">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold transition">
                                    <Linkedin className="w-3.5 h-3.5" />
                                    <span>LinkedIn</span>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold transition">
                                    <Twitter className="w-3.5 h-3.5" />
                                    <span>Twitter / X</span>
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-indigo-700 border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold transition">
                                    <Facebook className="w-3.5 h-3.5" />
                                    <span>Facebook</span>
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-red-700 border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold transition">
                                    <Youtube className="w-3.5 h-3.5" />
                                    <span>YouTube</span>
                                </a>
                            </div>
                        </div>

                    </div>

                    <div ref={formRef} className="lg:col-span-7 space-y-8 scroll-mt-24">

                        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xl relative sm:min-h-[480px]">

                            {isSuccess ? (
                                <div className="text-center py-20 space-y-6">
                                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-[scale-in_0.3s_ease-out]">
                                        <Check className="w-8 h-8 stroke-[3]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-heading font-black text-slate-950 text-2xl md:text-3xl tracking-tight">Your Message is Sent!</h3>
                                        <p className="text-slate-500 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                                            Thank you for contacting Skyline Electronetworks. Your inquiry ticket number is <span className="font-mono font-black text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">{ticketNumber}</span>.
                                            Our Estimations Group and Project Desk are already reviewing your message, and we'll get back to you within 24 hours.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsSuccess(false);
                                            setTicketNumber('');
                                        }}
                                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-950 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
                                    >
                                        Submit Another Inquiry
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-5.5">

                                    <div>
                                        <h3 className="font-heading font-black text-slate-900 text-lg md:text-xl tracking-tight">
                                            Send Us a Message
                                        </h3>
                                        <p className="text-slate-550 text-xs mt-0.5 leading-relaxed font-light">
                                            Fill in your details and we'll get back to you within 24 hours. For urgent enquiries, please call us directly.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                                        <button
                                            type="button"
                                            onClick={() => handleTabChange('general')}
                                            className={`py-3 text-[10.5px] font-bold rounded-lg transition duration-150 cursor-pointer ${activeTab === 'general'
                                                    ? 'bg-white text-slate-950 shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-950'
                                                }`}
                                        >
                                            General Enquiry
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleTabChange('project')}
                                            className={`py-2 text-[10.5px] font-bold rounded-lg transition duration-150 cursor-pointer ${activeTab === 'project'
                                                    ? 'bg-white text-slate-950 shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-950'
                                                }`}
                                        >
                                            Project Enquiry
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleTabChange('quote')}
                                            className={`py-2 text-[10.5px] font-bold rounded-lg transition duration-150 cursor-pointer ${activeTab === 'quote'
                                                    ? 'bg-white text-slate-950 shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-950'
                                                }`}
                                        >
                                            Request a Quote
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-slate-700 text-xs font-semibold">First Name <span className="text-rose-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Ravi"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-slate-700 text-xs font-semibold">Last Name <span className="text-rose-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Mishra"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-slate-700 text-xs font-semibold">Email Address <span className="text-rose-500">*</span></label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="ravi@company.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-slate-700 text-xs font-semibold">Phone Number <span className="text-rose-500">*</span></label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="+91 98765 43210"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-slate-700 text-xs font-semibold">Subject <span className="text-rose-500">*</span></label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white text-slate-800 font-medium"
                                        >
                                            <option value="General Enquiry">Select a Subject or General Enquiry</option>
                                            <option value="Project & Tendering RFP">Project &amp; Tendering RFP</option>
                                            <option value="Request a Quote / AMC BOQ">Request a Quote / AMC BOQ</option>
                                            <option value="Substation &amp; Transmission Auditing">Substation &amp; Transmission Auditing</option>
                                            <option value="Material Contracting &amp; Supply">Material Contracting &amp; Supply</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-slate-700 text-xs font-semibold">Your Message <span className="text-rose-500">*</span></label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="Tell us how we can help you..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800 resize-none font-normal leading-relaxed"
                                        ></textarea>
                                    </div>

                                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <span className="text-[10.5px] font-mono text-slate-400 font-bold flex items-center space-x-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            <span>Your information is secure &amp; never shared</span>
                                        </span>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white hover:text-amber-300 font-bold uppercase text-[11px] tracking-widest rounded-lg transition-all flex items-center justify-center space-x-2 shadow-md active:scale-95 disabled:opacity-75 cursor-pointer shrink-0"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-3.5 h-3.5" />
                                                    <span>Send Message</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                </form>
                            )}

                        </div>

                        <div id="maps-element-anchor" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-lg space-y-4">

                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                <span className="font-mono text-[9.5px] font-black text-slate-400 tracking-wider">
                                    OUR LOCATIONS MAP COORDINATES
                                </span>

                                <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                                    {OFFICE_LOCATIONS.map((loc) => (
                                        <button
                                            key={loc.id}
                                            onClick={() => setActiveMapTab(loc.id)}
                                            className={`px-3 py-2 text-[9px] font-bold rounded-md transition duration-100 cursor-pointer min-h-[36px] ${activeMapTab === loc.id
                                                    ? 'bg-slate-900 text-white'
                                                    : 'text-slate-500 hover:text-slate-900'
                                                }`}
                                        >
                                            {loc.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="h-[260px] bg-skyline-dark rounded-xl overflow-hidden relative flex items-center justify-center border border-slate-800">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(43,76,128,0.25),transparent_70%)]" />

                                <div className="absolute inset-0 opacity-15" style={{
                                    backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px), radial-gradient(#1e3a8a 1px, transparent 1px)`,
                                    backgroundSize: '24px 24px',
                                    backgroundPosition: '0 0, 12px 12px'
                                }} />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-[120px] h-[120px] rounded-full border border-blue-500/10 animate-ping" />
                                    <div className="w-[200px] h-[200px] rounded-full border border-blue-500/5 animate-[pulse_3s_infinite]" />
                                </div>

                                <div className="absolute left-[15%] top-[25%] pointer-events-none">
                                    <div className="h-[2px] w-48 bg-slate-800/80 transform rotate-12" />
                                    <div className="h-[1px] w-64 bg-slate-800/40 transform -rotate-45" />
                                    <div className="h-[2px] w-40 bg-slate-800/80 transform rotate-90" />
                                </div>
                                <div className="absolute right-[10%] bottom-[20%] pointer-events-none">
                                    <div className="h-[1px] w-72 bg-slate-800/50 transform rotate-45" />
                                    <div className="h-[2.5px] w-48 bg-slate-805 transform -rotate-12" />
                                </div>

                                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur border border-slate-800/60 rounded px-2.5 py-1 font-mono text-[9px] text-[#a0aec0]">
                                    SYS_GPS: <span className="text-amber-500 font-bold">{selectedMapDetail.coords.lat}, {selectedMapDetail.coords.lng}</span>
                                </div>

                                <div className="relative text-center space-y-2 z-20">
                                    <div className="w-11 h-11 bg-amber-500/15 border border-amber-500 text-amber-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10 animate-bounce">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="bg-slate-950/90 border border-slate-850 px-4 py-2.5 rounded-lg max-w-xs shadow-2xl backdrop-blur-sm">
                                        <h4 className="font-heading font-black text-white text-xs leading-none mb-1">
                                            {selectedMapDetail.name} Node
                                        </h4>
                                        <p className="text-[10px] text-[#a0aec0] font-mono leading-none">
                                            {selectedMapDetail.coords.lat}, {selectedMapDetail.coords.lng}
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute bottom-4 right-4">
                                    <a
                                        href={selectedMapDetail.googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-[9px] font-bold uppercase tracking-widest px-3.5 py-2.5 rounded-md flex items-center space-x-1.5 transition-all shadow-md active:scale-95"
                                    >
                                        <span>Open in Google Maps</span>
                                        <ExternalLink className="w-3 h-3 text-white" />
                                    </a>
                                </div>

                            </div>

                            <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex items-start space-x-3 text-xs leading-relaxed">
                                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                <div className="space-y-1 text-slate-650">
                                    <p className="font-bold text-slate-950 font-heading text-xs">{selectedMapDetail.name} HQ Address Details:</p>
                                    <p className="font-normal font-body text-slate-500 leading-normal">{selectedMapDetail.address}</p>
                                    <p className="text-[10.5px] text-slate-450 italic mt-1 leading-normal font-light">
                                        Highlight: {selectedMapDetail.visualHighlight}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* 3. FREQUENTLY ASKED QUESTIONS SECTION */}
            <section className="bg-white py-16 md:py-24 border-t border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                            <div className="space-y-3">
                                <span className="font-mono text-xs font-black text-amber-500 tracking-[0.2em] uppercase block">
                                    COMMON QUESTIONS
                                </span>
                                <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                                    Frequently <br />
                                    <span className="relative inline-block border-b-4 border-amber-500 pb-1.5 leading-none">Asked</span>
                                </h2>
                                <p className="font-body text-xs md:text-sm text-slate-550 leading-relaxed font-normal pt-2.5">
                                    Quick answers to the questions we hear most often from corporate clients, partners, and public electricity boards before they reach out.
                                </p>
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={() => {
                                        if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-6 py-3 border border-slate-300 hover:border-slate-800 text-slate-800 hover:bg-slate-50 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center space-x-2 transition cursor-pointer active:scale-95 text-center min-h-[44px]"
                                >
                                    <MessageSquare className="w-4 h-4 text-amber-500" />
                                    <span>Ask a Different Question</span>
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-8 space-y-3.5">
                            {faqs.map((faq, idx) => {
                                const isOpen = activeFaq === idx;
                                return (
                                    <div
                                        key={idx}
                                        className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm group transition-all duration-200"
                                    >
                                        <button
                                            onClick={() => setActiveFaq(isOpen ? null : idx)}
                                            className="w-full px-6 py-5 text-left flex items-center justify-between font-heading font-black text-xs md:text-sm text-slate-900 hover:bg-slate-100"
                                        >
                                            <span className="flex items-center space-x-3">
                                                <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                                                <span className="leading-tight">{faq.q}</span>
                                            </span>
                                            <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="px-6 pb-5 pt-1 text-slate-500 text-xs md:text-sm leading-relaxed font-normal font-body border-t border-slate-200/50">
                                                        {faq.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA — Start the Conversation */}
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
                            READY TO TALK?
                        </span>

                        <h2 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                            Start the Conversation Today
                        </h2>

                        <p className="text-blue-50 text-sm md:text-base leading-relaxed font-normal max-w-2xl">
                            Our team of 120+ engineers and project managers is ready to assess your requirements and deliver a solution that exceeds expectations.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <a
                                href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
                                className="px-6 py-3 bg-white hover:bg-slate-50 text-skyline-blue text-xs font-black uppercase tracking-wider rounded-lg shadow-xl transition active:scale-95 cursor-pointer flex items-center space-x-2 min-h-[44px]"
                            >
                                <Phone className="w-4 h-4" />
                                <span>+91 22 1234 5678</span>
                            </a>

                            <button
                                onClick={() => openQuote()}
                                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-amber-500/10 transition cursor-pointer flex items-center space-x-2 min-h-[44px]"
                            >
                                <Send className="w-4 h-4" />
                                <span>Send Enquiry</span>
                            </button>

                            <button
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = '/assets/Skyline-Brochure.pdf';
                                    link.download = 'Skyline-Brochure.pdf';
                                    link.click();
                                }}
                                className="px-6 py-3 border border-white/60 hover:border-white hover:bg-white/5 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition cursor-pointer flex items-center space-x-2 min-h-[44px]"
                            >
                                <FileText className="w-4 h-4" />
                                <span>Download Brochure</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
