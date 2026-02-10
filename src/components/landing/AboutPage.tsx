
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLangs } from "@/hooks/useLangs";
import { GeometricReveal } from "./GeometricReveal";

interface AboutPageProps {
    onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
    const { t, dir } = useLangs();
    const [showConsent, setShowConsent] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("/aboutBKG.webp")' }}
            />
            {/* Background Overlay */}
            <div className="absolute inset-0 z-1 backdrop-blur-[2px] bg-black/60" />

            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute top-8 left-8 z-20 p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-all hover:scale-110 flex items-center gap-2 group"
                aria-label="Go back"
            >
                {dir === 'rtl' ? <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" /> : <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />}
                <span className="font-bold text-sm tracking-widest uppercase px-2">{t("general.back")}</span>
            </button>

            {/* Content Area */}
            <div className="relative z-10 w-full max-w-[90rem] max-h-[90vh] overflow-y-auto px-8 md:px-16 py-12 scrollbar-hide mx-auto">
                <div className="w-full mx-auto animate-fade-in-up md:pt-10">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black text-secondary mb-12 border-b border-white/10 pb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                        {t("panels.about.title")}
                    </h2>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                        {/* Left Column: Text Content */}
                        <div className="flex-1 space-y-10 text-foreground/90 leading-relaxed text-xl md:text-2xl [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                            <p>{t("panels.about.p1")}</p>
                            <p>{t("panels.about.p2")}</p>

                            <div className="pt-8 pb-12 text-center sm:text-start">
                                <p className="mb-8">{t("panels.about.p3")}</p>

                                <button
                                    onClick={() => setShowConsent(true)}
                                    className="group relative px-10 py-5 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary hover:to-secondary hover:scale-110 hover:shadow-[0_0_40px_rgba(234,179,8,0.6)] border-2 border-primary/50 hover:border-secondary w-full sm:w-auto"
                                >
                                    <span className="relative z-10">{t("splash.buttons.play")}</span>
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary/0 to-secondary/0 group-hover:from-secondary/20 group-hover:to-secondary/20 transition-all duration-300" />
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Image Carousel */}
                        <div className="w-full lg:w-[480px] xl:w-[560px] flex-shrink-0 mx-auto lg:mx-0 pb-12 lg:pb-0 lg:sticky lg:top-0">
                            <GeometricReveal />
                        </div>
                    </div>
                </div>
            </div>

            {/* Consent Modal */}
            {showConsent && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
                    onClick={() => setShowConsent(false)}
                >
                    <div
                        className="bg-slate-900 border border-slate-700 p-8 rounded-2xl max-w-md text-center shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold text-white mb-6 leading-relaxed">
                            {t("splash.consent.text")}
                        </h3>
                        <div className="flex gap-4 justification-center">
                            <button
                                onClick={() => setShowMoreInfo(true)}
                                className="flex-1 px-6 py-3 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                {t("splash.consent.more_info")}
                            </button>
                            <button
                                onClick={() => {
                                    window.location.href = 'https://amazen-politics.onrender.com/#/lobby';
                                }}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                                {t("splash.consent.button")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* More Info Modal */}
            {showMoreInfo && (
                <div
                    className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
                    onClick={() => setShowMoreInfo(false)}
                >
                    <div
                        className="bg-slate-900 border border-slate-700 p-8 pt-10 rounded-2xl max-w-lg shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowMoreInfo(false)}
                            className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white transition-colors"
                            aria-label="Go back"
                        >
                            {dir === 'rtl' ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
                        </button>
                        <h3 className="text-2xl font-serif font-bold text-secondary mb-6 flex items-center gap-3">
                            <span>{t("splash.consent.more_info")}</span>
                        </h3>
                        <p className="text-slate-300 leading-relaxed mb-4 text-lg">
                            {t("splash.consent.info_details")}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
