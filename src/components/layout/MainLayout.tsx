import { type ReactNode } from "react";
import { useLangs } from "@/hooks/useLangs";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
    sidebar: ReactNode;
    children: ReactNode;
    isMobileMenuOpen?: boolean;
    setIsMobileMenuOpen?: (isOpen: boolean) => void;
}

export function MainLayout({ sidebar, children, isMobileMenuOpen, setIsMobileMenuOpen }: MainLayoutProps) {
    const { dir, t } = useLangs();

    return (
        <div
            dir={dir}
            className="flex flex-col md:flex-row h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900 relative"
        >
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 z-20 flex-shrink-0">
                <div className="font-serif font-bold text-lg text-slate-900">
                    {t("sidebar.title")}
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen?.(!isMobileMenuOpen)}
                    className="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-md"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen?.(false)}
                />
            )}

            {/* Sidebar Area - Fixed width on desktop, drawer on mobile */}
            <aside
                className={cn(
                    "fixed md:relative inset-y-0 left-0 z-40 w-72 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out md:translate-x-0 h-full",
                    dir === 'rtl' ? (isMobileMenuOpen ? "translate-x-0 right-0 left-auto" : "translate-x-full right-0 left-auto md:translate-x-0") : (isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0")
                )}
            >
                {sidebar}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-auto bg-slate-50 w-full">
                {/* Subtle texture or grid if needed, for now just clean */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

                <div className="relative h-full w-full p-4 md:p-12 lg:p-16 flex flex-col">
                    {children}
                </div>
            </main>
        </div>
    );
}
