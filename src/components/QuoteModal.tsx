'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calculator, ChevronRight, ChevronLeft, Send, ShieldCheck } from 'lucide-react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import { QuoteRequest } from '@/lib/types';

export default function QuoteModal() {
    const { isQuoteOpen, preselectedProduct, closeQuote } = useQuoteModal();
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<QuoteRequest>({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        projectType: preselectedProduct || 'HT Infrastructure',
        budgetRange: '₹50 Lakhs - ₹2 Crores',
        message: ''
    });

    // Dynamic Estimation State variables
    const [kvaRequirement, setKvaRequirement] = useState<number>(500);
    const [cableDistance, setCableDistance] = useState<number>(2);
    const [hasSubstation, setHasSubstation] = useState<boolean>(true);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // Update project type if preselectedProduct changes
    useEffect(() => {
        if (preselectedProduct) {
            setFormData(prev => ({ ...prev, projectType: preselectedProduct }));
        }
    }, [preselectedProduct]);

    useEffect(() => {
        if (!isQuoteOpen) return;
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') resetState(); };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isQuoteOpen]);

    if (!isQuoteOpen) return null;

    // Real-time ballpark estimation logic based on industrial pricing components in India
    const calculateEstimate = () => {
        let baseRate = 0;
        switch (formData.projectType) {
            case 'HT Works':
            case 'HT Infrastructure':
                baseRate = 1800; // per KVA base
                break;
            case 'LT Works':
                baseRate = 1200; // per KVA base
                break;
            case 'SCADA & Automation':
                baseRate = 900;
                break;
            case 'Lighting Systems':
                baseRate = 600;
                break;
            default:
                baseRate = 1400;
        }

        const loadCost = kvaRequirement * baseRate;
        const cablingCost = cableDistance * 450000; // ₹4.5 Lakhs per km high-spec overhead/undergound laying
        const substationExtra = hasSubstation ? 1500000 : 0; // ₹15 Lakhs setup cost for bays/transformers

        const totalEstimateVal = loadCost + cablingCost + substationExtra;

        // Format to Indian Crore / Lakhs system
        if (totalEstimateVal >= 10000000) {
            return `₹ ${(totalEstimateVal / 10000000).toFixed(2)} Crores`;
        } else {
            return `₹ ${(totalEstimateVal / 100000).toFixed(0)} Lakhs`;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const resetState = () => {
        setStep(1);
        setIsSubmitted(false);
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            companyName: '',
            projectType: 'HT Infrastructure',
            budgetRange: '₹50 Lakhs - ₹2 Crores',
            message: ''
        });
        setKvaRequirement(500);
        setCableDistance(2);
        setHasSubstation(true);
        closeQuote();
    };

    return (
        <div
            id="quote-modal-overlay"
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in"
            onClick={resetState}
        >
            <div
                id="quote-modal-container"
                className="relative w-full sm:max-w-2xl bg-white shadow-2xl rounded-t-2xl sm:rounded-2xl border-t sm:border border-slate-100 max-h-[96dvh] sm:max-h-[90dvh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header Block */}
                {/* Mobile drag handle */}
                <div className="sm:hidden flex justify-center pt-2.5 shrink-0 bg-skyline-dark rounded-t-2xl">
                    <div className="w-10 h-1 bg-slate-600 rounded-full" />
                </div>

                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-skyline-dark text-white shrink-0">
                    <div className="min-w-0 pr-4">
                        <h3 className="font-heading text-sm sm:text-xl font-bold tracking-tight leading-tight">Request an Electrical EPC Quote</h3>
                        <p className="mt-0.5 text-[10px] sm:text-xs text-slate-300">Skyline Engineering Estimator & RFQ Portal</p>
                    </div>
                    <button
                        id="close-quote-modal-btn"
                        onClick={resetState}
                        className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
                        aria-label="Close quote modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Step Indicators */}
                {!isSubmitted && (
                    <div className="flex items-center justify-between bg-slate-50 px-6 py-3 border-b border-slate-100">
                        <span className="text-xs font-mono font-medium text-slate-500">STEP {step} OF 3</span>
                        <div className="flex items-center space-x-2">
                            <div className={`w-6 h-1 rounded-full ${step >= 1 ? 'bg-skyline-blue' : 'bg-slate-200'}`}></div>
                            <div className={`w-6 h-1 rounded-full ${step >= 2 ? 'bg-skyline-blue' : 'bg-slate-200'}`}></div>
                            <div className={`w-6 h-1 rounded-full ${step >= 3 ? 'bg-skyline-blue' : 'bg-slate-200'}`}></div>
                        </div>
                    </div>
                )}

                {/* Form Body */}
                {isSubmitted ? (
                    <div className="p-5 sm:p-8 text-center flex flex-col items-center justify-center space-y-4 overflow-y-auto flex-1">
                        <div className="p-4 bg-emerald-50 rounded-full animate-bounce">
                            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-slate-900">RFQ Registered Successfully!</h3>
                        <p className="max-w-md text-sm text-slate-600 leading-relaxed">
                            Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. Your structured electrical RFP dossier has been lodged with our engineering Estimations Desk.
                        </p>

                        <div className="w-full max-w-md p-4 bg-slate-50 border border-slate-200 rounded-lg text-left text-xs font-mono space-y-2 mt-4">
                            <div className="flex justify-between border-b border-dashed border-slate-200 pb-1 text-slate-500">
                                <span>Dossier Reference ID:</span>
                                <span className="font-bold text-slate-700">SKL-{Math.floor(100000 + Math.random() * 900000)}</span>
                            </div>
                            <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
                                <span className="text-slate-500">Client / Company:</span>
                                <span className="font-medium text-slate-700">{formData.companyName || 'Private Enterprise'}</span>
                            </div>
                            <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
                                <span className="text-slate-500">Project Specialty:</span>
                                <span className="font-medium text-slate-700">{formData.projectType}</span>
                            </div>
                            <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
                                <span className="text-slate-500">Target Estimate (Ballpark):</span>
                                <span className="font-bold text-skyline-blue">{calculateEstimate()}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2 text-center leading-normal">
                                Our Senior Technical Estimator will contact you within 4 hours with an official response.
                            </p>
                        </div>

                        <button
                            id="quote-success-ok-btn"
                            onClick={resetState}
                            className="mt-6 px-6 py-2.5 bg-skyline-dark text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition shadow-md"
                        >
                            Done & Return
                        </button>
                    </div>
                ) : (
                    <form id="quote-estimation-form" onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto flex-1">
                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2 text-skyline-blue mb-2">
                                    <Calculator className="w-5 h-5" />
                                    <span className="font-mono text-xs font-bold uppercase tracking-wider">Dynamic EPC Cost Estimator</span>
                                </div>
                                <p className="text-xs text-slate-500 leading-normal">
                                    Configure rough operational parameters below to generate an instantaneous engineering assessment of material and mobilization.
                                </p>

                                <div className="space-y-4 pt-2">
                                    {/* Scope Selection */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Project Classification</label>
                                        <select
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue outline-none"
                                        >
                                            <option value="HT Works">HT Substations & 11/33/66KV Laying (High Tension)</option>
                                            <option value="LT Works">LT Switchgear & Commercial Distribution (Low Tension)</option>
                                            <option value="Electrical Infrastructure">Industrial SEZ Grid / Metro Electrification</option>
                                            <option value="Lighting Systems">Highway, Airport or Smart Stadium LED Systems</option>
                                            <option value="SCADA & Automation">Substation PLC Automation / SCADA Integration</option>
                                        </select>
                                    </div>

                                    {/* KVA Load Slider */}
                                    <div>
                                        <div className="flex justify-between text-xs font-semibold text-slate-700 label uppercase tracking-wider mb-1">
                                            <span>Electrical Load Requirement</span>
                                            <span className="text-skyline-blue font-mono">{kvaRequirement} kVA</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="50"
                                            max="10000"
                                            step="50"
                                            value={kvaRequirement}
                                            onChange={(e) => setKvaRequirement(parseInt(e.target.value))}
                                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-skyline-blue"
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                                            <span>50 kVA</span>
                                            <span className="hidden sm:inline">5,000 kVA</span>
                                            <span>10,000 kVA</span>
                                        </div>
                                    </div>

                                    {/* Distance Slider */}
                                    <div>
                                        <div className="flex justify-between text-xs font-semibold text-slate-700 label uppercase tracking-wider mb-1">
                                            <span>Overhead / Underground Cabling Line distance</span>
                                            <span className="text-skyline-blue font-mono">{cableDistance} km</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="30"
                                            step="0.5"
                                            value={cableDistance}
                                            onChange={(e) => setCableDistance(parseFloat(e.target.value))}
                                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-skyline-blue"
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                                            <span>0.5 km</span>
                                            <span className="hidden sm:inline">15 km</span>
                                            <span>30 km</span>
                                        </div>
                                    </div>

                                    {/* Switch Option */}
                                    <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                                        <div>
                                            <h4 className="text-xs font-semibold text-slate-800">Erect New Step-Down Substation?</h4>
                                            <p className="text-[11px] text-slate-400">Includes transformer, high-mast switchgear panels and breaker setups.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={hasSubstation}
                                                onChange={(e) => setHasSubstation(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-skyline-blue"></div>
                                        </label>
                                    </div>

                                    {/* Instant Pricing Estimate Badge */}
                                    <div className="p-4 bg-skyline-dark/5 border border-skyline-blue/20 rounded-xl flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Ballpark Electrical EPC Estimate</span>
                                            <p className="text-[11px] text-slate-400">Includes materials, freight and installation estimates</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-heading font-black text-skyline-blue">{calculateEstimate()}</p>
                                            <span className="text-[9px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-full">Subject to Site Audit</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        id="quote-modal-step1-next"
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="flex items-center space-x-1 px-5 py-2.5 bg-skyline-blue text-white rounded-lg text-xs font-semibold hover:bg-skyline-blue-hover transition min-h-[44px]"
                                    >
                                        <span>Proceed to Contacts</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <span className="font-mono text-xs font-bold text-skyline-blue uppercase tracking-wider">Contact & Stakeholder Information</span>
                                <p className="text-xs text-slate-500">Provide company credentials to associate with this estimated workload report.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Company Registered Name</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Larsen Engineering Pvt Ltd"
                                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Contact Officer Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Rohit Sharma"
                                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Business Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="e.g. r.sharma@larsen.in"
                                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Contact Number (Mobile / Landline)</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="e.g. +91 98765 43210"
                                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Standard Tender Budget Allocations</label>
                                    <select
                                        name="budgetRange"
                                        value={formData.budgetRange}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue outline-none"
                                    >
                                        <option value="Under ₹50 Lakhs">Under ₹50 Lakhs</option>
                                        <option value="₹50 Lakhs - ₹2 Crores">₹50 Lakhs - ₹2 Crores</option>
                                        <option value="₹2 Crores - ₹10 Crores">₹2 Crores - ₹10 Crores</option>
                                        <option value="Above ₹10 Crores">Above ₹10 Crores</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                    <button
                                        id="quote-modal-step2-back"
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex items-center space-x-1 px-4 py-2.5 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-medium min-h-[44px]"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        <span>Back</span>
                                    </button>
                                    <button
                                        id="quote-modal-step2-next"
                                        type="button"
                                        onClick={() => setStep(3)}
                                        disabled={!formData.fullName || !formData.companyName || !formData.email || !formData.phone}
                                        className="flex items-center space-x-1 px-5 py-2 bg-skyline-blue text-white rounded-lg text-xs font-semibold hover:bg-skyline-blue-hover transition disabled:opacity-50"
                                    >
                                        <span>Additional Detail Requirements</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <span className="font-mono text-xs font-bold text-skyline-blue uppercase tracking-wider">Project Specification / Notes</span>
                                <p className="text-xs text-slate-500">Provide detail notes regarding commissioning timelines, location, or existing substation configurations to help our estimators.</p>

                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Technical Brief / Additional Directives</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Provide details such as site location coordinates, physical constraints, expected completion milestones..."
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue outline-none resize-none"
                                    ></textarea>
                                </div>

                                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-start space-x-3">
                                    <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h5 className="text-xs font-semibold text-indigo-900">Confidentiality Guarantee</h5>
                                        <p className="text-[11px] text-indigo-700 leading-relaxed">
                                            Skyline Electronetworks handles all industrial tenders, design schematics, and client telemetry with elite NDAs and strict ISO/IEC security governance.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                    <button
                                        id="quote-modal-step3-back"
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="flex items-center space-x-1 px-4 py-2.5 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-medium min-h-[44px]"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        <span>Back</span>
                                    </button>
                                    <button
                                        id="submit-quote-request-btn"
                                        type="submit"
                                        className="flex items-center space-x-2 px-6 py-2 bg-skyline-orange text-white rounded-lg text-xs font-bold hover:bg-skyline-orange-hover transition shadow-md"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span>Generate & Submit RFP</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}
