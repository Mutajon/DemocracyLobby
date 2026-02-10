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
            className="flex flex-col md:flex-row h-screen w-full bg-[#1a0b2e] text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-white relative"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
                style={{ backgroundImage: 'url("/background2.webp")' }}
            />
            {/* Background Overlay for better contrast */}
            <div className="absolute inset-0 z-1 backdrop-blur-[2px] bg-black/30" />

            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b border-white/10 z-20 flex-shrink-0">
                <div className="font-serif font-bold text-lg text-secondary">
                    {t("sidebar.title")}
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen?.(!isMobileMenuOpen)}
                    className="p-2 -mr-2 text-foreground/80 hover:bg-white/10 rounded-md"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen?.(false)}
                />
            )}

            {/* Sidebar Area - Fixed width on desktop, drawer on mobile */}
            <aside
                className={cn(
                    "fixed md:relative inset-y-0 left-0 z-40 w-80 bg-background/40 backdrop-blur-xl border-white/10 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:translate-x-0 h-full",
                    dir === 'rtl' ? (isMobileMenuOpen ? "translate-x-0 right-0 left-auto" : "translate-x-full right-0 left-auto md:translate-x-0") : (isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0")
                )}
            >
                {sidebar}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-auto w-full z-10 p-4 md:p-8 lg:p-12 flex items-center justify-center">
                <div className="relative w-full max-w-5xl h-full max-h-[85vh] bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-1000 ease-out">
                    {/* Inner Glow Effect */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent z-20" />
                    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent z-20" />

                    {/* Decorative Background Elements Inside Pop-up */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="flex-1 overflow-auto p-8 md:p-12 lg:p-20 relative z-10 scrollbar-hide">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
