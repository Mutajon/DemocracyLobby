
import { Button } from "@/components/ui/button";
import { Download, Code, ArrowLeft, ArrowRight, GraduationCap } from "lucide-react";
import { useLangs } from "@/hooks/useLangs";

interface SourceCodePageProps {
    onBack: () => void;
}

export function SourceCodePage({ onBack }: SourceCodePageProps) {
    const { t, dir } = useLangs();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("/codeBKG.webp")' }}
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
            <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto px-6 py-12 scrollbar-hide">
                <div className="max-w-3xl mx-auto animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black text-secondary mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] leading-tight text-center sm:text-start">
                        {t("panels.source.title")}
                    </h2>
                    <p className="text-foreground/90 mb-12 text-lg md:text-xl font-medium tracking-tight leading-relaxed [text-shadow:0_2px_10px_rgba(0,0,0,0.5)] text-center sm:text-start">
                        {t("panels.source.description")}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-primary/20 backdrop-blur-xl p-8 rounded-3xl border border-primary/20 shadow-2xl group hover:bg-primary/30 transition-all duration-300">
                            <h3 className="text-xl font-black text-secondary mb-4 flex items-center gap-3">
                                <div className="p-2 bg-secondary/20 text-secondary rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                {t("panels.source.methodology.title")}
                            </h3>
                            <p className="text-base text-foreground/90 mb-0 leading-relaxed">
                                {t("panels.source.methodology.description")}
                            </p>
                        </div>

                        <div className="bg-primary/40 backdrop-blur-2xl p-8 rounded-3xl border border-primary/30 shadow-2xl group hover:bg-primary/50 transition-all duration-300">
                            <h3 className="text-xl font-black text-secondary mb-4 flex items-center gap-3">
                                <div className="p-2 bg-secondary/20 text-secondary rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                                    <Code className="w-5 h-5" />
                                </div>
                                {t("panels.source.academic.title")}
                            </h3>
                            <p className="text-base text-white/90 mb-0 leading-relaxed font-medium">
                                {t("panels.source.academic.description")}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Button
                            className="flex-1 bg-secondary hover:bg-secondary/90 text-background h-16 text-xl font-black rounded-2xl shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                            onClick={() => window.open("https://github.com/Mutajon/aMAZEn_Politics/archive/refs/heads/main.zip", "_blank")}
                        >
                            <Download className="mr-3 h-6 w-6" />
                            {t("panels.source.download_zip")}
                        </Button>

                        <Button
                            variant="outline"
                            className="flex-1 border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 text-foreground h-16 text-xl font-black rounded-2xl transition-all hover:scale-[1.02]"
                            onClick={() => window.open("https://github.com/Mutajon/aMAZEn_Politics", "_blank")}
                        >
                            <Code className="mr-3 h-6 w-6 text-secondary" />
                            {t("panels.source.view_repo")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
