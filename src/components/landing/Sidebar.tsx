
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
        <div className="flex flex-col h-full bg-slate-50/50">
            <div className="p-8 border-b border-slate-100 bg-white flex justify-between items-start gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight leading-none">
                        {t("sidebar.title")}
                        <span className="block text-sm font-sans font-medium text-slate-500 mt-1 uppercase tracking-wider">
                            {t("sidebar.subtitle")}
                        </span>
                    </h1>
                </div>
                <LanguageSelector />
            </div>

            <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = activePanel === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onPanelChange(item.id)}
                            className={cn(
                                "group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-sm font-medium w-full text-start",
                                isActive
                                    ? "bg-white text-blue-900 shadow-sm border border-slate-200"
                                    : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-md transition-colors flex-shrink-0",
                                isActive ? "bg-blue-50 text-blue-700" : "bg-transparent text-slate-400 group-hover:text-slate-600"
                            )}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <span>{item.label}</span>

                            {/* Active Indicator Line */}
                            {isActive && (
                                <div className="ml-auto w-1 h-1.5 rounded-full bg-blue-600" />
                            )}
                        </button>
                    )
                })}
            </nav>

            <div className="p-6 border-t border-slate-100 bg-white text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                    {t("sidebar.footer.university")}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                    {t("sidebar.footer.copyright").replace("{{year}}", new Date().getFullYear().toString())}
                </p>
            </div>
        </div>
    );
}
