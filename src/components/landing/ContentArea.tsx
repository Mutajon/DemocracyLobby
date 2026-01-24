
import { type PanelType } from "./Sidebar";
import { AboutPanel } from "./panels/AboutPanel";
import { GameFlowPanel } from "./panels/GameFlowPanel";
import { SourceCodePanel } from "./panels/SourceCodePanel";
import { ContactPanel } from "./panels/ContactPanel";

interface ContentAreaProps {
    activePanel: PanelType;
}

export function ContentArea({ activePanel }: ContentAreaProps) {
    const renderPanel = () => {
        switch (activePanel) {
            case "about":
                return <AboutPanel />;
            case "game":
                return <GameFlowPanel />;
            case "source":
                return <SourceCodePanel />;
            case "contact":
                return <ContactPanel />;
            default:
                return <AboutPanel />;
        }
    };

    return (
        <div className="h-full w-full">
            {renderPanel()}
        </div>
    );
}
