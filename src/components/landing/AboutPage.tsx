
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { useLangs } from "@/hooks/useLangs";
import { GeometricReveal } from "./GeometricReveal";

interface AboutPageProps {
    onBack: () => void;
    onNavigate: (page: "source") => void;
}

const PEOPLE_KEYS = ['uriel', 'ori', 'jonathan', 'joachim', 'ido', 'dafna', 'daria'];

export function AboutPage({ onBack, onNavigate }: AboutPageProps) {
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

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-20">
                        {/* Left Column: Text Content */}
                        <div className="flex-1 space-y-10 text-foreground/90 leading-relaxed text-xl md:text-2xl [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                            <p>{t("panels.about.p1")}</p>
                            <p>{t("panels.about.p2")}</p>

                            <div className="pt-8 pb-12 space-y-6">
                                <p>
                                    {t("panels.about.p3")}
                                    <button
                                        onClick={() => setShowConsent(true)}
                                        className="text-secondary hover:text-primary font-bold underline transition-colors decoration-secondary/30 underline-offset-4"
                                    >
                                        {t("panels.about.p3_link")}
                                    </button>
                                </p>

                                <p className="text-lg md:text-xl opacity-90">
                                    {t("panels.about.p4")}
                                    <button
                                        onClick={() => onNavigate("source")}
                                        className="text-secondary hover:text-primary font-bold underline transition-colors decoration-secondary/30 underline-offset-4"
                                    >
                                        {t("panels.about.p4_link")}
                                    </button>
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Image Carousel */}
                        <div className="w-full lg:w-[480px] xl:w-[560px] flex-shrink-0 mx-auto lg:mx-0 pb-12 lg:pb-0 lg:sticky lg:top-0">
                            <GeometricReveal />
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="pt-16 border-t border-white/10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-secondary drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                                {t("panels.about.team_title")}
                            </h2>
                            <div className="flex items-center gap-3 text-slate-300 hover:text-primary transition-colors bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md w-fit">
                                <Mail size={20} />
                                <a href="mailto:jonathanbd@gmail.com" className="font-bold text-lg hover:underline">
                                    jonathanbd@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 mb-16">
                            {PEOPLE_KEYS.map((key) => (
                                <div key={key} className="flex flex-col items-center text-center group">
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-xl mb-6 group-hover:scale-105 group-hover:border-primary/50 transition-all duration-300">
                                        <img
                                            src={`/credits/${key}.jpg`}
                                            alt={t(`splash.credits.people.${key}.name`)}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {t(`splash.credits.people.${key}.name`)}
                                    </h3>
                                    <p className="text-base text-slate-400 leading-relaxed max-w-xs">
                                        {t(`splash.credits.people.${key}.role`)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Funding Section */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-10 px-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                            <img
                                src="/pumby.png"
                                alt="PUMBY Logo"
                                className="h-20 sm:h-24 w-auto rounded-2xl shadow-lg border border-white/10"
                            />
                            <p className="text-xl md:text-2xl text-slate-300 font-medium text-center sm:text-start leading-relaxed">
                                {t("panels.about.funding")}
                                <a
                                    href="https://pumby.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-secondary hover:text-primary font-bold underline underline-offset-4 decoration-secondary/30 transition-colors"
                                >
                                    {t("panels.about.funding_link")}
                                </a>
                            </p>
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
                                    window.location.href = 'https://amazenpolitics.vercel.app/#/lobby';
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
