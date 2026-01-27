
import { useState, useRef, useEffect } from "react";
import { useLangs } from "@/hooks/useLangs";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSelector() {
    const { language, setLanguage, t } = useLangs();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (lang: "en" | "he") => {
        setLanguage(lang);
        setIsOpen(false);
    };

    const currentLabel = language === "en" ? "EN" : "HE";

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300",
                    "bg-white/10 border border-white/20 text-foreground",
                    "hover:bg-white/20 hover:border-white/30 hover:scale-105 active:scale-95",
                    isOpen && "ring-2 ring-primary/50 border-primary"
                )}
                title={t("sidebar.menu.language")}
            >
                <div className="w-4 h-4 flex items-center justify-center text-secondary">
                    <Globe className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold w-5 text-center">{currentLabel}</span>
                <ChevronDown className={cn("w-3.5 h-3.5 text-foreground/40 transition-transform duration-300", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-3 w-40 bg-background/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top">
                    <div className="px-4 py-2.5 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] border-b border-white/5 mb-1 text-center">
                        Select Language
                    </div>
                    <button
                        onClick={() => handleSelect("en")}
                        className={cn(
                            "w-full px-4 py-3 text-sm text-left flex items-center justify-between hover:bg-white/5 transition-all duration-200",
                            language === "en" ? "text-secondary font-bold" : "text-foreground/70"
                        )}
                    >
                        <span>English</span>
                        {language === "en" && <Check className="w-4 h-4 shadow-[0_0_8px_currentColor]" />}
                    </button>
                    <button
                        onClick={() => handleSelect("he")}
                        className={cn(
                            "w-full px-4 py-3 text-sm text-right flex flex-row-reverse items-center justify-between hover:bg-white/5 transition-all duration-200",
                            language === "he" ? "text-secondary font-bold" : "text-foreground/70"
                        )}
                        dir="rtl"
                    >
                        <span>עברית</span>
                        {language === "he" && <Check className="w-4 h-4 shadow-[0_0_8px_currentColor]" />}
                    </button>
                </div>
            )}
        </div>
    );
}
