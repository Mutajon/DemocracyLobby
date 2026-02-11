
import { useLangs } from "@/hooks/useLangs";
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CreditsModal } from "./CreditsModal";

interface SplashScreenProps {
    onNavigate: (panel: "about" | "game" | "source") => void;
}

export function SplashScreen({ onNavigate }: SplashScreenProps) {
    const { t, language, setLanguage } = useLangs();
    const [showConsent, setShowConsent] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showCredits, setShowCredits] = useState(false);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'he' : 'en');
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex flex-col items-center">
            {/* Background Image */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("/background2.webp")' }}
            />
            {/* Background Overlay */}
            <div className="fixed inset-0 z-1 backdrop-blur-[2px] bg-black/40" />

            {/* Main content container */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 md:py-20 max-w-4xl mx-auto text-center min-h-screen">

                {/* Animated Logo Faces */}
                <div className="relative w-full mb-4 flex items-center justify-center">
                    <img
                        src="/logoFaces.webp"
                        alt=""
                        className="w-full max-w-[200px] md:max-w-[300px] lg:max-w-[400px] h-auto object-contain animate-float-simple"
                        style={{
                            filter: 'drop-shadow(0 0 30px rgba(147, 51, 234, 0.4))'
                        }}
                    />
                </div>

                {/* Title Logo */}
                <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <img
                        src="/titleLogoText.webp"
                        alt="aMAZE'n"
                        className="w-64 md:w-80 lg:w-96 h-auto mx-auto"
                        style={{
                            filter: 'drop-shadow(0 0 30px rgba(234, 179, 8, 0.6))'
                        }}
                    />
                </div>

                {/* Subtitle with gradient */}
                <h2
                    className="text-xl md:text-2xl lg:text-3xl font-serif font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in-up"
                    style={{
                        animationDelay: '0.6s',
                        backgroundSize: '200% auto'
                    }}
                >
                    {t("splash.subtitle")}
                </h2>

                {/* Description */}
                <p
                    className="text-base md:text-lg lg:text-xl text-foreground/80 max-w-2xl mb-4 leading-relaxed font-sans animate-fade-in-up"
                    style={{
                        animationDelay: '0.9s',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    {t("splash.description")}
                </p>

                {/* Language Toggle Button */}
                <button
                    onClick={toggleLanguage}
                    className="mb-8 px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-all duration-300 hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: '1s' }}
                >
                    {language === 'en' ? 'עברית' : 'English'}
                </button>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center w-full animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                    {/* About Button */}
                    <button
                        onClick={() => onNavigate("about")}
                        className="group relative px-8 py-4 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 bg-white/5 backdrop-blur-md border-2 border-primary/30 text-foreground hover:border-primary hover:bg-primary/10 hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] w-full sm:w-auto"
                    >
                        <span className="relative z-10">{t("splash.buttons.about")}</span>
                    </button>

                    {/* Play Button - Primary */}
                    <button
                        onClick={() => setShowConsent(true)}
                        className="group relative px-10 py-5 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary hover:to-secondary hover:scale-110 hover:shadow-[0_0_40px_rgba(234,179,8,0.6)] border-2 border-primary/50 hover:border-secondary w-full sm:w-auto"
                    >
                        <span className="relative z-10">{t("splash.buttons.play")}</span>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary/0 to-secondary/0 group-hover:from-secondary/20 group-hover:to-secondary/20 transition-all duration-300" />
                    </button>

                    {/* Source Button */}
                    <button
                        onClick={() => onNavigate("source")}
                        className="group relative px-8 py-4 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 bg-white/5 backdrop-blur-md border-2 border-secondary/30 text-foreground hover:border-secondary hover:bg-secondary/10 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] w-full sm:w-auto"
                    >
                        <span className="relative z-10">{t("splash.buttons.source")}</span>
                    </button>
                </div>

                {/* Credits Button */}
                <button
                    onClick={() => setShowCredits(true)}
                    className="mt-12 mb-8 text-sm text-foreground/50 hover:text-secondary underline decoration-secondary/30 hover:decoration-secondary transition-all animate-fade-in-up"
                    style={{ animationDelay: '1.4s' }}
                >
                    {t("splash.buttons.credits")}
                </button>
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
                            {t("sidebar.title") === 'aMAZE’n' ? <ArrowLeft size={24} /> : <ArrowRight size={24} />}
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

            {/* Credits Modal */}
            {showCredits && (
                <CreditsModal onClose={() => setShowCredits(false)} />
            )}
        </div>
    );
}
