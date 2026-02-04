import { useLangs } from "@/hooks/useLangs";

interface SplashScreenProps {
    onNavigate: (panel: "about" | "game" | "source") => void;
}

export function SplashScreen({ onNavigate }: SplashScreenProps) {
    const { t, language, setLanguage } = useLangs();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'he' : 'en');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("/background.jpg")' }}
            />
            {/* Background Overlay */}
            <div className="absolute inset-0 z-1 backdrop-blur-[2px] bg-black/40" />

            {/* Main content container */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto text-center">

                {/* Animated Logo Faces */}
                <div className="relative w-full h-32 mb-8 flex items-center justify-center">
                    <img
                        src="/titleLogoFace1.webp"
                        alt=""
                        className="absolute w-20 h-20 md:w-24 md:h-24 object-contain animate-float-subtle"
                        style={{
                            left: '20%',
                            filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.5))',
                            animationDelay: '0s'
                        }}
                    />
                    <img
                        src="/titleLogoFace2.webp"
                        alt=""
                        className="absolute w-20 h-20 md:w-24 md:h-24 object-contain animate-float-subtle"
                        style={{
                            left: '35%',
                            filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.5))',
                            animationDelay: '0.5s'
                        }}
                    />
                    <img
                        src="/titleLogoFace3.webp"
                        alt=""
                        className="absolute w-20 h-20 md:w-24 md:h-24 object-contain animate-float-subtle"
                        style={{
                            right: '35%',
                            filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.5))',
                            animationDelay: '1s'
                        }}
                    />
                    <img
                        src="/titleLogoFace4.webp"
                        alt=""
                        className="absolute w-20 h-20 md:w-24 md:h-24 object-contain animate-float-subtle"
                        style={{
                            right: '20%',
                            filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.5))',
                            animationDelay: '1.5s'
                        }}
                    />
                </div>

                {/* Title Logo */}
                <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <img
                        src="/titleLogoText.webp"
                        alt="aMAZE'n"
                        className="w-64 md:w-80 lg:w-96 h-auto mx-auto"
                        style={{
                            filter: 'drop-shadow(0 0 30px rgba(234, 179, 8, 0.6))'
                        }}
                    />
                </div>

                {/* Subtitle with gradient */}
                <h2
                    className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in-up"
                    style={{
                        animationDelay: '0.6s',
                        backgroundSize: '200% auto'
                    }}
                >
                    {t("splash.subtitle")}
                </h2>

                {/* Description */}
                <p
                    className="text-base md:text-lg lg:text-xl text-foreground/80 max-w-2xl mb-4 leading-relaxed font-sans animate-fade-in-up"
                    style={{
                        animationDelay: '0.9s',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    {t("splash.description")}
                </p>

                {/* Language Toggle Button */}
                <button
                    onClick={toggleLanguage}
                    className="mb-8 px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-all duration-300 hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: '1s' }}
                >
                    {language === 'en' ? 'עברית' : 'English'}
                </button>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center w-full animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                    {/* About Button */}
                    <button
                        onClick={() => onNavigate("about")}
                        className="group relative px-8 py-4 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 bg-white/5 backdrop-blur-md border-2 border-primary/30 text-foreground hover:border-primary hover:bg-primary/10 hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] w-full sm:w-auto"
                    >
                        <span className="relative z-10">{t("splash.buttons.about")}</span>
                    </button>

                    {/* Play Button - Primary */}
                    <button
                        onClick={() => onNavigate("game")}
                        className="group relative px-10 py-5 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary hover:to-secondary hover:scale-110 hover:shadow-[0_0_40px_rgba(234,179,8,0.6)] border-2 border-primary/50 hover:border-secondary w-full sm:w-auto"
                    >
                        <span className="relative z-10">{t("splash.buttons.play")}</span>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary/0 to-secondary/0 group-hover:from-secondary/20 group-hover:to-secondary/20 transition-all duration-300" />
                    </button>

                    {/* Source Button */}
                    <button
                        onClick={() => onNavigate("source")}
                        className="group relative px-8 py-4 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 bg-white/5 backdrop-blur-md border-2 border-secondary/30 text-foreground hover:border-secondary hover:bg-secondary/10 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] w-full sm:w-auto"
                    >
                        <span className="relative z-10">{t("splash.buttons.source")}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
