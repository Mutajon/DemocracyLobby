
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
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-200",
                    "bg-slate-50 border border-slate-200 text-slate-700",
                    "hover:bg-slate-100 hover:border-slate-300",
                    isOpen && "ring-2 ring-blue-100 border-blue-400"
                )}
                title={t("sidebar.menu.language")}
            >
                <div className="w-4 h-4 flex items-center justify-center text-slate-500">
                    <Globe className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold w-4 text-center">{currentLabel}</span>
                <ChevronDown className={cn("w-3 h-3 text-slate-400 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-50 mb-1">
                        Select Language
                    </div>
                    <button
                        onClick={() => handleSelect("en")}
                        className={cn(
                            "w-full px-3 py-2 text-sm text-left flex items-center justify-between hover:bg-slate-50 transition-colors",
                            language === "en" ? "text-blue-600 font-medium" : "text-slate-600"
                        )}
                    >
                        <span>English</span>
                        {language === "en" && <Check className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => handleSelect("he")}
                        className={cn(
                            "w-full px-3 py-2 text-sm text-left flex items-center justify-between hover:bg-slate-50 transition-colors",
                            language === "he" ? "text-blue-600 font-medium" : "text-slate-600"
                        )}
                    >
                        <span>עברית</span>
                        {language === "he" && <Check className="w-4 h-4" />}
                    </button>
                </div>
            )}
        </div>
    );
}
