
import { useLangs } from "@/hooks/useLangs";

export function AboutPanel() {
    const { t } = useLangs();
    return (
        <div className="space-y-8 h-full flex flex-col justify-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                    {t("panels.about.title")}
                </h2>
                <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                    <p>
                        <strong className="text-slate-900">{t("panels.about.p1_strong")}</strong> {t("panels.about.p1")}
                    </p>
                    <p>
                        {t("panels.about.p2")}
                    </p>
                    <p className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-900 text-base">
                        <strong>{t("panels.about.note_strong")}</strong> {t("panels.about.note")}
                    </p>
                </div>
            </div>
        </div>
    );
}
