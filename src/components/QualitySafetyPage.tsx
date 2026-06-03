'use client';

import React, { useState } from 'react';
import {
    Shield,
    Award,
    CheckCircle2,
    Star,
    Milestone,
    Zap,
    Activity,
    FileText,
    Check,
    AlertTriangle,
    HeartPulse,
    Eye,
    Flame,
    Siren,
    ChevronRight,
    TrendingUp,
    Users2,
    UserCheck,
    ThumbsUp,
    ChevronDown,
    Download,
    Phone,
    Grid,
    ShieldAlert,
    ClipboardCheck,
    Cpu,
    BookmarkCheck,
    BadgeAlert,
    HardHat,
    PenLine,
    MessageSquare,
    Search
} from 'lucide-react';
import { motion } from 'motion/react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import { useRouter } from 'next/navigation';

// Risk matrix rating tiers and their cell presentation.
type RiskTier = 'low' | 'medium' | 'high' | 'critical';

const RISK_TIER_STYLE: Record<RiskTier, { label: string; cell: string }> = {
    low: { label: 'Low', cell: 'bg-emerald-400 text-emerald-950' },
    medium: { label: 'Medium', cell: 'bg-amber-400 text-amber-950' },
    high: { label: 'High', cell: 'bg-orange-500 text-white' },
    critical: { label: 'Critical', cell: 'bg-rose-600 text-white' }
};

export default function QualitySafetyPage() {
    const { openQuote } = useQuoteModal();
    const router = useRouter();
    const [activeStep, setActiveStep] = useState<number>(0);
    const [activeTab, setActiveTab] = useState<'all' | 'daily' | 'weekly' | 'monthly' | 'annual'>('all');

    const handleOpenAction = (actionStr: string) => {
        openQuote(`HSE / Quality Request: ${actionStr}`);
    };

    // 1. Safety Standards List (IS/IEC Grid)
    const standardsData = [
        {
            code: 'IS 3043',
            title: 'Code of Practice for Earthing',
            desc: 'Earthmat design, chemical earthing, and equipment earthing specification for all HT and LT electrical systems.',
            category: 'SAFETY - EARTHING',
            color: 'border-t-emerald-500',
            icon: <Activity className="w-5 h-5 text-emerald-500" />
        },
        {
            code: 'CEA Regulations',
            title: 'Central Electricity Authority Guidelines',
            desc: 'Statutory measures relating to safety, installation, and supply of electricity 2010 (amended 2019).',
            category: 'STATUTORY - HT/LT',
            color: 'border-t-blue-500',
            icon: <Zap className="w-5 h-5 text-blue-500" />
        },
        {
            code: 'IS 732',
            title: 'Electrical Wiring Installations Practice',
            desc: 'Standards governing design, selection of materials, conduit piping, and cable sizing for LT internal electrical works.',
            category: 'WIRING - LT WORKS',
            color: 'border-t-amber-500',
            icon: <Grid className="w-5 h-5 text-amber-500" />
        },
        {
            code: 'IEC 61439',
            title: 'Low-voltage Switchgear & Controlgear',
            desc: 'International specifications for design verification, testing, and safety of low-voltage electrical panel assemblies.',
            category: 'LV PANELS - IEC',
            color: 'border-t-teal-500',
            icon: <Cpu className="w-5 h-5 text-teal-500" />
        },
        {
            code: 'NBC 2016',
            title: 'National Building Code (Part 8)',
            desc: 'Provisions for safe planning, design, and execution of internal and external electrical installations in structures.',
            category: 'BUILDINGS - NATIONAL',
            color: 'border-t-purple-500',
            icon: <Milestone className="w-5 h-5 text-purple-500" />
        },
        {
            code: 'IEEE 80',
            title: 'AC Substation Grounding Safety',
            desc: 'International engineering calculations for design parameters, step and touch potential for high-voltage outdoor yards.',
            category: 'SUBSTATION - IEEE',
            color: 'border-t-orange-500',
            icon: <Shield className="w-5 h-5 text-orange-500" />
        },
        {
            code: 'IS 1646',
            title: 'Fire Safety of Buildings (Electrical)',
            desc: 'Safeguards, protection, and maintenance criteria in structures to prevent and combat electrical fire hazards.',
            category: 'FIRE SAFETY - BUILDINGS',
            color: 'border-t-rose-500',
            icon: <Flame className="w-5 h-5 text-rose-500" />
        },
        {
            code: 'IEC 61000',
            title: 'Electromagnetic Compatibility (EMC)',
            desc: 'Power quality monitoring, harmonic correction, and transient surge voltage protection specifications.',
            category: 'POWER QUALITY - IEC',
            color: 'border-t-slate-500',
            icon: <ClipboardCheck className="w-5 h-5 text-slate-500" />
        }
    ];

    const secondaryStandards = [
        { code: 'IS 5578', label: 'HV Cable Jointing & Termination' },
        { code: 'IS 11353', label: 'Uniform System of Marking & Identification' },
        { code: 'IS 2309', label: 'Protection of Buildings Against Lightning' },
        { code: 'IEC 60479', label: 'Effects of Current on Human Beings' },
        { code: 'IS 6665', label: 'Code of Practice for Industrial Lighting' },
        { code: 'NFPA 70E', label: 'Electrical Safety in the Workplace' },
        { code: 'IE Rules 19565', label: 'Indian Electricity Rules - Safety' },
        { code: 'IEC 62271', label: 'HT Switchgear & Controlgear' },
    ];

    // 2. Personal Protective Equipment (PPE) Lists
    const ppeList = [
        {
            title: 'Arc-Flash Rated Helmet',
            standards: 'IS 2925 / ANSI Z89.1 Class E',
            desc: 'High-density fiber dielectric helmet rated for 20KV ground protection. Heat-resistant and impact-tested to safeguard personnel from falling hazards and structural flashes.',
            tag: 'MANDATORY — ALL PERSONNEL',
            icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />
        },
        {
            title: 'HV Insulated Gloves',
            standards: 'IEC 60903 Class 2 (17KV Rated)',
            desc: 'Specially synthesized natural rubber gloves, dielectric-tested. Insures the worker against electrical shock during manual switching and high-tension operations.',
            tag: 'MANDATORY — HT OPERATIONS',
            icon: <Zap className="w-4 h-4 text-emerald-400" />
        },
        {
            title: 'Arc Flash Face Shield',
            standards: 'ATPV Rated (40 cal/cm²)',
            desc: 'Scratch-resistant poly-carbonate face shield with a molded brow-guard. Essential for preventing arc flash thermal radiation burns during active substation switching.',
            tag: 'MANDATORY — ENERGISED WORK',
            icon: <Eye className="w-4 h-4 text-emerald-400" />
        },
        {
            title: 'Dielectric Safety Boots',
            standards: 'IS 15298 / EN ISO 20345',
            desc: 'Anti-static, composite-toe dielectric boots with oil-resistant rubber outsoles, protecting site workers from ground potential, punctures, and slip hazards.',
            tag: 'MANDATORY — ALL SITE ENTRY',
            icon: <Check className="w-4 h-4 text-emerald-400" />
        },
        {
            title: 'Safety Eyewear (EN166)',
            standards: 'Impact & UV-Protect Class 1',
            desc: 'Fully wrapper protective glasses with anti-fog coatings, mandatory during trenching, HT cable routing, glanding, and high-altitude steel erections.',
            tag: 'MANDATORY — TASK SPECIFIC',
            icon: <Eye className="w-4 h-4 text-emerald-400" />
        },
        {
            title: 'FR Coveralls (Arc-Rated)',
            standards: 'NFPA 2112 / NFPA 70E PPE 2',
            desc: 'Flame-resistant integrated boiler suites constructed from heavy cotton thread. Prevents continuous combustion of fabric during unforeseen brief flashing.',
            tag: 'MANDATORY — ELECTRICAL WORK',
            icon: <Flame className="w-4 h-4 text-emerald-400" />
        },
        {
            title: 'Fall Arrest Harness',
            standards: 'EN 361 / IS 3521 Certified',
            desc: 'Full-body ergonomic safety harness equipped with quick-connect structural hardware, dual-lanyards, and static inertia-reels to protect height operations.',
            tag: 'MANDATORY — HEIGHT WORK',
            icon: <Activity className="w-4 h-4 text-emerald-400" />
        },
        {
            title: 'Ear Protection (85 dB+)',
            standards: 'SNR Rating 32dB / EN 352',
            desc: 'Adjustable acoustic muffs or disposable poly-urethane plugs worn near large running diesel generator sets and substation mechanical infrastructure.',
            tag: 'MANDATORY — NOISE ZONES',
            icon: <Siren className="w-4 h-4 text-emerald-400" />
        }
    ];

    // 3. Safety Practices toolbox briefings
    const toolboxTalks = [
        {
            num: '01',
            title: 'Daily Task Hazard Assessment',
            desc: 'Site supervisor identifies specific hazards for the day\'s scheduled tasks, assigning risk levels and reviewing active controls before anyone commences.',
            badge: 'DAILY — BEFORE WORK COMMENCES — ALL SITES'
        },
        {
            num: '02',
            title: 'Permit-to-Work (PTW) Briefing',
            desc: 'Mandatory on-site verification of isolation, key LOTO locks, physical boundary barrier installations, and multi-signature authorization before live work.',
            badge: 'DAILY — WITH EACH NEW PTW ISSUANCE'
        },
        {
            num: '03',
            title: 'PPE Inspection & Compliance Check',
            desc: 'Physical checks of personnel insulation gears. Faulty, worn, or unrated helmets, boots, or gloves are immediately swapped out with certified backup supply.',
            badge: 'DAILY — BEFORE SITE ENTRY'
        },
        {
            num: '04',
            title: 'Near-Miss & Unsafe Condition Reporting',
            desc: 'Enables any ground personnel to report minor anomalies or near-collisions without penalties, reinforcing zero-incident feedback loops during evening debriefs.',
            badge: 'DAILY — END-OF-DAY DEBRIEF'
        },
        {
            num: '05',
            title: 'Emergency Drill & Muster Practice',
            desc: 'Simulations of cardiac CPR first-aid, confined space rescue, and chemical/CO2 electrical fire evacuation to ensure rapid reaction from site staff.',
            badge: 'MONTHLY — UNANNOUNCED — ALL SITES'
        }
    ];

    // 4. Quality Control chevron steps
    const qcSteps = [
        {
            step: '01',
            title: 'Design Review & Approval',
            desc: 'Detailed engineering drawings, SLDs, short-circuit, and load-flow modeling studies are reviewed and certified by our internal board before site deployment.',
            milestone: 'Key Milestone'
        },
        {
            step: '02',
            title: 'Material Inspection & FAT',
            desc: 'We conduct rigorous Factory Acceptance Tests (FAT) at partner OEM facilities, guaranteeing compliance with IS specifications before logistics dispatch.',
            milestone: 'Critical Gate'
        },
        {
            step: '03',
            title: 'Installation & IQC',
            desc: 'In-process Quality Control (IQC) supervises on-site assembly, cable layouts, terminal tighteness, and physical erection, logging reports in our enterprise ERP.',
            milestone: 'Standard Phase'
        },
        {
            step: '04',
            title: 'Pre-Commissioning Tests',
            desc: 'High-voltage insulation resistence checks, transformer oil dielectric tests, primary injection, and relay coordination checks ensure system readiness.',
            milestone: 'Standard Phase'
        },
        {
            step: '05',
            title: 'Energisation & Commissioning',
            desc: 'Supervised energisation sequence conducted hand-in-hand with state electrical inspectors, utility grid teams, and clients under strict safety protocols.',
            milestone: 'Critical Gate'
        },
        {
            step: '06',
            title: 'Final QA Sign-Off',
            desc: 'All final as-built drawings, OM manuals, OM clearances, test reports, and warranty guarantees are securely bundled and transferred to client operators.',
            milestone: 'Key Milestone'
        }
    ];

    // 5. Risk Assessment Likelihood (rows) vs Severity (cols). Each cell carries a
    //    rating tier — 'low' | 'medium' | 'high' | 'critical' — that drives both the
    //    cell label and its fill colour.
    const riskGrid: {
        row: string;
        cells: { minor: RiskTier; moderate: RiskTier; major: RiskTier; critical: RiskTier };
    }[] = [
        { row: 'Almost Certain', cells: { minor: 'high', moderate: 'critical', major: 'critical', critical: 'critical' } },
        { row: 'Likely', cells: { minor: 'medium', moderate: 'high', major: 'critical', critical: 'critical' } },
        { row: 'Possible', cells: { minor: 'medium', moderate: 'medium', major: 'high', critical: 'critical' } },
        { row: 'Unlikely', cells: { minor: 'low', moderate: 'medium', major: 'medium', critical: 'high' } },
        { row: 'Rare', cells: { minor: 'low', moderate: 'low', major: 'medium', critical: 'medium' } }
    ];

    // 6. Hierarchy of risk controls — ordered most to least effective. `effectiveness`
    //    drives the width of the segmented indicator; `accent` sets the badge/bar colour.
    const riskControls = [
        {
            title: 'Elimination',
            desc: 'Physically remove the hazard — e.g., de-energise, discharge, and earth all HV systems before any work commences.',
            effectiveness: 95,
            accent: 'emerald'
        },
        {
            title: 'Substitution',
            desc: 'Replace hazardous process with a safer one — e.g., use infra-red thermography instead of live contact measurement.',
            effectiveness: 75,
            accent: 'blue'
        },
        {
            title: 'Engineering Controls',
            desc: 'Isolate people from the hazard — arc-flash barriers, interlocks, RCDs, warning signs, and restricted access zones.',
            effectiveness: 55,
            accent: 'amber'
        },
        {
            title: 'Administrative Controls',
            desc: 'Change the way people work — LOTO procedures, PTW system, competency training, SOPs, and toolbox talks.',
            effectiveness: 35,
            accent: 'orange'
        },
        {
            title: 'PPE',
            desc: 'Protect the worker from residual risk — arc-flash rated PPE, HV insulated gloves, dielectric footwear, and fall arrest systems.',
            effectiveness: 15,
            accent: 'rose'
        }
    ];

    const CONTROL_ACCENT: Record<string, { ring: string; text: string; bar: string }> = {
        emerald: { ring: 'border-emerald-400/40 text-emerald-400', text: 'text-emerald-400', bar: 'bg-emerald-400' },
        blue: { ring: 'border-blue-400/40 text-blue-400', text: 'text-blue-400', bar: 'bg-blue-400' },
        amber: { ring: 'border-amber-400/40 text-amber-400', text: 'text-amber-400', bar: 'bg-amber-400' },
        orange: { ring: 'border-orange-500/40 text-orange-500', text: 'text-orange-500', bar: 'bg-orange-500' },
        rose: { ring: 'border-rose-500/40 text-rose-500', text: 'text-rose-500', bar: 'bg-rose-500' }
    };

    // 7. Incident reporting & investigation — 5-step horizontal stepper.
    const incidentSteps = [
        {
            icon: Zap,
            title: 'Immediate Response',
            desc: 'Stop work · Secure scene · First aid · Evacuate if needed'
        },
        {
            icon: PenLine,
            title: 'Notify & Report',
            desc: 'Inform PM, HSE Officer & Director within 1 hour'
        },
        {
            icon: MessageSquare,
            title: 'Document & Preserve',
            desc: 'Photograph scene · Record witness statements · Complete IR form'
        },
        {
            icon: Search,
            title: 'Root Cause Analysis',
            desc: '5-Why analysis · Fishbone diagram · Contributing factors'
        },
        {
            icon: Check,
            title: 'Corrective Action & Close-Out',
            desc: 'CAPA implemented · Shared site-wide · Lesson learned circulated'
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* SECTION 1: HEADER HERO PANEL */}
            <div className="relative text-white pt-10 pb-20 md:py-24 overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/quality-hero.jpg"
                        alt="Quality & Safety"
                        className="w-full h-full object-cover object-center scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/70 z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    {/* Breadcrumb line matching other inner pages */}
                    <div className="flex items-center space-x-2 text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-6 sm:mb-10">
                        <button onClick={() => router.push('/')} className="hover:text-emerald-400 transition cursor-pointer">HOME</button>
                        <span>/</span>
                        <span className="text-emerald-400">QUALITY &amp; SAFETY</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                        <div className="lg:col-span-8 space-y-6">
                            <div className="inline-flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-emerald-400"></span>
                                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                                    HSE • QUALITY MANAGEMENT • COMPLIANCE
                                </span>
                            </div>

                            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
                                Safety is Not a Priority — <br />
                                <span className="text-emerald-400">It's a Core Value.</span>
                            </h1>

                            <p className="font-body text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
                                At Skyline Electronetworks, zero harm is not an aspiration — it is a non-negotiable standard that governs every decision, every site, and every person who works under our name. Our safety record reflects 8 consecutive years without a lost-time incident.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-3">
                                <button
                                    onClick={() => {
                                        const block = document.getElementById('safety-commitment');
                                        if (block) block.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg flex items-center space-x-2 transition cursor-pointer active:scale-95 text-center text-slate-950 min-h-[44px]"
                                >
                                    <Shield className="w-4 h-4" />
                                    <span>View Safety Policy</span>
                                </button>
                                <button
                                    onClick={() => {
                                        const block = document.getElementById('quality-process');
                                        if (block) block.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-6 py-3 border border-slate-600 hover:border-emerald-400 hover:bg-emerald-500/5 text-white hover:text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center space-x-2 transition cursor-pointer active:scale-95 text-center min-h-[44px]"
                                >
                                    <Award className="w-4 h-4 text-emerald-400" />
                                    <span>Quality Process</span>
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Bottom Highlight stats separated from hero */}
            <div className="bg-[#0d1a2d] text-white border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left">
                        <div className="space-y-1">
                            <p className="text-2xl md:text-3xl font-heading font-black text-emerald-400 tracking-tight">0</p>
                            <p className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">LOST-TIME INCIDENTS (8 YRS)</p>
                        </div>
                        <div className="space-y-1 md:border-l md:border-slate-800/60 md:pl-6">
                            <p className="text-2xl md:text-3xl font-heading font-black text-emerald-400 tracking-tight">ISO</p>
                            <p className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">9001:2015 CERTIFIED</p>
                        </div>
                        <div className="space-y-1 md:border-l md:border-slate-800/60 md:pl-6">
                            <p className="text-2xl md:text-3xl font-heading font-black text-emerald-400 tracking-tight">OHSAS</p>
                            <p className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">18001 CERTIFIED</p>
                        </div>
                        <div className="space-y-1 md:border-l md:border-slate-800/60 md:pl-6">
                            <p className="text-2xl md:text-3xl font-heading font-black text-emerald-400 tracking-tight">28</p>
                            <p className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">DOCUMENTED SOPS</p>
                        </div>
                        <div className="space-y-1 border-l border-slate-800/60 pl-4 md:pl-6 col-span-2 md:col-span-1">
                            <p className="text-2xl md:text-3xl font-heading font-black text-emerald-400 tracking-tight">100%</p>
                            <p className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">PPE COMPLIANCE RATE</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: COMMITMENT TO ZERO HARM */}
            <section id="safety-commitment" className="py-16 md:py-24 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Left Texts Layout mimicking screenshot 2 */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="space-y-3">
                                <span className="font-mono text-xs font-black text-emerald-600 tracking-widest block uppercase">
                                    SAFETY POLICY
                                </span>
                                <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                    Our Commitment to <br />
                                    <span className="text-[#10b981]">Zero Harm</span>
                                </h2>
                            </div>

                            {/* MD Quote Block */}
                            <div className="relative border-l-4 border-emerald-500 bg-emerald-50/40 p-6 rounded-r-xl">
                                <p className="font-body text-slate-800 text-sm md:text-base italic leading-relaxed font-semibold">
                                    "The health, safety, and wellbeing of every person who sets foot on a Skyline Electronetworks project site is our highest operational responsibility, above schedule, above cost, and above any other consideration."
                                </p>
                                <p className="font-mono text-xs text-emerald-700 font-bold tracking-wider mt-4">
                                    — RAJESH S. KAPOOR, CHAIRMAN &amp; MD
                                </p>
                            </div>

                            <p className="font-body text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                                Skyline Electronetworks maintains a comprehensive, OHSAS 18001-certified Health, Safety &amp; Environment (HSE) Management System, which is reviewed annually by our Board and implemented on every project site across India, without exception.
                            </p>

                            {/* Bullet checklist with nice small spacing layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div className="flex items-start space-x-3">
                                    <span className="p-1 rounded bg-emerald-100 text-emerald-600 mt-0.5 shrink-0">
                                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                                    </span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-xs">Zero tolerance for unsafe acts</h4>
                                        <p className="text-[11px] text-slate-500 mt-0.5">Any site supervisor has the authority and responsibility to stop work immediately if safety is compromised.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <span className="p-1 rounded bg-emerald-100 text-emerald-600 mt-0.5 shrink-0">
                                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                                    </span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-xs">Full Standard Compliance</h4>
                                        <p className="text-[11px] text-slate-500 mt-0.5">Absolute consistency with CEA, BIS, NBC, and OHSAS 18001 standards at all times across all work zones.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <span className="p-1 rounded bg-emerald-100 text-emerald-600 mt-0.5 shrink-0">
                                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                                    </span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-xs">Mandatory Induction Training</h4>
                                        <p className="text-[11px] text-slate-500 mt-0.5">Every worker, permanent, contract, or daily wage must pass safety inductions before site entry is approved.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <span className="p-1 rounded bg-emerald-100 text-emerald-600 mt-0.5 shrink-0">
                                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                                    </span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-xs">Weekly Independent HSE Audits</h4>
                                        <p className="text-[11px] text-slate-500 mt-0.5">Conducted by certified safety marshalls and monitored directly by our Head of corporate HSE operations.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 col-span-1 md:col-span-2">
                                    <span className="p-1 rounded bg-emerald-100 text-emerald-600 mt-0.5 shrink-0">
                                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                                    </span>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-xs">Continuous Up-skilling &amp; Incentives</h4>
                                        <p className="text-[11px] text-slate-500 mt-0.5">Safety milestones are rewarded with peer-wide performance incentives. Management personnel hold NEBOSH or IOSH certifications alongside certified first aid credentials.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Picture Mockup with Statistics overlays mimicking Figma Screenshot 2 */}
                        <div className="lg:col-span-5 relative">
                            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 relative aspect-[4/3] group bg-slate-950">
                                <img
                                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=85"
                                    alt="Skyline Site Engineer inspecting substation structures"
                                    className="w-full h-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent" />

                                {/* 8 Year Zero LTI badge overlay */}
                                <div className="absolute top-4 right-4 bg-emerald-950/90 border border-emerald-500/20 backdrop-blur-md p-4 rounded-xl shadow-lg text-center max-w-[170px] select-none">
                                    <p className="text-3xl font-heading font-black text-emerald-400">0</p>
                                    <p className="text-[9px] font-mono text-emerald-100/80 tracking-wider font-bold uppercase mt-1">Lost-Time Incidents</p>
                                    <p className="text-[8px] font-mono text-slate-400 mt-0.5 uppercase tracking-normal font-semibold">8 Consecutive Years</p>
                                </div>

                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-widest">SKYLINE WORK SITE SAFETY</p>
                                    <p className="font-body text-xs text-slate-200 font-semibold mt-0.5 leading-tight">Live Traction and Switchyard site operations are supervised 24/7 by OHSAS certified teams.</p>
                                </div>
                            </div>

                            {/* Vertical list cards overlay below or alongside */}
                            <div className="mt-6 space-y-3.5">
                                <div className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-md flex items-center justify-between hover:bg-slate-50/50 transition">
                                    <div className="flex items-center space-x-3.5">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-sm">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-xs">OHSAS 18001</h4>
                                            <p className="text-[10px] font-mono text-slate-400 uppercase font-black tracking-wider mt-0.5">HSE Management • Certified 2008</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>

                                <div className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-md flex items-center justify-between hover:bg-slate-50/50 transition">
                                    <div className="flex items-center space-x-3.5">
                                        <div className="w-10 h-10 rounded-lg bg-[#1d4ed8]/5 text-[#1d4ed8] flex items-center justify-center font-bold shadow-sm">
                                            <Award className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-xs">ISO 9001:2015</h4>
                                            <p className="text-[10px] font-mono text-slate-400 uppercase font-black tracking-wider mt-0.5">Quality Management • Certified 2010</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>

                                <div className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-md flex items-center justify-between hover:bg-slate-50/50 transition">
                                    <div className="flex items-center space-x-3.5">
                                        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold shadow-sm">
                                            <Milestone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-xs">GPWD Class-1</h4>
                                            <p className="text-[10px] font-mono text-slate-400 uppercase font-black tracking-wider mt-0.5">Govt. Registration • National Range</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* SECTION 3: STANDARDS WE WORK TO */}
            <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 md:mb-16">
                        <span className="font-mono text-xs font-black text-blue-600 uppercase tracking-[0.2em] block">
                            REGULATORY COMPLIANCE
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                            Standards We Work To
                        </h2>
                        <p className="font-body text-sm md:text-base text-slate-500 leading-relaxed">
                            Every Skyline project is executed in strict compliance with the applicable Indian and International Electrotechnical Standards governing safety, quality, and performance of electrical installations.
                        </p>
                    </div>

                    {/* 8 Card Grid of Standard Blocks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {standardsData.map((std, idx) => (
                            <div
                                key={idx}
                                className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition duration-250 flex flex-col justify-between sm:min-h-[220px] border-t-4 ${std.color}`}
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-heading text-sm font-black text-slate-900 tracking-tight uppercase border-b border-slate-100 pb-1">
                                            {std.code}
                                        </span>
                                        {std.icon}
                                    </div>

                                    <h4 className="font-body text-xs font-bold text-slate-800 leading-snug">
                                        {std.title}
                                    </h4>
                                    <p className="text-slate-500 text-[11px] leading-relaxed">
                                        {std.desc}
                                    </p>
                                </div>

                                <div className="pt-3.5 border-t border-slate-100 mt-2.5">
                                    <span className="font-mono text-[9px] text-[#1d4ed8] font-black uppercase tracking-wider block">
                                        {std.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional standards redesigned */}
                    <div className="mt-10 relative">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="w-8 h-[2px] bg-emerald-400"></span>
                            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                                Additional Standards &amp; Codes of Practice
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {secondaryStandards.map((sec, id) => (
                                <div key={id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition flex items-center space-x-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition">
                                        <BookmarkCheck className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="font-mono text-[10px] text-amber-600 font-bold tracking-wider uppercase block">{sec.code}</span>
                                        <span className="text-slate-600 text-[10.5px] font-medium leading-tight block truncate">{sec.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* SECTION 4: PERSONAL PROTECTIVE EQUIPMENT */}
            <section className="py-16 md:py-24 bg-[#0a1424] text-white border-b border-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Worker Column */}
                        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                            <span className="font-mono text-xs font-black text-emerald-400 tracking-[0.2em] uppercase block">
                                PPE PROGRAMME
                            </span>
                            <h2 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                Personal Protective <br />
                                <span className="text-emerald-400">Equipment</span>
                            </h2>
                            <p className="font-body text-sm text-slate-300 leading-relaxed font-light">
                                All PPE deployed on Skyline sites is IS/IEC-rated, employer-supplied at no cost to the worker, and inspected daily. Non-compliance is treated as a serious disciplinary matter under our Zero Tolerance policy.
                            </p>

                            {/* Decorative Safety Image Panel with absolute overlays */}
                            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl relative aspect-[3/2] bg-slate-900 mt-6">
                                <img
                                    src="https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80"
                                    alt="Industrial power worker in personal shields"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="font-mono text-[9px] text-[#10b981] font-bold tracking-widest uppercase">MANDATORY CONTRACT PRINCIPLE</p>
                                    <p className="text-[11px] text-slate-300 font-semibold tracking-wide mt-0.5">
                                        100% compliance enforced — Zero exceptions policy — Daily inspection before work commences.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Standard Items Grid representing the PPE cards */}
                        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ppeList.map((ppe, idx) => (
                                <div
                                    key={idx}
                                    className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition duration-200 flex flex-col justify-between space-y-3.5 group"
                                >
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-emerald-400 shrink-0">
                                                {ppe.icon}
                                            </span>
                                            <span className="bg-slate-800 text-[8px] font-mono font-bold tracking-widest text-[#a0aec0] px-2 py-0.5 rounded uppercase">
                                                {ppe.standards}
                                            </span>
                                        </div>

                                        <h4 className="font-heading font-black text-slate-100 text-sm tracking-tight pt-1.5 group-hover:text-emerald-400 transition">
                                            {ppe.title}
                                        </h4>
                                        <p className="text-slate-400 text-[11px] leading-relaxed font-light">
                                            {ppe.desc}
                                        </p>
                                    </div>

                                    <div className="border-t border-slate-800/80 pt-2.5">
                                        <span className="font-mono text-[8.5px] text-slate-500 font-black tracking-wider uppercase">
                                            {ppe.tag}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* SECTION 5: ON-SITE PRACTICES & AUDITS */}
            <section className="py-16 md:py-24 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 md:mb-16">
                        <span className="font-mono text-xs font-black text-blue-600 uppercase tracking-[0.2em] block">
                            ON-SITE PRACTICES
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            Safety Practices &amp; Audits
                        </h2>
                        <p className="font-body text-sm md:text-base text-slate-500 leading-relaxed">
                            Our safety practices are not checklists — they are daily disciplines embedded in every level of our workforce, reinforced by regular training, audits, and accountability frameworks.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                        {/* Left side: Toolbox Talks / briefings */}
                        <div className="lg:col-span-6 space-y-8">
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-3">
                                    <span className="w-6 h-[2px] bg-blue-600"></span>
                                    <span className="font-mono text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em]">Toolbox Talks</span>
                                </div>
                                <h3 className="font-heading text-2xl font-black text-slate-900 tracking-tight">
                                    Daily Site Safety Briefings
                                </h3>
                                <p className="font-body text-xs md:text-sm text-slate-500 leading-relaxed font-light">
                                    Every Skyline site begins each working day with a structured toolbox talk — a brief, focused safety discussion led by the site supervisor or safety officer. Topics rotate through our library of 64 pre-approved toolbox talks covering electrical-specific hazards.
                                </p>
                            </div>

                            {/* Timeline Items Checklist */}
                            <div className="space-y-4">
                                {toolboxTalks.map((talk, idx) => (
                                    <div key={idx} className="flex bg-slate-50 p-4.5 rounded-xl border border-slate-200 shadow-sm items-start space-x-4">
                                        <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-center font-heading font-black text-xs shrink-0 shadow-sm text-[#1d4ed8]">
                                            {talk.num}
                                        </div>
                                        <div className="space-y-1.5">
                                            <h4 className="font-bold text-slate-800 text-xs">{talk.title}</h4>
                                            <p className="text-[10px] text-slate-500 leading-relaxed font-light">{talk.desc}</p>
                                            <span className="font-mono text-[8.5px] text-[#1d4ed8] font-bold uppercase tracking-wide block">
                                                {talk.badge}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right side: Audit framework inside high-tech card */}
                        <div className="lg:col-span-6">
                            <div className="bg-[#0d1a2d] text-white rounded-2xl border border-slate-800/80 shadow-2xl p-6.5 space-y-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.25),transparent_70%)]" />

                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-3">
                                        <span className="w-6 h-[2px] bg-blue-400"></span>
                                        <span className="font-mono text-[11px] font-bold text-blue-300 uppercase tracking-[0.2em]">Audit Programme</span>
                                    </div>
                                    <h3 className="font-heading text-2xl font-black text-white tracking-tight">
                                        HSE Audit Framework
                                    </h3>
                                </div>

                                {/* Audit Frequency items list */}
                                <div className="space-y-3.5">

                                    <div className="bg-slate-900/60 p-4 border border-slate-800 rounded-xl hover:bg-slate-950/40 transition">
                                        <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5 mb-1.5">
                                            <span className="font-heading text-xs font-black text-slate-100 tracking-tight">Daily Site Safety Walk</span>
                                            <span className="bg-blue-500/10 text-blue-400 font-mono text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-blue-500/20">DAILY</span>
                                        </div>
                                        <p className="text-slate-350 text-[10.5px] leading-relaxed">
                                            Site Engineer or Safety Marshall inspects all active working areas, access routes, housekeeping, and active PTWs daily. Finding anomalies logged in HSE register.
                                        </p>
                                    </div>

                                    <div className="bg-slate-900/60 p-4 border border-slate-800 rounded-xl hover:bg-slate-950/40 transition">
                                        <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5 mb-1.5">
                                            <span className="font-heading text-xs font-black text-slate-100 tracking-tight">Weekly Formal Safety Inspection</span>
                                            <span className="bg-amber-500/10 text-amber-400 font-mono text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-amber-500/20">WEEKLY</span>
                                        </div>
                                        <p className="text-slate-350 text-[10.5px] leading-relaxed">
                                            Certified HSE inspector executes a 60-point mechanical and isolation protocol walkthrough encompassing scaffolding, storage materials, and PTW compliance reviews.
                                        </p>
                                    </div>

                                    <div className="bg-slate-900/60 p-4 border border-slate-800 rounded-xl hover:bg-slate-950/40 transition">
                                        <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5 mb-1.5">
                                            <span className="font-heading text-xs font-black text-slate-100 tracking-tight">Monthly HOD Safety Audit</span>
                                            <span className="bg-purple-500/10 text-purple-400 font-mono text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-purple-500/20">MONTHLY</span>
                                        </div>
                                        <p className="text-slate-350 text-[10.5px] leading-relaxed">
                                            Unannounced safety diagnostics program conducted directly by the Corporate Head of HSE at active project nodes, checking system health and training checklists.
                                        </p>
                                    </div>

                                    <div className="bg-slate-900/60 p-4 border border-slate-800 rounded-xl hover:bg-slate-950/40 transition">
                                        <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5 mb-1.5">
                                            <span className="font-heading text-xs font-black text-slate-100 tracking-tight font-body">Annual Third-Party OHSAS Audit</span>
                                            <span className="bg-rose-500/10 text-rose-450 font-mono text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-rose-500/20">ANNUAL</span>
                                        </div>
                                        <p className="text-slate-350 text-[10.5px] leading-relaxed">
                                            Compandious surveillance monitoring performed by accredited registrar organizations to validate procedural updates and ensure the continuation of our certifications.
                                        </p>
                                    </div>

                                </div>

                                {/* Audit Metrics Bento Grid bottom panel */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0a1424] p-4.5 border border-slate-800 rounded-xl">
                                    <div className="text-center md:text-left space-y-0.5">
                                        <p className="text-lg font-heading font-black text-amber-500">98%</p>
                                        <p className="text-[7.5px] font-mono text-slate-400 uppercase font-bold tracking-wider">Audit Pass Rate</p>
                                    </div>
                                    <div className="text-center md:text-left space-y-0.5 border-l border-slate-850 pl-3">
                                        <p className="text-lg font-heading font-black text-amber-500">2.4</p>
                                        <p className="text-[7.5px] font-mono text-slate-400 uppercase font-bold tracking-wider">Days to Close findings</p>
                                    </div>
                                    <div className="text-center md:text-left space-y-0.5 border-l border-slate-850 pl-3">
                                        <p className="text-lg font-heading font-black text-amber-500">240+</p>
                                        <p className="text-[7.5px] font-mono text-slate-400 uppercase font-bold tracking-wider">Site Audits / Year</p>
                                    </div>
                                    <div className="text-center md:text-left space-y-0.5 border-l border-slate-850 pl-3">
                                        <p className="text-lg font-heading font-black text-emerald-400">0</p>
                                        <p className="text-[7.5px] font-mono text-slate-400 uppercase font-bold tracking-wider">Major non-conformance</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* SECTION 6: QUALITY CONTROL PROCESS */}
            <section id="quality-process" className="py-16 md:py-24 bg-white border-b border-slate-200">

                {/* Emerald green top stats tape band mimicking screenshot 6 */}
                <div className="w-full bg-[#10b981] text-slate-950 py-7 text-center select-none shadow-md overflow-hidden border-y border-emerald-400">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="space-y-0.5">
                            <p className="text-3xl font-heading font-black text-slate-950 uppercase leading-none">8</p>
                            <p className="text-[10px] uppercase font-mono font-black tracking-widest text-emerald-950">YEARS ZERO LTI RECORD</p>
                        </div>
                        <div className="space-y-0.5 md:border-l md:border-emerald-400 md:pl-3">
                            <p className="text-3xl font-heading font-black text-slate-950 uppercase leading-none">100%</p>
                            <p className="text-[10px] uppercase font-mono font-black tracking-widest text-emerald-950">PPE COMPLIANCE RATE</p>
                        </div>
                        <div className="space-y-0.5 md:border-l md:border-emerald-400 md:pl-3">
                            <p className="text-3xl font-heading font-black text-slate-950 uppercase leading-none">64</p>
                            <p className="text-[10px] uppercase font-mono font-black tracking-widest text-emerald-950">TOOLBOX BRIEF TOPICS</p>
                        </div>
                        <div className="space-y-0.5 md:border-l md:border-emerald-400 md:pl-3">
                            <p className="text-3xl font-heading font-black text-slate-950 uppercase leading-none">240+</p>
                            <p className="text-[10px] uppercase font-mono font-black tracking-widest text-emerald-950">HSE AUDITS ANNUALLY</p>
                        </div>
                    </div>
                </div>

                {/* Core content block */}
                <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 md:mb-16">
                        <span className="font-mono text-xs font-black text-[#10b981] uppercase tracking-[0.2em] block">
                            QUALITY MANAGEMENT
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                            Quality Control Process
                        </h2>
                        <p className="font-body text-sm md:text-base text-slate-500 leading-relaxed">
                            Our ISO 9001:2015-certified Quality Management System governs every project phase — from design review and material inspection through to final energisation and handover documentation.
                        </p>
                    </div>

                    {/* 6 Stage Chevron timeline selector wrapper */}
                    <div className="relative mb-16 pb-4">

                        {/* Visual connected line across desktop */}
                        <div className="hidden lg:block absolute left-4 right-4 top-[22px] h-0.5 bg-slate-200 z-0"></div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
                            {qcSteps.map((qc, id) => {
                                const isActive = activeStep === id;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => setActiveStep(id)}
                                        className="flex flex-col items-center text-center cursor-pointer select-none group focus:outline-none"
                                    >
                                        {/* Circle representing the stage with specific milestones */}
                                        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-heading font-black text-xs border-2 shadow-sm transition-all duration-200 ${isActive
                                            ? 'bg-[#10b981] border-[#10b981] text-white scale-110 ring-4 ring-emerald-100'
                                            : qc.milestone === 'Key Milestone'
                                                ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                                                : qc.milestone === 'Critical Gate'
                                                    ? 'bg-amber-50 border-amber-600 text-amber-700'
                                                    : 'bg-white border-slate-300 text-slate-600 hover:border-slate-800'
                                            }`}>
                                            {qc.step}
                                        </div>

                                        <h4 className={`text-[11.5px] font-bold mt-3 leading-snug transition group-hover:text-amber-500 ${isActive ? 'text-slate-900 font-black' : 'text-slate-700'}`}>
                                            {qc.title}
                                        </h4>

                                        {/* Milestone badges indicator wrapper */}
                                        <span className={`text-[8px] font-mono font-bold uppercase tracking-wider mt-1 px-1.5 py-0.5 rounded ${qc.milestone === 'Key Milestone'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : qc.milestone === 'Critical Gate'
                                                ? 'bg-amber-100 text-amber-805'
                                                : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {qc.milestone}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active Step description panel box mimicking interaction perfectly */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6.5 mt-8 max-w-4xl mx-auto shadow-sm text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 bg-[#10b981] text-white text-[8px] font-mono leading-none tracking-widest uppercase font-black px-3.5 py-1.5 rounded-br-lg shadow-sm">
                                STAGE DETAIL {String(activeStep + 1).padStart(2, '0')}
                            </div>
                            <h4 className="font-heading text-lg font-black text-slate-950 mt-1.5 pb-2.5 border-b border-slate-250/50 max-w-sm mx-auto">
                                {qcSteps[activeStep].title}
                            </h4>
                            <p className="font-body text-slate-650 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto mt-4 font-normal">
                                {qcSteps[activeStep].desc}
                            </p>
                        </div>

                        {/* Chevron Legends footer indicator lines */}
                        <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mt-6 select-none">
                            <span className="flex items-center space-x-2">
                                <span className="w-3 h-3 rounded-full bg-[#10b981]"></span>
                                <span>Active Selection</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-50 border-2 border-emerald-600"></span>
                                <span>Key Milestone</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <span className="w-3 h-3 rounded-full bg-amber-50 border-2 border-amber-605"></span>
                                <span>Critical Gate</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <span className="w-3 h-3 rounded-full bg-white border-2 border-slate-300"></span>
                                <span>Standard Phase</span>
                            </span>
                        </div>

                    </div>

                    {/* Three columns underneath highlighting specific controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Card 1: Design Quality Control */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-slate-350 transition duration-300 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <FileText className="w-5 h-5 shrink-0" />
                                </div>
                                <h3 className="font-heading text-sm font-black text-slate-950 tracking-wide uppercase border-b border-slate-100 pb-2">
                                    Design Quality Control
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed font-light">
                                    All engineering designs are reviewed and approved by the HOD before release to site. No cable schedule, SLD, or panel drawing is issued without QA sign-off.
                                </p>

                                <ul className="space-y-2.5 pt-2">
                                    <li className="flex items-start space-x-2 text-xs text-slate-700">
                                        <Check className="w-4 h-4 text-emerald-500 stroke-[3] shrink-0 mt-0.5" />
                                        <span>Single-line diagram peer review</span>
                                    </li>
                                    <li className="flex items-start space-x-2 text-xs text-slate-700">
                                        <Check className="w-4 h-4 text-emerald-500 stroke-[3] shrink-0 mt-0.5" />
                                        <span>Load flow and short-circuit study validation</span>
                                    </li>
                                    <li className="flex items-start space-x-2 text-xs text-slate-700">
                                        <Check className="w-4 h-4 text-emerald-500 stroke-[3] shrink-0 mt-0.5" />
                                        <span>Cable schedule cross-check</span>
                                    </li>
                                    <li className="flex items-start space-x-2 text-xs text-slate-700">
                                        <Check className="w-4 h-4 text-emerald-500 stroke-[3] shrink-0 mt-0.5" />
                                        <span>Drawing issue register maintained</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Card 2: Material Quality Control */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-slate-350 transition duration-300 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <BookmarkCheck className="w-5 h-5 shrink-0" />
                                </div>
                                <h3 className="font-heading text-sm font-black text-slate-950 tracking-wide uppercase border-b border-slate-100 pb-2">
                                    Material Quality Control
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed font-light">
                                    All materials are inspected at source (FAT), on receipt at site (SAT), and before installation. Only IS/IEC-approved materials from pre-qualified vendors are accepted.
                                </p>

                                <ul className="space-y-2.5 pt-2">
                                    <li className="flex items-start space-x-2 text-xs text-slate-700">
                                        <Check className="w-4 h-4 text-[#1d4ed8] stroke-[3] shrink-0 mt-0.5" />
                                        <span>Factory Acceptance Test (FAT) witnessed</span>
                                    </li>
                                    <li className="flex items-start space-x-2 text-xs text-slate-700">
                                        <Check className="w-4 h-4 text-[#1d4ed8] stroke-[3] shrink-0 mt-0.5" />
                                        <span>Site Acceptance Test (SAT) on delivery</span>
                                    </li>
                                    <li className="flex items-start space-x-2 text-xs text-slate-700">
                                        <Check className="w-4 h-4 text-[#1d4ed8] stroke-[3] shrink-0 mt-0.5" />
                                        <span>Material traceability register</span>
                                    </li>
                                    <li className="flex items-start space-x-2 text-xs text-slate-700">
                                        <Check className="w-4 h-4 text-[#1d4ed8] stroke-[3] shrink-0 mt-0.5" />
                                        <span>Calibration records for test equipment</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Card 3: Test & Commissioning QC */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-slate-350 transition duration-300 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                    <ClipboardCheck className="w-5 h-5 shrink-0" />
                                </div>
                                <h3 className="font-heading text-sm font-black text-slate-950 tracking-wide uppercase border-b border-slate-100 pb-2">
                                    Test &amp; Commissioning QC
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed font-light">
                                    All T&amp;C activities are executed against a pre-approved test programme, witnessed by the client and/or third-party inspector, and documented in formal test reports.
                                </p>

                                <ul className="space-y-2.5 pt-2">
                                    <li className="flex items-start space-x-2 text-xs text-slate-700">
                                        <Check className="w-4 h-4 text-amber-500 stroke-[3] shrink-0 mt-0.5" />
                                        <span>Megger insulation resistance records</span>
                                    </li>
                                    <li className="flex items-start space-x-2 text-xs text-slate-700">
                                        <Check className="w-4 h-4 text-amber-500 stroke-[3] shrink-0 mt-0.5" />
                                        <span>Protection relay test reports (OMICRON)</span>
                                    </li>
                                    <li className="flex items-start space-x-2 text-xs text-slate-700">
                                        <Check className="w-4 h-4 text-amber-500 stroke-[3] shrink-0 mt-0.5" />
                                        <span>Thermographic survey reports</span>
                                    </li>
                                    <li className="flex items-start space-x-2 text-xs text-slate-700">
                                        <Check className="w-4 h-4 text-amber-500 stroke-[3] shrink-0 mt-0.5" />
                                        <span>Power quality analysis at HV energisation</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* SECTION 7: ELECTRICAL RISK MANAGEMENT */}
            <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 md:mb-16">
                        <span className="font-mono text-xs font-black text-rose-500 uppercase tracking-[0.2em] block">
                            RISK MANAGEMENT
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight animate-fade-in">
                            Electrical Risk Management
                        </h2>
                        <p className="font-body text-sm md:text-base text-slate-500 leading-relaxed">
                            Our structured risk management framework identifies, assesses, controls, and monitors electrical hazards across every project phase — from initial design through to post-commissioning operations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                        {/* Left Column: Risk Assessment Matrix */}
                        <div className="lg:col-span-6 space-y-5">
                            <h3 className="font-heading text-lg font-black text-slate-900 tracking-tight">
                                Risk Assessment Matrix
                            </h3>

                            {/* Matrix Board — dark navy panel, horizontally scrollable on mobile */}
                            <div className="overflow-x-auto rounded-2xl shadow-xl border border-slate-800 bg-[#0d1a2d]">
                                <div className="min-w-[480px] p-3 sm:p-4">
                                    {/* Header row */}
                                    <div className="grid grid-cols-5 gap-2 mb-2">
                                        <div className="flex flex-col justify-center font-mono text-[8.5px] font-bold uppercase tracking-wider text-slate-400 leading-tight px-1">
                                            <span>Severity →</span>
                                            <span>Likelihood ↓</span>
                                        </div>
                                        {['Minor', 'Moderate', 'Major', 'Critical'].map((sev) => (
                                            <div key={sev} className="text-center font-mono text-[9px] font-black uppercase tracking-wider text-slate-300 py-2">
                                                {sev}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Data rows */}
                                    <div className="space-y-2">
                                        {riskGrid.map((row, idx) => (
                                            <div key={idx} className="grid grid-cols-5 gap-2 items-stretch">
                                                <div className="flex items-center font-mono text-[10px] font-bold text-slate-200 uppercase tracking-tight px-1 leading-tight">
                                                    {row.row}
                                                </div>
                                                {(['minor', 'moderate', 'major', 'critical'] as const).map((sev) => {
                                                    const tier = RISK_TIER_STYLE[row.cells[sev]];
                                                    return (
                                                        <div
                                                            key={sev}
                                                            className={`flex items-center justify-center rounded-md py-3 font-body text-[11px] font-bold tracking-tight transition-transform duration-200 hover:scale-[1.04] hover:z-10 ${tier.cell}`}
                                                        >
                                                            {tier.label}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Matrix Legend */}
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 font-body text-[11px] font-semibold text-slate-600">
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-emerald-400 rounded-sm"></span>
                                    <span>Low — Monitor</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-amber-400 rounded-sm"></span>
                                    <span>Medium — Control</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-orange-500 rounded-sm"></span>
                                    <span>High — Immediate Action</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-rose-600 rounded-sm"></span>
                                    <span>Critical — Stop Work</span>
                                </span>
                            </div>
                        </div>

                        {/* Right Column: Hierarchy of Risk Controls */}
                        <div className="lg:col-span-6 space-y-5">
                            <h3 className="font-heading text-lg font-black text-slate-900 tracking-tight">
                                Hierarchy of Risk Controls
                            </h3>

                            <div className="bg-[#0d1a2d] text-white rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
                                <p className="font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase px-6 sm:px-7 py-4 border-b border-slate-800/80">
                                    Applied in order — from most to least effective
                                </p>

                                <div className="divide-y divide-slate-800/60">
                                    {riskControls.map((control, idx) => {
                                        const accent = CONTROL_ACCENT[control.accent];
                                        return (
                                            <div
                                                key={idx}
                                                className="flex items-start gap-4 px-6 sm:px-7 py-4 group hover:bg-white/[0.02] transition-colors"
                                            >
                                                {/* Numbered badge */}
                                                <span className={`shrink-0 mt-0.5 w-7 h-7 rounded-full border bg-slate-900/60 flex items-center justify-center font-mono text-[11px] font-black ${accent.ring}`}>
                                                    {idx + 1}
                                                </span>

                                                {/* Title + description */}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-body font-bold text-sm text-white tracking-tight">
                                                        {control.title}
                                                    </h4>
                                                    <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                                                        {control.desc}
                                                    </p>
                                                </div>

                                                {/* Segmented effectiveness indicator */}
                                                <div
                                                    className="shrink-0 mt-1.5 w-16 sm:w-20 h-1.5 rounded-full bg-slate-700/60 overflow-hidden"
                                                    role="meter"
                                                    aria-valuenow={control.effectiveness}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                    aria-label={`${control.title} effectiveness`}
                                                >
                                                    <div
                                                        className={`h-full rounded-full ${accent.bar}`}
                                                        style={{ width: `${control.effectiveness}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Incident Reporting step timeline below */}
                    <div className="mt-16 pt-12 border-t border-slate-200">
                        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                            <h3 className="font-heading text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                Incident Reporting &amp; Investigation Process
                            </h3>
                            <p className="font-body text-sm text-slate-500 leading-relaxed mt-3">
                                All incidents, near-misses, and unsafe conditions follow a structured 5-step response and investigation protocol.
                            </p>
                        </div>

                        {/* Horizontal connected stepper (stacks on mobile) */}
                        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-y-10 md:gap-x-4">

                            {/* Connector line — spans across the node centres on desktop */}
                            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-slate-300" aria-hidden="true"></div>

                            {incidentSteps.map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
                                        className="relative flex flex-col items-center text-center px-2"
                                    >
                                        {/* Node */}
                                        <div className="relative mb-5">
                                            <div className="w-16 h-16 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 transition-all duration-300 hover:border-blue-500 hover:text-blue-600 hover:shadow-md">
                                                <Icon className="w-6 h-6" strokeWidth={1.75} />
                                            </div>
                                            {/* Numbered badge */}
                                            <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#0d1a2d] text-white font-mono text-[10px] font-black flex items-center justify-center ring-4 ring-slate-50">
                                                {idx + 1}
                                            </span>
                                        </div>

                                        <h4 className="font-body font-bold text-slate-900 text-[13px] tracking-tight">
                                            {step.title}
                                        </h4>
                                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1.5 max-w-[180px]">
                                            {step.desc}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </section>

            {/* SECTION 8: BOTTOM BLUEPRINT STYLE INQUIRE BANNER */}
            <section className="bg-blue-600 text-white py-16 px-6 relative overflow-hidden">

                {/* Subtle geometric grid backdrop overlay */}
                <div className="absolute inset-0 bg-repeat bg-center opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30h-10v-10h10v10zm-10-10h-10v-10h10v10zm-10-10h-10v-10h10v10zm20-20h-10v-10h10v10z' fill='%23FFFFFF' fill-opacity='.1'/%3E%3C/svg%3E")` }} />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

                    <div className="lg:col-span-8 space-y-4">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-200">
                            SAFETY &amp; QUALITY — WITHOUT COMPROMISE
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                            Work With a Contractor <br />
                            You Can Trust
                        </h2>
                        <p className="font-body text-sm md:text-base text-blue-100 max-w-2xl leading-relaxed">
                            Our HSE and quality credentials are available for review. Request our ISO certificates, OHSAS certification, or HSE policy document at any time.
                        </p>
                    </div>

                    <div className="lg:col-span-4 flex flex-col sm:flex-row gap-4 lg:justify-end">
                        <button
                            onClick={() => handleOpenAction('HSE & Quality Certificates Request')}
                            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold uppercase text-xs tracking-wider rounded-lg shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2 cursor-pointer text-slate-950 active:scale-95 min-h-[44px]"
                        >
                            <FileText className="w-4 h-4 shrink-0" />
                            <span>Request Certificates</span>
                        </button>
                        <button
                            onClick={() => handleOpenAction('Direct consult with HSE Team')}
                            className="px-6 py-3.5 border-2 border-white/80 hover:border-white hover:bg-white/10 text-white font-bold uppercase text-xs tracking-wider rounded-lg transition flex items-center justify-center space-x-2 cursor-pointer active:scale-95 min-h-[44px]"
                        >
                            <Phone className="w-4 h-4 shrink-0" />
                            <span>Talk to HSE Team</span>
                        </button>
                    </div>

                </div>
            </section>

        </div>
    );
}
