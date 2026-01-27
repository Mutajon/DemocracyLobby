
import { useLangs } from "@/hooks/useLangs";

export function AboutPanel() {
    const { t } = useLangs();
    return (
        <div className="space-y-8 h-full flex flex-col justify-center max-w-3xl mx-auto">
            <div className="bg-transparent">
                <h2 className="text-4xl font-serif font-black text-secondary mb-8 border-b border-white/10 pb-6 drop-shadow-lg">
                    {t("panels.about.title")}
                </h2>
                <div className="space-y-8 text-foreground/80 leading-relaxed text-xl">
                    <p>
                        <strong className="text-secondary font-black drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">{t("panels.about.p1_strong")}</strong> {t("panels.about.p1")}
                    </p>
                    <p className="font-medium">
                        {t("panels.about.p2")}
                    </p>
                    <div className="bg-primary/20 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 text-foreground text-lg shadow-2xl relative overflow-hidden group transition-all duration-500 hover:scale-[1.01]">
                        <div className="absolute top-0 left-0 w-2 h-full bg-secondary shadow-[0_0_20px_#fbbf24]" />
                        <p>
                            <strong className="text-secondary uppercase tracking-[0.2em] font-black text-sm block mb-2">{t("panels.about.note_strong")}</strong>
                            {t("panels.about.note")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
