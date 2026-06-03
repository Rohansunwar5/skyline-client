'use client';

import React, { useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuoteModal } from '@/context/QuoteModalContext';
import {
    Briefcase,
    MapPin,
    Clock,
    Search,
    Upload,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    ChevronRight,
    Share2,
    Users2,
    GraduationCap,
    ShieldAlert,
    Laptop,
    PhoneCall,
    Mail,
    FileText,
    DollarSign,
    Award,
    Building,
    Heart,
    TrendingUp,
    UserCheck,
    Check,
    Building2,
    HardHat,
    Compass
} from 'lucide-react';
import { motion } from 'motion/react';

interface JobItem {
    id: string;
    title: string;
    department: string;
    level: string;
    experience: string;
    type: 'Full-Time' | 'Internship | GET';
    isUrgent?: boolean;
    tags: string[];
    responsibilities: string[];
    requirements: string[];
    location: string;
    postedDate: string;
}

const ALL_JOBS: JobItem[] = [
    {
        id: 'sr-elec-ht',
        title: 'Senior Electrical Engineer — HT Works',
        department: 'HT/LT Division',
        level: 'Senior Level',
        experience: '7-12 Years',
        type: 'Full-Time',
        isUrgent: true,
        tags: ['33kV–132kV', 'Substation', 'Cable Jointing', 'CEA Licensed'],
        responsibilities: [
            'Lead HT electrical installation works on large-scale infrastructure projects. Responsible for technical supervision, quality compliance, and coordination with project management teams on live construction sites.'
        ],
        requirements: [
            'B.E. / M.Tech Electrical Engineering (mandatory)',
            '7+ years in HT substation and cable works',
            'State Electrical Inspector / CEA licensing preferred',
            'Experience with 33kV, 66kV, or 132kV systems'
        ],
        location: 'Mumbai / Pan-India',
        postedDate: '3 days ago'
    },
    {
        id: 'pm-elec-contract',
        title: 'Project Manager — Electrical Contracting',
        department: 'Operations Division',
        level: 'Mid-Senior',
        experience: '8-15 Years',
        type: 'Full-Time',
        isUrgent: true,
        tags: ['PMP', 'EPC Projects', 'Client Interface', 'P&L'],
        responsibilities: [
            'Own complete delivery of assigned electrical contracting projects from mobilisation to handover. Manage schedule, budget, team, and client expectations across multiple active sites simultaneously.'
        ],
        requirements: [
            'B.E. Electrical + PMP / Prince2 certification',
            '8–15 years in electrical project management',
            'Proven track record on ₹10 Cr+ electrical projects',
            'Strong client communication and reporting skills'
        ],
        location: 'Mumbai, Delhi, Pune',
        postedDate: '1 week ago'
    },
    {
        id: 'hse-mgr',
        title: 'HSE Manager — Site Safety',
        department: 'Health, Safety & Environment',
        level: 'Senior',
        experience: '8-12 Years',
        type: 'Full-Time',
        tags: ['NEBOSH IGC', 'OHSAS 18001', 'LOTO', 'Incident Investigation'],
        responsibilities: [
            'Lead and implement the company HSE management system across all active project sites. Conduct audits, safety inductions, incident investigations, and ensure full regulatory compliance.'
        ],
        requirements: [
            'NEBOSH IGC or equivalent mandatory',
            '8+ years in HSE – electrical / construction sector',
            'OHSAS 18001 internal auditor certification',
            'Willingness to travel to project sites nationally'
        ],
        location: 'Mumbai (Pan-India Travel)',
        postedDate: '6 days ago'
    },
    {
        id: 'test-comm-eng',
        title: 'Testing & Commissioning Engineer',
        department: 'T&C Division',
        level: 'Mid-Level',
        experience: '4-8 Years',
        type: 'Full-Time',
        tags: ['Protection Relays', 'Megger Testing', 'ETAP', 'HV Tests'],
        responsibilities: [
            'Conduct pre-commissioning, commissioning, and post-commissioning testing of HT/LT electrical systems. Prepare test reports, protection coordination studies, and as-built documentation.'
        ],
        requirements: [
            'B.E. Electrical with 4–8 years T&C experience',
            'Proficiency with relay testing (OMICRON / Doble)',
            'Experience in substation and switchgear commissioning',
            'Knowledge of power quality analysis tools'
        ],
        location: 'Mumbai / Pune / Delhi',
        postedDate: '2 weeks ago'
    },
    {
        id: 'elec-design-eng',
        title: 'Electrical Design Engineer',
        department: 'Design & Engineering',
        level: 'Mid-Level',
        experience: '3-6 Years',
        type: 'Full-Time',
        tags: ['AutoCAD', 'ETAP', 'SLD Design', 'Load Flow'],
        responsibilities: [
            'Prepare electrical design drawings, single-line diagrams, load flow and short-circuit studies, cable schedules, and equipment sizing for HT/LT systems on infrastructure and building projects.'
        ],
        requirements: [
            'B.E. / M.Tech Electrical Engineering',
            '3–6 years in electrical design for EPC / consultancy',
            'Proficiency in AutoCAD and ETAP / DIgSILENT',
            'Knowledge of CEA, BIS, and IEC standards'
        ],
        location: 'Mumbai HQ',
        postedDate: '3 weeks ago'
    },
    {
        id: 'site-eng-lt',
        title: 'Site Engineer — LT Works',
        department: 'Site Execution',
        level: 'Junior-Mid',
        experience: '2-5 Years',
        type: 'Full-Time',
        tags: ['LT Panels', 'Cable Trays', 'Bus Duct', 'Site Supervision'],
        responsibilities: [
            'Supervise LT electrical installation works on site — panel erection, cable laying, DB wiring, and earthing. Maintain daily site diary, coordinate material deliveries, and ensure HSE compliance.'
        ],
        requirements: [
            'B.E. Electrical / Diploma with 2–5 years experience',
            'Experience in commercial or industrial LT works',
            'Government electrical contractor license preferred',
            'Willingness to be based on-site (outstation)'
        ],
        location: 'Various Project Sites',
        postedDate: '1 week ago'
    },
    {
        id: 'lighting-sys-eng',
        title: 'Lighting Systems Engineer',
        department: 'Lighting Division',
        level: 'Mid-Level',
        experience: '3-7 Years',
        type: 'Full-Time',
        tags: ['DALI', 'LED Systems', 'Dialux', 'Smart Controls'],
        responsibilities: [
            'Design, supply, and commission intelligent LED lighting systems for highways, stadiums, industrial facilities, and commercial buildings. Prepare photometric designs and DALI control system programming.'
        ],
        requirements: [
            'B.E. Electrical with 3–7 years lighting experience',
            'Proficiency in DIALux / Relux photometric software',
            'Knowledge of DALI, DMX, and IoT lighting protocols',
            'Experience with highway or industrial LED projects'
        ],
        location: 'Mumbai / Hyderabad',
        postedDate: '4 days ago'
    },
    {
        id: 'est-qs-eng',
        title: 'Estimation & Quantity Surveyor',
        department: 'Commercial Division',
        level: 'Mid-Level',
        experience: '4-8 Years',
        type: 'Full-Time',
        tags: ['BOQ Preparation', 'Tendering', 'Rate Analysis', 'Variation Orders'],
        responsibilities: [
            'Prepare detailed BOQs and cost estimates for HT/LT electrical and infrastructure tenders. Analyse rates, manage variation orders, and support the commercial team on contract claims and negotiations.'
        ],
        requirements: [
            'B.E. Electrical or Diploma with 4–8 years estimation experience',
            'Strong knowledge of electrical BOQ and rate analysis',
            'Experience with government / PSU tender formats',
            'Proficiency in MS Excel and project cost tools'
        ],
        location: 'Mumbai HQ',
        postedDate: '2 weeks ago'
    },
    {
        id: 'get-elec',
        title: 'Graduate Engineer Trainee (GET)',
        department: 'All Divisions',
        level: 'Entry Level',
        experience: '0-1 Year',
        type: 'Internship | GET',
        tags: ['Fresh Graduate', 'Structured Rotation'],
        responsibilities: [
            'Our structured 12-month GET programme offers fresh electrical engineering graduates hands-on exposure across HT/LT works, design, testing, and site management — with mentoring from senior engineers.'
        ],
        requirements: [
            'B.E. Electrical Engineering (2023–2025 graduates)',
            'Minimum 65% aggregate throughout academics',
            'Strong analytical and problem-solving skills',
            'Willingness to be based on construction sites'
        ],
        location: 'Multiple Locations',
        postedDate: '1 month ago'
    }
];

interface WhyChooseItem {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

const WHY_SKYLINE: WhyChooseItem[] = [
    {
        icon: <Users2 className="w-5 h-5 text-amber-500" />,
        title: 'Competitive Compensation',
        desc: 'Market-leading salary packages, performance bonuses, and project-based incentives reviewed annually to reward high performers.'
    },
    {
        icon: <GraduationCap className="w-5 h-5 text-amber-500" />,
        title: 'Continuous Learning',
        desc: 'Sponsored professional certifications (PMP, NEBOSH, LEED, CEIG), in-house technical training academies, and vendor learning days.'
    },
    {
        icon: <Compass className="w-5 h-5 text-amber-500" />,
        title: 'Pan-India Exposure',
        desc: 'Work on landmark infrastructure projects across 18 states, gaining direct experience on metro systems, smart ports, and airports.'
    },
    {
        icon: <Award className="w-5 h-5 text-amber-500" />,
        title: 'Safety-First Culture',
        desc: 'Our zero lost-time incident record for 8 years proves we invest heavily in safety. Every site is managed with world-class protective gears.'
    },
    {
        icon: <HardHat className="w-5 h-5 text-amber-500" />,
        title: 'Supportive Team',
        desc: 'A collaborative workforce of 120+ professionals who operate with transparency, active mentoring schemes, and open-door leadership.'
    },
    {
        icon: <TrendingUp className="w-5 h-5 text-amber-500" />,
        title: 'Clear Career Growth',
        desc: 'Superbly transparent promotion structures, annual unbiased grading, and real opportunities to step into site leadership roles early.'
    }
];

const CULTURE_GALLERY = [
    {
        title: 'Site Commissioning Team',
        tag: 'T&C DIVISION',
        img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80'
    },
    {
        title: 'Active Project Site',
        tag: 'METRO POWER LINE',
        img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80'
    },
    {
        title: 'Project Kick-Off Meeting',
        tag: 'MUMBAI HEAD OFFICE',
        img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80'
    },
    {
        title: 'HT Works Division',
        tag: '132KV SUBSTATION',
        img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
    },
    {
        title: 'Mumbai Head Office',
        tag: 'CORE DESIGN TEAM',
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80'
    }
];

export default function CareersPage() {
    const router = useRouter();
    const { openQuote } = useQuoteModal();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedDept, setSelectedDept] = useState<string>('All');
    const [showAppliedSuccess, setShowAppliedSuccess] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const formRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        position: '',
        department: '',
        experience: '',
        ctc: '',
        location: '',
        noticePeriod: '',
        qualifications: '',
        coverNote: '',
        linkedin: '',
        consent: false
    });

    const [fileName, setFileName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const departmentsList = ['All', 'HT/LT Division', 'Operations Division', 'Health, Safety & Environment', 'T&C Division', 'Design & Engineering', 'Site Execution', 'Lighting Division', 'Commercial Division'];

    const handleApplyClick = (jobTitle: string, jobDept: string) => {
        setFormData(prev => ({
            ...prev,
            position: jobTitle,
            department: jobDept
        }));

        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const filteredJobs = useMemo(() => {
        return ALL_JOBS.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesDept = selectedDept === 'All' || job.department === selectedDept;
            return matchesSearch && matchesDept;
        });
    }, [searchTerm, selectedDept]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFileName(e.dataTransfer.files[0].name);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.consent) {
            alert('Please agree to data storage consent policy before submitting.');
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setShowAppliedSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                position: '',
                department: '',
                experience: '',
                ctc: '',
                location: '',
                noticePeriod: '',
                qualifications: '',
                coverNote: '',
                linkedin: '',
                consent: false
            });
            setFileName('');
        }, 2000);
    };

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* 1. HERO HEADER PANEL */}
            <div className="relative text-white pt-10 pb-20 md:py-24 overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/carrers-hero.jpg"
                        alt="Careers at Skyline"
                        className="w-full h-full object-cover object-center scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/70 z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    <div className="flex items-center space-x-2 text-[11px] font-mono font-bold tracking-widest text-[#a0aec0] uppercase mb-6 sm:mb-10">
                        <button onClick={() => router.push('/')} className="hover:text-amber-500 transition cursor-pointer">HOME</button>
                        <span>/</span>
                        <span className="text-amber-500">CAREERS</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                        <div className="lg:col-span-8 space-y-6">
                            <div className="flex items-center space-x-3">
                                <span className="w-10 h-0.5 bg-amber-500"></span>
                                <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-amber-500">
                                    JOIN THE SKYLINE TEAM
                                </span>
                            </div>

                            <h1 className="font-heading text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
                                Build Your Career <br />
                                on <span className="text-amber-500">Solid Ground</span>
                            </h1>

                            <p className="font-body text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
                                We're looking for engineers, project managers, HSE professionals, and technical specialists who are passionate about building the electrical infrastructure that powers modern India. If you bring skill and ambition, we bring the opportunity.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-3">
                                <button
                                    onClick={() => {
                                        const block = document.getElementById('open-positions-block');
                                        if (block) block.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg flex items-center space-x-2 transition cursor-pointer active:scale-95 text-center min-h-[44px]"
                                >
                                    <Briefcase className="w-4 h-4 text-slate-950" />
                                    <span>View Open Positions</span>
                                </button>

                                <button
                                    onClick={() => {
                                        if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-6 py-3 border border-slate-600 hover:border-white hover:bg-white/5 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center space-x-2 transition cursor-pointer active:scale-95 text-center min-h-[44px]"
                                >
                                    <Upload className="w-4 h-4 text-amber-500" />
                                    <span>Submit Your CV</span>
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2.5 pt-4">
                                <span className="flex items-center space-x-1.5 bg-slate-900/60 text-slate-300 border border-slate-800 rounded-full px-3.5 py-1.5 text-[10.5px] font-medium font-mono">
                                    <Users2 className="w-3.5 h-3.5 text-amber-500" />
                                    <span>120+ Team Members</span>
                                </span>
                                <span className="flex items-center space-x-1.5 bg-slate-900/60 text-slate-300 border border-slate-800 rounded-full px-3.5 py-1.5 text-[10.5px] font-medium font-mono">
                                    <Building2 className="w-3.5 h-3.5 text-amber-500" />
                                    <span>18 States - Pan-India</span>
                                </span>
                                <span className="flex items-center space-x-1.5 bg-slate-900/60 text-slate-300 border border-slate-800 rounded-full px-3.5 py-1.5 text-[10.5px] font-medium font-mono">
                                    <Award className="w-3.5 h-3.5 text-amber-500" />
                                    <span>ISO 9001 • OHSAS Certified</span>
                                </span>
                                <span className="flex items-center space-x-1.5 bg-slate-900/60 text-slate-300 border border-slate-800 rounded-full px-3.5 py-1.5 text-[10.5px] font-medium font-mono">
                                    <Heart className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Zero Incident Culture</span>
                                </span>
                            </div>
                        </div>

                        <div className="lg:col-span-4 bg-[#0a1424]/90 border border-slate-800 backdrop-blur-md rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.1),transparent_70%)]" />

                            <h3 className="font-mono text-[10px] font-black tracking-[0.2em] text-[#cbd5e1] border-b border-slate-800 pb-3 uppercase">
                                CURRENT OPENINGS
                            </h3>

                            <div className="my-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                                            <Briefcase className="w-4 h-4" />
                                        </span>
                                        <span className="text-slate-200 text-xs font-semibold">Engineering Roles</span>
                                    </div>
                                    <span className="text-amber-500 text-sm font-black font-heading">6</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                                            <Building className="w-4 h-4" />
                                        </span>
                                        <span className="text-slate-200 text-xs font-semibold">Project Mgmt. Roles</span>
                                    </div>
                                    <span className="text-amber-500 text-sm font-black font-heading">3</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-450 flex items-center justify-center">
                                            <HardHat className="w-4 h-4" />
                                        </span>
                                        <span className="text-slate-200 text-xs font-semibold">HSE Roles</span>
                                    </div>
                                    <span className="text-amber-500 text-sm font-black font-heading">2</span>
                                </div>

                                <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-2">
                                    <div className="flex items-center space-x-3">
                                        <span className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center">
                                            <FileText className="w-4 h-4" />
                                        </span>
                                        <span className="text-amber-500 text-xs font-black uppercase tracking-wider">Total Open Positions</span>
                                    </div>
                                    <span className="text-amber-500 text-base font-black font-heading">12</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    const block = document.getElementById('open-positions-block');
                                    if (block) block.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-full py-2.5 bg-slate-900 border border-slate-850 hover:bg-slate-950 text-slate-300 hover:text-white text-[10px] font-bold tracking-widest uppercase rounded-lg transition-all text-center cursor-pointer flex items-center justify-center space-x-2 min-h-[44px]"
                            >
                                <span>Browse All Opportunities</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            {/* 2. TAB FILTERS & JOBS GRID SECTION */}
            <section id="open-positions-block" className="py-16 md:py-24 max-w-7xl mx-auto px-6">

                <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 md:mb-16">
                    <span className="font-mono text-[9.5px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                        OPPORTUNITIES
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                        Current Open Roles
                    </h2>
                    <p className="font-body text-sm text-slate-500 max-w-xl mx-auto">
                        Find your matching specialization in electrical contracting, testing yards, HSE administration, electrical panel designs, or estimations.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-5 border border-slate-200 bg-white p-4 rounded-xl shadow-sm mb-10">

                    <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                        {departmentsList.map((dept) => (
                            <button
                                key={dept}
                                onClick={() => setSelectedDept(dept)}
                                className={`px-4 py-2 text-xs font-bold rounded-lg border transition duration-150 cursor-pointer min-h-[36px] ${selectedDept === dept
                                        ? 'bg-slate-900 text-white border-slate-950 shadow-sm'
                                        : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                                    }`}
                            >
                                {dept} {dept === 'All' ? `(${ALL_JOBS.length})` : `(${ALL_JOBS.filter(j => j.department === dept).length})`}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search positions or tag..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-xs font-medium bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-800 min-h-[44px]"
                        />
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-2 text-[10px] text-slate-450 hover:text-slate-850 font-bold"
                            >
                                CLEAR
                            </button>
                        )}
                    </div>

                </div>

                {filteredJobs.length === 0 ? (
                    <div className="text-center bg-white border border-slate-200 rounded-xl p-16 space-y-4 shadow-sm">
                        <span className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                            <Briefcase className="w-6 h-6" />
                        </span>
                        <h3 className="font-body text-sm font-bold text-slate-800">No matching positions found</h3>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                            We couldn't find any openings matching your search criteria. Try removing filters or send us a general application below.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedDept('All');
                            }}
                            className="px-5 py-2.5 bg-slate-900 text-white font-mono text-[9px] font-bold uppercase rounded-lg hover:bg-slate-950 transition"
                        >
                            Reset Search Filter
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white rounded-xl border border-slate-200 shadow-md flex flex-col hover:shadow-lg transition duration-200 group relative overflow-hidden h-full"
                            >

                                <div className="h-1.5 w-full shrink-0" style={{
                                        background: job.department === 'HT/LT Division' ? '#2563eb' :
                                            job.department === 'Operations Division' ? '#059669' :
                                                job.department === 'Health, Safety & Environment' ? '#e11d48' :
                                                    job.department === 'T&C Division' ? '#7c3aed' :
                                                        job.department === 'Design & Engineering' ? '#8b5cf6' :
                                                            job.department === 'Site Execution' ? '#d97706' :
                                                                job.department === 'Lighting Division' ? '#0284c7' :
                                                                    job.department === 'Commercial Division' ? '#f59e0b' :
                                                                        '#6b7280'
                                    }} />

                                <div className="p-6 flex flex-col flex-1 gap-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded border" style={{
                                                background: job.department === 'HT/LT Division' ? '#eff6ff' :
                                                    job.department === 'Operations Division' ? '#ecfdf5' :
                                                        job.department === 'Health, Safety & Environment' ? '#fff1f2' :
                                                            job.department === 'T&C Division' ? '#f5f3ff' :
                                                                job.department === 'Design & Engineering' ? '#f5f3ff' :
                                                                    job.department === 'Site Execution' ? '#fffbeb' :
                                                                        job.department === 'Lighting Division' ? '#f0f9ff' :
                                                                            job.department === 'Commercial Division' ? '#fffbeb' :
                                                                                '#f1f5f9',
                                                color: job.department === 'HT/LT Division' ? '#2563eb' :
                                                    job.department === 'Operations Division' ? '#059669' :
                                                        job.department === 'Health, Safety & Environment' ? '#e11d48' :
                                                            job.department === 'T&C Division' ? '#7c3aed' :
                                                                job.department === 'Design & Engineering' ? '#8b5cf6' :
                                                                    job.department === 'Site Execution' ? '#d97706' :
                                                                        job.department === 'Lighting Division' ? '#0284c7' :
                                                                            job.department === 'Commercial Division' ? '#d97706' :
                                                                                '#64748b',
                                                borderColor: job.department === 'HT/LT Division' ? '#bfdbfe' :
                                                    job.department === 'Operations Division' ? '#a7f3d0' :
                                                        job.department === 'Health, Safety & Environment' ? '#fecdd3' :
                                                            job.department === 'T&C Division' ? '#ddd6fe' :
                                                                job.department === 'Design & Engineering' ? '#ddd6fe' :
                                                                    job.department === 'Site Execution' ? '#fde68a' :
                                                                        job.department === 'Lighting Division' ? '#bae6fd' :
                                                                            job.department === 'Commercial Division' ? '#fde68a' :
                                                                                '#e2e8f0'
                                            }}>
                                            {job.department}
                                        </span>

                                        <div className="flex items-center space-x-1.5">
                                            {job.isUrgent && (
                                                <span className="bg-rose-500 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest animate-pulse shrink-0">
                                                    URGENT
                                                </span>
                                            )}
                                            <span className="text-[10px] font-mono text-slate-400 font-bold flex items-center space-x-1">
                                                <Clock className="w-3 h-3 text-emerald-500" />
                                                <span>{job.type}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <h3 className="font-heading font-black text-slate-900 group-hover:text-blue-700 transition duration-150 text-base md:text-lg tracking-tight leading-snug">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500 font-medium font-mono">
                                            <span className="flex items-center space-x-1">
                                                <MapPin className="w-3 h-3 text-slate-400" />
                                                <span>{job.location}</span>
                                            </span>
                                            <span>•</span>
                                            <span>Exp: {job.experience}</span>
                                            <span>•</span>
                                            <span className="text-slate-400">{job.level}</span>
                                        </div>
                                    </div>

                                    <div className="py-2.5 border-t border-b border-dashed border-slate-200">
                                        <p className="text-[11.5px] text-slate-600 line-clamp-3 leading-relaxed font-normal">
                                            {job.responsibilities[0]} {job.responsibilities[1] || ''}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
                                        {job.tags.map((tag, idx) => (
                                            <span key={idx} className="bg-slate-50 text-slate-600 border border-slate-200 text-[9.5px] font-semibold font-mono tracking-wide px-2 py-0.5 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                </div>

                                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between shrink-0">
                                    <span className="text-[9.5px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                                        Posted {job.postedDate}
                                    </span>

                                    <button
                                        onClick={() => handleApplyClick(job.title, job.department)}
                                        className="px-4.5 py-2.5 bg-slate-900 hover:bg-slate-950 text-white hover:text-amber-400 text-[10.5px] font-bold tracking-widest uppercase rounded-lg transition-all active:scale-95 cursor-pointer text-center min-h-[40px]"
                                    >
                                        Apply Now
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </section>

            {/* 3. "WHY SKYLINE" CORPORATE VALUE BLOCKS */}
            <section className="bg-[#0b1424] text-white py-16 md:py-24 border-t border-b border-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(30,58,138,0.2),transparent_70%)]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        <div className="lg:col-span-5 space-y-6">
                            <span className="font-mono text-xs font-black text-amber-500 tracking-[0.2em] uppercase block">
                                WHY SKYLINE
                            </span>
                            <h2 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                A Place Where <br />
                                Engineers Thrive
                            </h2>
                            <p className="font-body text-sm text-slate-350 leading-relaxed font-light">
                                At Skyline Electronetworks, you won't just execute tasks — you'll design and build some of India's most complex electrical infrastructure. We give our people real responsibility, early in their careers.
                            </p>

                            <div className="relative border-l-4 border-amber-500 bg-slate-900/60 p-5 rounded-r-xl">
                                <p className="font-body text-[12px] md:text-xs text-slate-300 italic leading-relaxed font-medium">
                                    "The best part about working at Skyline is that no two projects are the same. You're constantly learning — whether it's metro rail traction, airport lighting, or a 132kV substation. <span className="text-amber-400 font-bold not-italic">The depth of exposure is unmatched</span> anywhere in the industry."
                                </p>
                                <p className="font-mono text-[9px] text-slate-500 font-bold uppercase mt-3 tracking-widest">— CORPORATE SENIOR ENGINEER REFLECTS</p>
                            </div>

                            <button
                                onClick={() => {
                                    if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold uppercase text-[10px] tracking-widest rounded-lg shadow-lg hover:shadow-xl transition flex items-center space-x-2 cursor-pointer active:translate-y-0.5"
                            >
                                <span>Apply Today</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5.5">
                            {WHY_SKYLINE.map((wp, idx) => (
                                <div
                                    key={idx}
                                    className="bg-slate-900/40 border border-slate-800/80 p-5.5 rounded-xl flex flex-col justify-between space-y-3.5 hover:bg-slate-900/80 transition"
                                >
                                    <div className="space-y-2.5">
                                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                                            {wp.icon}
                                        </div>
                                        <h3 className="font-heading font-black text-slate-100 text-sm tracking-tight">{wp.title}</h3>
                                        <p className="text-slate-450 text-[11px] leading-relaxed font-light">{wp.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="mt-16 md:mt-24 pt-8 border-t border-slate-800/80">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                            <div className="space-y-1">
                                <p className="text-2xl md:text-3xl font-heading font-black text-white">120+</p>
                                <p className="text-[9px] font-mono text-slate-400 tracking-wider uppercase">Team Members</p>
                            </div>
                            <div className="space-y-1 md:border-l md:border-slate-800/60 md:pl-6">
                                <p className="text-2xl md:text-3xl font-heading font-black text-white">25+</p>
                                <p className="text-[9px] font-mono text-slate-400 tracking-wider uppercase">Years in Business</p>
                            </div>
                            <div className="space-y-1 md:border-l md:border-slate-800/60 md:pl-6">
                                <p className="text-2xl md:text-3xl font-heading font-black text-white">88%</p>
                                <p className="text-[9px] font-mono text-slate-400 tracking-wider uppercase">Retention Rate</p>
                            </div>
                            <div className="space-y-1 md:border-l md:border-slate-800/60 md:pl-6 border-r-0 md:border-r md:border-slate-800/60 pr-0 md:pr-4">
                                <p className="text-2xl md:text-3xl font-heading font-black text-white">12</p>
                                <p className="text-[9px] font-mono text-slate-400 tracking-wider uppercase">Open Positions</p>
                            </div>
                            <div className="space-y-1 md:border-l md:border-slate-800/60 md:pl-6 col-span-2 md:col-span-1">
                                <p className="text-2xl md:text-3xl font-heading font-black text-amber-500">4.8★</p>
                                <p className="text-[9px] font-mono text-slate-400 tracking-wider uppercase">Glassdoor Rating</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 4. CULTURE & LIFE GRID PANEL */}
            <section className="py-16 md:py-24 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 md:mb-14">
                        <span className="font-mono text-xs font-black text-blue-600 uppercase tracking-[0.2em] block">
                            CULTURE &amp; LIFE
                        </span>
                        <h2 className="font-heading text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                            Life at Skyline Electronetworks
                        </h2>
                        <p className="font-body text-xs md:text-sm text-slate-500 max-w-lg mx-auto">
                            From site commissioning days to company milestone celebrations — here's a glimpse of life inside Skyline.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {CULTURE_GALLERY.map((gal, idx) => (
                            <div
                                key={idx}
                                className="group relative rounded-xl overflow-hidden shadow-sm aspect-[4/5] bg-slate-900 border border-slate-200/80 hover:shadow-md transition duration-250 select-none"
                            >
                                <img
                                    src={gal.img}
                                    alt={gal.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />

                                <div className="absolute bottom-3.5 left-3.5 right-3.5">
                                    <span className="text-[7.5px] font-mono font-black tracking-widest text-amber-400 block mb-0.5">
                                        {gal.tag}
                                    </span>
                                    <h4 className="font-heading font-black text-white text-[11px] leading-tight">
                                        {gal.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 5. SPLIT COLUMN APPLY NOW + FORM */}
            <section ref={formRef} className="py-16 md:py-24 max-w-7xl mx-auto px-6 scroll-mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
                        <div className="space-y-3">
                            <span className="font-mono text-xs font-black text-emerald-600 tracking-widest uppercase block">
                                APPLY NOW
                            </span>
                            <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                Submit Your <br />
                                <span className="text-[#10b981]">Application</span>
                            </h2>
                            <p className="font-body text-xs md:text-sm text-slate-500 leading-relaxed font-normal pt-2.5">
                                Whether you're applying for a specific open role or submitting your profile for future opportunities — we review every application carefully. Suitable candidates are contacted within 5–7 working days.
                            </p>
                        </div>

                        <div className="space-y-5">

                            <div className="flex items-start space-x-3.5">
                                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-heading font-black text-xs shrink-0 border border-blue-100">
                                    01
                                </span>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-900 text-xs">Submit Application</h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-light">Fill the form and upload your CV. All submissions are reviewed by our HR team within 5 working days.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3.5">
                                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-heading font-black text-xs shrink-0 border border-blue-100">
                                    02
                                </span>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-900 text-xs">Initial Screening</h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-light">Our technical leads assess your CV against role requirements and contact short-listed candidates.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3.5">
                                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-heading font-black text-xs shrink-0 border border-blue-100">
                                    03
                                </span>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-900 text-xs">Technical Interview</h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-light">A structured technical and HR interview — either in person at our Mumbai office or over video call.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3.5">
                                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-heading font-black text-xs shrink-0 border border-blue-100">
                                    04
                                </span>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-900 text-xs">Offer &amp; Onboarding</h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-light">Successful candidates receive a formal offer within 3 working days of the final interview.</p>
                                </div>
                            </div>

                        </div>

                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-250 flex items-start space-x-3.5 hover:bg-slate-100/50 transition">
                            <Mail className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <h4 className="font-bold text-slate-900 text-xs">Prefer direct email?</h4>
                                <p className="text-[11px] text-slate-500">
                                    Send your CV directly to <a href="mailto:careers@skylineelectronetworks.com" className="text-blue-700 hover:underline font-bold">careers@skylineelectronetworks.com</a>. State the role title in the subject line.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xl relative min-h-[500px]">

                            {showAppliedSuccess ? (
                                <div className="text-center py-20 space-y-6">
                                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-[scale-in_0.3s_ease-out]">
                                        <Check className="w-8 h-8 stroke-[3]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-heading font-black text-slate-950 text-2xl md:text-3xl tracking-tight">Application Submitted Successfully!</h3>
                                        <p className="text-slate-500 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                                            Thank you for your interest in joining Skyline Electronetworks. Our HR department and hiring leads have received your materials. We'll be in touch within 5–7 business days if your profile matches the specifications.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowAppliedSuccess(false)}
                                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-950 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition"
                                    >
                                        Submit Another Application
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-5.5">

                                    <div className="border-b border-slate-150 pb-3 mb-2">
                                        <h3 className="font-heading font-black text-slate-900 text-lg md:text-xl tracking-tight">
                                            Careers Application Form
                                        </h3>
                                        <p className="text-[10px] font-mono text-slate-400 mt-0.5 uppercase font-bold">
                                            ALL FIELDS MARKED <span className="text-rose-500">*</span> ARE MANDATORY
                                        </p>
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
                                                placeholder="Sharma"
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
                                                placeholder="ravi.sharma@email.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-slate-700 text-xs font-semibold">Mobile Number <span className="text-rose-500">*</span></label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="+91 98765-43210"
                                                value={formData.mobile}
                                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-slate-700 text-xs font-semibold">Position Applying For <span className="text-rose-500">*</span></label>
                                            <select
                                                required
                                                value={formData.position}
                                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800 appearance-none"
                                            >
                                                <option value="">— Select a Position —</option>
                                                {ALL_JOBS.map(job => (
                                                    <option key={job.id} value={job.title}>{job.title}</option>
                                                ))}
                                                <option value="General Engineering">General / Other Engineering Role</option>
                                                <option value="General Project Management">General / Other Projects Role</option>
                                                <option value="General Admin">General Admin / Human Resources</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-slate-700 text-xs font-semibold">Department / Division <span className="text-rose-500">*</span></label>
                                            <select
                                                required
                                                value={formData.department}
                                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800 appearance-none"
                                            >
                                                <option value="">— Select Department —</option>
                                                {departmentsList.filter(d => d !== 'All').map(dept => (
                                                    <option key={dept} value={dept}>{dept}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-slate-700 text-xs font-semibold">Total Years of Experience <span className="text-rose-500">*</span></label>
                                            <select
                                                required
                                                value={formData.experience}
                                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800 appearance-none"
                                            >
                                                <option value="">— Select —</option>
                                                <option value="GET/Fresh Graduate">Fresh Graduate / no exp</option>
                                                <option value="1-3 Years">1 - 3 Years</option>
                                                <option value="4-7 Years">4 - 7 Years</option>
                                                <option value="8-12 Years">8 - 12 Years</option>
                                                <option value="12+ Years">12+ Years</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-slate-700 text-xs font-semibold">Current / Expected CTC</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. ₹12 LPA / Open to discuss"
                                                value={formData.ctc}
                                                onChange={(e) => setFormData({ ...formData, ctc: e.target.value })}
                                                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-slate-700 text-xs font-semibold">Current Location <span className="text-rose-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Mumbai, Maharashtra"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-slate-700 text-xs font-semibold">Notice Period</label>
                                            <select
                                                value={formData.noticePeriod}
                                                onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                                                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800 appearance-none"
                                            >
                                                <option value="">— Select —</option>
                                                <option value="Immediate Joiner">Immediate Joiner</option>
                                                <option value="15 Days">15 Days</option>
                                                <option value="30 Days">30 Days</option>
                                                <option value="60 Days">60 Days</option>
                                                <option value="90 Days">90 Days</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-slate-700 text-xs font-semibold">Key Qualifications &amp; Certifications</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. B.E. Electrical, PMP, NEBOSH IGC, RTAP, Govt. Licensed EE"
                                            value={formData.qualifications}
                                            onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                                            className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-slate-700 text-xs font-semibold">Brief Cover Note <span className="text-rose-500">*</span></label>
                                        <textarea
                                            required
                                            rows={3}
                                            placeholder="Tell us briefly why you're the right fit for this role, and what excites you about joining Skyline..."
                                            value={formData.coverNote}
                                            onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                                            className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800 resize-none"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-slate-700 text-xs font-semibold">Upload CV / Resume <span className="text-rose-500">*</span></label>

                                        <div
                                            onDragOver={handleDragOver}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-2 border-dashed border-slate-200 hover:border-amber-500 bg-slate-50/30 hover:bg-slate-50/70 rounded-xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-1.5"
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                required={!fileName}
                                                onChange={handleFileChange}
                                                accept=".pdf,.doc,.docx"
                                                className="hidden"
                                            />
                                            <Upload className="w-6 h-6 text-slate-400" />
                                            {fileName ? (
                                                <div className="space-y-0.5">
                                                    <p className="text-xs font-bold text-slate-800">{fileName}</p>
                                                    <p className="text-[10px] text-emerald-600 font-bold">File selected successfully. Click to replace.</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-0.5">
                                                    <p className="text-xs font-medium text-slate-700">Drag &amp; drop your CV here</p>
                                                    <p className="text-[10px] text-slate-400">or click to browse • PDF, DOC, DOCX • Max 5MB</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-slate-700 text-xs font-semibold">LinkedIn Profile URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://linkedin.com/in/yourprofile"
                                            value={formData.linkedin}
                                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                            className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1.5 focus:ring-amber-500 focus:bg-white text-slate-800"
                                        />
                                    </div>

                                    <div className="flex items-start space-x-2.5 pt-1">
                                        <input
                                            type="checkbox"
                                            id="careers-consent"
                                            required
                                            checked={formData.consent}
                                            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                            className="mt-0.5 rounded border-slate-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                                        />
                                        <label htmlFor="careers-consent" className="text-[11.5px] text-slate-500 cursor-pointer select-none leading-relaxed">
                                            I consent to Skyline Electronetworks storing and processing my personal information for recruitment purposes in accordance with its <span className="text-slate-750 font-semibold hover:underline">Privacy Policy</span>. I understand my data will be retained for up to 12 months. <span className="text-rose-500">*</span>
                                        </label>
                                    </div>

                                    <div className="pt-3">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-3 bg-[#1d4ed8] border border-blue-700 hover:bg-blue-805 text-white font-bold uppercase text-[11px] tracking-widest rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer active:translate-y-0.5"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    <span>Processing Application...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                                    <span>Submit Application</span>
                                                </>
                                            )}
                                        </button>
                                        <p className="text-center text-[10px] text-slate-400 mt-2.5">
                                            ✓ Your information is encrypted and never shared.
                                        </p>
                                    </div>

                                </form>
                            )}

                        </div>
                    </div>

                </div>
            </section>

            {/* 6. BOTTOM BLUEPRINT BANNER */}
            <section className="bg-[#1e40af] text-white py-16 px-6 relative overflow-hidden">

                <div className="absolute inset-0 bg-repeat bg-center opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30h-10v-10h10v10zm-10-10h-10v-10h10v10zm-10-10h-10v-10h10v10zm20-20h-10v-10h10v10z' fill='%23FFFFFF' fill-opacity='.1'/%3E%3C/svg%3E")` }} />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

                    <div className="lg:col-span-8 space-y-4">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-200">
                            DON'T SEE THE RIGHT ROLE?
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                            We're Always Looking <br />
                            for Great Engineers
                        </h2>
                        <p className="font-body text-sm md:text-base text-blue-100 max-w-2xl leading-relaxed">
                            Send us your CV even if there's no current opening that matches — we keep strong profiles on file and reach out when the right opportunity arises.
                        </p>
                    </div>

                    <div className="lg:col-span-4 flex flex-col sm:flex-row gap-4 lg:justify-end">
                        <button
                            onClick={() => {
                                if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold uppercase text-xs tracking-wider rounded-lg shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2 cursor-pointer active:translate-y-0.5"
                        >
                            <Upload className="w-4 h-4 shrink-0" />
                            <span>Submit Your CV</span>
                        </button>

                        <a
                            href="mailto:careers@skylineelectronetworks.com?subject=Inquiry / Speculative Application for Skyline Careers"
                            className="px-6 py-3.5 border-2 border-white/80 hover:border-white hover:bg-white/10 text-white font-bold uppercase text-xs tracking-wider rounded-lg transition flex items-center justify-center space-x-2 cursor-pointer active:translate-y-0.5 text-center"
                        >
                            <Mail className="w-4 h-4 shrink-0" />
                            <span>Email Careers Team</span>
                        </a>
                    </div>

                </div>
            </section>

        </div>
    );
}
