
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Sidebar, type PanelType } from '@/components/landing/Sidebar';
import { ContentArea } from '@/components/landing/ContentArea';
import { SplashScreen } from '@/components/landing/SplashScreen';
import { LanguageProvider } from "@/context/LanguageContext";

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [activePanel, setActivePanel] = useState<PanelType>("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePanelChange = (panel: PanelType) => {
    setActivePanel(panel);
    setIsMobileMenuOpen(false);
  };

  const handleSplashNavigate = (panel: "about" | "game" | "source") => {
    setActivePanel(panel);
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onNavigate={handleSplashNavigate} />;
  }

  return (
    <MainLayout
      sidebar={<Sidebar activePanel={activePanel} onPanelChange={handlePanelChange} />}
      isMobileMenuOpen={isMobileMenuOpen}
      setIsMobileMenuOpen={setIsMobileMenuOpen}
    >
      <ContentArea activePanel={activePanel} />
    </MainLayout>
  );
}

function App() {
  console.log("App: rendering");
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
