
import { Mail, Phone, Building2 } from "lucide-react";
import { useLangs } from "@/hooks/useLangs";

export function ContactPanel() {
    const { t } = useLangs();
    return (
        <div className="space-y-6 h-full flex flex-col justify-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">
                    {t("panels.contact.title")}
                </h2>

                <div className="grid gap-6">
                    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="p-2 bg-blue-50 text-blue-700 rounded-md mt-1">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">{t("panels.contact.dept.name")}</h3>
                            <p className="text-slate-500 text-sm">{t("panels.contact.dept.faculty")}</p>
                            <p className="text-slate-500 text-sm">{t("panels.contact.dept.address")}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="p-2 bg-blue-50 text-blue-700 rounded-md mt-1">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">{t("panels.contact.email.title")}</h3>
                            <p className="text-slate-500 text-sm">{t("panels.contact.email.address")}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="p-2 bg-blue-50 text-blue-700 rounded-md mt-1">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">{t("panels.contact.phone.title")}</h3>
                            <p className="text-slate-500 text-sm">{t("panels.contact.phone.number")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
