
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
                        <strong className="text-secondary font-black">{t("panels.about.p1_strong")}</strong> {t("panels.about.p1")}
                    </p>
                    <p className="font-medium">
                        {t("panels.about.p2")}
                    </p>
                    <div className="bg-primary/20 backdrop-blur-md p-6 rounded-2xl border border-primary/30 text-foreground text-lg shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-secondary shadow-[0_0_15px_#fbbf24] transition-all duration-300 group-hover:w-2" />
                        <p>
                            <strong className="text-secondary uppercase tracking-wider text-sm block mb-1">{t("panels.about.note_strong")}</strong>
                            {t("panels.about.note")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
