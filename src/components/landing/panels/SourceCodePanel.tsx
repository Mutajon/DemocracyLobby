
import { Button } from "@/components/ui/button";
import { Download, FileText, Code } from "lucide-react";
import { useLangs } from "@/hooks/useLangs";

export function SourceCodePanel() {
    const { t } = useLangs();
    return (
        <div className="space-y-6 h-full flex flex-col justify-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">{t("panels.source.title")}</h2>
                <p className="text-slate-500 mb-8">{t("panels.source.description")}</p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-500" />
                            {t("panels.source.methodology.title")}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                            {t("panels.source.methodology.description")}
                        </p>
                        <div className="text-xs font-mono text-slate-400 bg-white p-2 rounded border border-slate-200">
                            {t("panels.source.methodology.license")}
                        </div>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                        <h3 className="font-semibold text-orange-900 mb-2">{t("panels.source.academic.title")}</h3>
                        <p className="text-sm text-orange-800/80 mb-0 leading-relaxed">
                            {t("panels.source.academic.description")}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-base rounded-lg shadow-sm"
                        onClick={() => window.open("https://github.com/Mutajon/aMAZEn_Politics/archive/refs/heads/main.zip", "_blank")}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        {t("panels.source.download_zip")}
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full border-slate-200 hover:bg-slate-50 text-slate-700 h-12 text-base rounded-lg"
                        onClick={() => window.open("https://github.com/Mutajon/aMAZEn_Politics", "_blank")}
                    >
                        <Code className="mr-2 h-4 w-4" />
                        {t("panels.source.view_repo")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
