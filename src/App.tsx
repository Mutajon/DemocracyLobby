
import { useState } from 'react';
import { SplashScreen } from '@/components/landing/SplashScreen';
import { AboutPage } from '@/components/landing/AboutPage';
import { SourceCodePage } from '@/components/landing/SourceCodePage';
import { LanguageProvider } from "@/context/LanguageContext";

type PageType = "splash" | "about" | "source";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>("splash");

  const handleNavigate = (page: "about" | "game" | "source") => {
    if (page === "game") return; // Handled within SplashScreen
    setCurrentPage(page);
  };

  const handleBack = () => {
    setCurrentPage("splash");
  };

  if (currentPage === "about") {
    return <AboutPage onBack={handleBack} onNavigate={handleNavigate} />;
  }

  if (currentPage === "source") {
    return <SourceCodePage onBack={handleBack} />;
  }

  return <SplashScreen onNavigate={handleNavigate} />;
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
