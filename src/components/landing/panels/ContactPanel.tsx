
import { Mail, Phone, Building2 } from "lucide-react";
import { useLangs } from "@/hooks/useLangs";

export function ContactPanel() {
    const { t } = useLangs();
    return (
        <div className="space-y-6 h-full flex flex-col justify-center max-w-3xl mx-auto">
            <div className="bg-transparent">
                <h2 className="text-4xl font-serif font-black text-secondary mb-10 border-b border-white/10 pb-6 drop-shadow-lg">
                    {t("panels.contact.title")}
                </h2>

                <div className="grid gap-8">
                    {[
                        { icon: Building2, title: t("panels.contact.dept.name"), sub1: t("panels.contact.dept.faculty"), sub2: t("panels.contact.dept.address") },
                        { icon: Mail, title: t("panels.contact.email.title"), sub1: t("panels.contact.email.address") },
                        { icon: Phone, title: t("panels.contact.phone.title"), sub1: t("panels.contact.phone.number") }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-6 p-6 rounded-3xl bg-primary/10 backdrop-blur-md border border-primary/20 hover:bg-primary/20 transition-all duration-300 group hover:translate-x-2 shadow-2xl">
                            <div className="p-4 bg-primary/20 text-white rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-foreground mb-1 tracking-tight">{item.title}</h3>
                                <p className="text-foreground/60 text-base font-medium">{item.sub1}</p>
                                {item.sub2 && <p className="text-foreground/40 text-sm mt-1">{item.sub2}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
