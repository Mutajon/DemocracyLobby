
import { Button } from "@/components/ui/button";
import { Download, FileText, Code } from "lucide-react";
import { useLangs } from "@/hooks/useLangs";

export function SourceCodePanel() {
    const { t } = useLangs();
    return (
        <div className="space-y-6 h-full flex flex-col justify-center max-w-3xl mx-auto">
            <div className="bg-transparent">
                <h2 className="text-4xl font-serif font-black text-secondary mb-4 drop-shadow-lg leading-tight">{t("panels.source.title")}</h2>
                <p className="text-foreground/60 mb-10 text-lg font-medium tracking-tight leading-relaxed">{t("panels.source.description")}</p>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-primary/20 backdrop-blur-xl p-8 rounded-3xl border border-primary/20 shadow-2xl group hover:bg-primary/30 transition-all duration-300">
                        <h3 className="text-xl font-black text-secondary mb-4 flex items-center gap-3">
                            <div className="p-2 bg-secondary/20 text-secondary rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                                <FileText className="w-5 h-5" />
                            </div>
                            {t("panels.source.methodology.title")}
                        </h3>
                        <p className="text-base text-foreground/70 mb-6 leading-relaxed">
                            {t("panels.source.methodology.description")}
                        </p>
                        <div className="text-xs font-mono text-secondary/60 bg-black/40 p-4 rounded-xl border border-white/5 tracking-wider uppercase">
                            {t("panels.source.methodology.license")}
                        </div>
                    </div>

                    <div className="bg-primary/40 backdrop-blur-2xl p-8 rounded-3xl border border-primary/30 shadow-2xl group hover:bg-primary/50 transition-all duration-300">
                        <h3 className="text-xl font-black text-secondary mb-4 flex items-center gap-3">
                            <div className="p-2 bg-secondary/20 text-secondary rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                                <Code className="w-5 h-5" />
                            </div>
                            {t("panels.source.academic.title")}
                        </h3>
                        <p className="text-base text-white/80 mb-0 leading-relaxed font-medium">
                            {t("panels.source.academic.description")}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Button
                        className="w-full bg-secondary hover:bg-secondary/90 text-background h-14 text-lg font-black rounded-2xl shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                        onClick={() => window.open("https://github.com/Mutajon/aMAZEn_Politics/archive/refs/heads/main.zip", "_blank")}
                    >
                        <Download className="mr-3 h-5 w-5" />
                        {t("panels.source.download_zip")}
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 text-foreground h-14 text-lg font-black rounded-2xl transition-all"
                        onClick={() => window.open("https://github.com/Mutajon/aMAZEn_Politics", "_blank")}
                    >
                        <Code className="mr-3 h-5 w-5 text-secondary" />
                        {t("panels.source.view_repo")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
