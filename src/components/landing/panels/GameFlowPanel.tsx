
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FlaskConical } from "lucide-react";
import { useLangs } from "@/hooks/useLangs";
import { cn } from "@/lib/utils";

// Placeholder implementation of a game redirect
const GAME_URL = "https://amazenpolitics.vercel.app/#/lobby";

export function GameFlowPanel() {
    const { t, dir } = useLangs();
    const [step, setStep] = useState<"intro" | "terms">("intro");

    const handleInitialPlay = () => {
        setStep("terms");
    };

    const handleFinalPlay = () => {
        // Redirect to the game
        window.location.href = GAME_URL;
    };

    return (
        <div className="h-full flex flex-col justify-center max-w-3xl mx-auto">
            <div className="bg-transparent flex flex-col">

                {/* Step 1: Intro */}
                {step === "intro" && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col h-full justify-between gap-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-xs font-black uppercase tracking-[0.2em] mb-8 border border-secondary/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                                <FlaskConical className="w-4 h-4" />
                                {t("panels.game.intro.badge")}
                            </div>
                            <h2 className="text-4xl font-serif font-black text-secondary mb-8 drop-shadow-lg leading-tight">
                                {t("panels.game.intro.title")}
                            </h2>
                            <p className="text-foreground/80 text-xl leading-relaxed mb-10 font-medium">
                                {t("panels.game.intro.description")}
                            </p>
                            <div className="flex items-center gap-4 text-foreground/90 mb-8 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
                                <div className="p-3 rounded-xl bg-secondary/20 text-secondary">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <span className="text-lg font-bold tracking-tight">{t("panels.game.intro.duration")}</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleInitialPlay}
                            className="w-full bg-secondary hover:bg-secondary/90 text-background h-16 text-xl font-black rounded-2xl shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] group"
                        >
                            {t("panels.game.intro.button")}
                            <ArrowRight className={cn("ml-3 w-6 h-6 transition-transform group-hover:translate-x-1", dir === "rtl" && "rotate-180 mr-3 ml-0 group-hover:-translate-x-1")} />
                        </Button>
                    </div>
                )}

                {/* Step 2: Terms */}
                {step === "terms" && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col h-full justify-between gap-8">
                        <div>
                            <h2 className="text-4xl font-serif font-black text-secondary mb-8 drop-shadow-lg leading-tight">
                                {t("panels.game.terms.title")}
                            </h2>
                            <div className="bg-black/20 backdrop-blur-md p-8 rounded-3xl border border-white/10 mb-10 shadow-2xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                                <p className="text-foreground font-black text-lg mb-6 tracking-tight relative z-10">{t("panels.game.terms.statement")}</p>
                                <ul className="space-y-4 text-foreground/70 text-base font-medium relative z-10">
                                    {["l1", "l2", "l3", "l4"].map((key) => (
                                        <li key={key} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shadow-[0_0_8px_#fbbf24] shrink-0" />
                                            <span>{t(`panels.game.terms.list.${key}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Button
                                onClick={handleFinalPlay}
                                className="w-full bg-secondary hover:bg-secondary/90 text-background h-16 text-xl font-black rounded-2xl shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {t("panels.game.terms.agree_button")}
                            </Button>
                            <button
                                onClick={() => setStep("intro")}
                                className="text-foreground/40 text-sm font-bold hover:text-secondary uppercase tracking-widest transition-colors py-2"
                            >
                                {t("panels.game.terms.cancel_button")}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
