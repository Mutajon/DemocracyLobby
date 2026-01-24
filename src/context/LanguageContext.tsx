
import { createContext, useState, type ReactNode, useEffect } from "react";
import en from "../locales/en.json";
import he from "../locales/he.json";

export type Language = "en" | "he";
export type Direction = "ltr" | "rtl";

type Translations = typeof en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    dir: Direction;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
    en,
    he,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem("language");
        return (saved === "en" || saved === "he") ? saved : "en";
    });

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    // Helper to access nested keys like "panels.about.title"
    const t = (key: string): string => {
        const keys = key.split(".");
        let value: any = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k as keyof typeof value];
            } else {
                console.warn(`Missing translation for key: ${key} in language: ${language}`);
                return key;
            }
        }

        return typeof value === "string" ? value : key;
    };

    const dir: Direction = language === "he" ? "rtl" : "ltr";

    useEffect(() => {
        document.documentElement.dir = dir;
        document.documentElement.lang = language;
    }, [dir, language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
            {children}
        </LanguageContext.Provider>
    );
}
