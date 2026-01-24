
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FlaskConical } from "lucide-react";
import { useLangs } from "@/hooks/useLangs";
import { cn } from "@/lib/utils";

// Placeholder implementation of a game redirect
const GAME_URL = "https://amazen-politics.onrender.com/#/lobby";

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
            <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200 min-h-[450px] flex flex-col">

                {/* Step 1: Intro */}
                {step === "intro" && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col h-full justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
                                <FlaskConical className="w-4 h-4" />
                                {t("panels.game.intro.badge")}
                            </div>
                            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">
                                {t("panels.game.intro.title")}
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                {t("panels.game.intro.description")}
                            </p>
                            <div className="flex items-center gap-2 text-slate-500 mb-8 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                                <span className="text-sm font-medium">{t("panels.game.intro.duration")}</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleInitialPlay}
                            className="w-full bg-blue-900 hover:bg-blue-800 text-white h-14 text-lg rounded-lg shadow-sm transition-all"
                        >
                            {t("panels.game.intro.button")}
                            <ArrowRight className={cn("ml-2 w-5 h-5 transition-transform", dir === "rtl" && "rotate-180 mr-2 ml-0")} />
                        </Button>
                    </div>
                )}

                {/* Step 2: Terms */}
                {step === "terms" && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col h-full justify-between">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">{t("panels.game.terms.title")}</h2>
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8 max-h-60 overflow-y-auto">
                                <p className="text-slate-700 font-medium mb-3">{t("panels.game.terms.statement")}</p>
                                <ul className="list-disc list-inside space-y-3 text-slate-600 text-sm">
                                    <li>{t("panels.game.terms.list.l1")}</li>
                                    <li>{t("panels.game.terms.list.l2")}</li>
                                    <li>{t("panels.game.terms.list.l3")}</li>
                                    <li>{t("panels.game.terms.list.l4")}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={handleFinalPlay}
                                className="w-full bg-teal-700 hover:bg-teal-600 text-white h-14 text-lg rounded-lg shadow-sm transition-all"
                            >
                                {t("panels.game.terms.agree_button")}
                            </Button>
                            <button
                                onClick={() => setStep("intro")}
                                className="text-slate-400 text-sm hover:text-slate-600 hover:underline"
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
