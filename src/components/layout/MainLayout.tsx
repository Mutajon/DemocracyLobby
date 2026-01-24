
import { type ReactNode } from "react";
import { useLangs } from "@/hooks/useLangs";

interface MainLayoutProps {
    sidebar: ReactNode;
    children: ReactNode;
}

export function MainLayout({ sidebar, children }: MainLayoutProps) {
    const { dir } = useLangs();

    return (
        <div
            dir={dir}
            className="flex flex-col md:flex-row h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900"
        >
            {/* Sidebar Area - Fixed width on desktop, auto on mobile */}
            <aside className="w-full md:w-72 flex-shrink-0 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col z-10 shadow-sm md:shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] h-auto md:h-full">
                {sidebar}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-auto bg-slate-50">
                {/* Subtle texture or grid if needed, for now just clean */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

                <div className="relative h-full w-full p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    {children}
                </div>
            </main>
        </div>
    );
}
