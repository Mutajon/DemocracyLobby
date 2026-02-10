
import { X, Mail } from "lucide-react";
import { useLangs } from "@/hooks/useLangs";

interface CreditsModalProps {
    onClose: () => void;
}

const PEOPLE_KEYS = ['uriel', 'ori', 'jonathan', 'joachim', 'ido', 'dafna', 'daria'];

export function CreditsModal({ onClose }: CreditsModalProps) {
    const { t } = useLangs();

    return (
        <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-slate-900 border border-slate-700 p-8 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-20"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">
                        {t("splash.credits.title")}
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-slate-400 hover:text-primary transition-colors">
                        <Mail size={18} />
                        <a href="mailto:jonathanbd@gmail.com" className="hover:underline">
                            jonathanbd@gmail.com
                        </a>
                    </div>
                </div>

                {/* People Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {PEOPLE_KEYS.map((key) => (
                        <div key={key} className="flex flex-col items-center text-center group">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-lg mb-4 group-hover:scale-105 group-hover:border-primary/50 transition-all duration-300">
                                <img
                                    src={`/credits/${key}.jpg`}
                                    alt={t(`splash.credits.people.${key}.name`)}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                {t(`splash.credits.people.${key}.name`)}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                                {t(`splash.credits.people.${key}.role`)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer Logo/Copyright optional */}
                <div className="mt-12 pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} {t("sidebar.footer.university")}</p>
                </div>
            </div>
        </div>
    );
}
