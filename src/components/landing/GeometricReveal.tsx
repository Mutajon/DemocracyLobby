
import { useState, useEffect, useRef } from 'react';
import { X, ZoomIn } from 'lucide-react';

const IMAGES = [
    '/screenshots/Screenshot 2026-02-09 at 14.44.50.png',
    '/screenshots/Screenshot 2026-02-09 at 14.44.58.png',
    '/screenshots/Screenshot 2026-02-09 at 14.45.23.png',
    '/screenshots/Screenshot 2026-02-09 at 14.46.21.png',
    '/screenshots/Screenshot 2026-02-09 at 14.47.45.png',
    '/screenshots/Screenshot 2026-02-09 at 14.49.09.png',
    '/screenshots/Screenshot 2026-02-09 at 14.50.29.png',
    '/screenshots/Screenshot 2026-02-09 at 14.50.54.png'
];

export function GeometricReveal() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
        }, 3000);
    };

    useEffect(() => {
        // Only run timer if not hovered AND lightbox is closed
        if (!isHovered && !isLightboxOpen) {
            startTimer();
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isHovered, isLightboxOpen]);

    const openLightbox = () => {
        setIsLightboxOpen(true);
        setIsHovered(false); // Reset hover state
    };

    return (
        <>
            {/* Main Carousel Display */}
            <div
                className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02] cursor-zoom-in group border-4 border-white/10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={openLightbox}
            >
                {IMAGES.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center bg-black/20 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        <img
                            src={src}
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-full object-contain" // Changed from object-cover to object-contain to prevent cutting
                        />
                    </div>
                ))}

                {/* Zoom Hint Overlay */}
                <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} z-20 pointer-events-none`}>
                    <ZoomIn className="text-white w-12 h-12 opacity-80" />
                </div>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-none">
                    {IMAGES.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10 animate-fade-in"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <button
                        className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <X size={32} />
                    </button>

                    <div
                        className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
                    >
                        <img
                            src={IMAGES[currentIndex]}
                            alt="Screenshot Fullscreen"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
