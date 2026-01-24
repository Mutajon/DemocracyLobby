
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Sidebar, type PanelType } from '@/components/landing/Sidebar';
import { ContentArea } from '@/components/landing/ContentArea';
import { LanguageProvider } from "@/context/LanguageContext";

function AppContent() {
  const [activePanel, setActivePanel] = useState<PanelType>("about");

  return (
    <MainLayout sidebar={<Sidebar activePanel={activePanel} onPanelChange={setActivePanel} />}>
      <ContentArea activePanel={activePanel} />
    </MainLayout>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
