
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export function useLangs() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLangs must be used within a LanguageProvider");
    }
    return context;
}
