
import { cn } from "@/lib/utils";
import { Info, Code, Mail, GraduationCap } from "lucide-react";
import { useLangs } from "@/hooks/useLangs";

import { LanguageSelector } from "@/components/ui/LanguageSelector";

export type PanelType = "about" | "game" | "source" | "contact";

interface SidebarProps {
    activePanel: PanelType;
    onPanelChange: (panel: PanelType) => void;
}

export function Sidebar({ activePanel, onPanelChange }: SidebarProps) {
    const { t } = useLangs();

    const menuItems = [
        {
            id: "about" as PanelType,
            label: t("sidebar.menu.about"),
            icon: Info,
        },
        {
            id: "game" as PanelType,
            label: t("sidebar.menu.game"),
            icon: GraduationCap,
        },
        {
            id: "source" as PanelType,
            label: t("sidebar.menu.source"),
            icon: Code,
        },
        {
            id: "contact" as PanelType,
            label: t("sidebar.menu.contact"),
            icon: Mail,
        },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="p-10 bg-transparent flex flex-col items-center text-center gap-6">
                <LanguageSelector />
                <div>
                    <h1 className="text-3xl font-serif font-black text-secondary tracking-tight leading-none drop-shadow-lg">
                        {t("sidebar.title")}
                    </h1>
                    <span className="block text-xs font-sans font-bold text-foreground/60 mt-3 uppercase tracking-[0.2em]">
                        {t("sidebar.subtitle")}
                    </span>
                </div>
            </div>

            <nav className="flex flex-col gap-3 p-6 flex-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = activePanel === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onPanelChange(item.id)}
                            className={cn(
                                "group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-sm font-bold w-full text-start",
                                isActive
                                    ? "bg-white/10 text-secondary border border-white/20 shadow-[0_0_20px_rgba(251,191,36,0.1)] translate-x-1"
                                    : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                            )}
                        >
                            <div className={cn(
                                "p-2.5 rounded-xl transition-all duration-300 flex-shrink-0",
                                isActive
                                    ? "bg-secondary/20 text-secondary scale-110 rotate-3"
                                    : "bg-white/5 text-foreground/40 group-hover:text-secondary/70 group-hover:scale-105"
                            )}>
                                <item.icon className="w-5 h-5 transition-transform duration-300" />
                            </div>
                            <span className="tracking-wide">{item.label}</span>

                            {/* Active Indicator Line */}
                            {isActive && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#fbbf24]" />
                            )}
                        </button>
                    )
                })}
            </nav>

            <div className="p-8 bg-black/20 text-center backdrop-blur-md border-t border-white/5">
                <p className="text-[10px] text-foreground/40 uppercase tracking-[0.25em] font-bold">
                    {t("sidebar.footer.university")}
                </p>
                <p className="text-[11px] text-foreground/30 mt-2 font-medium">
                    {t("sidebar.footer.copyright").replace("{{year}}", new Date().getFullYear().toString())}
                </p>
            </div>
        </div>
    );
}
