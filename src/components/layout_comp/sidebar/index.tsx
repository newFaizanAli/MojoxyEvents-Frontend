import { lazy, useCallback, useState } from "react";
import { useProfileStore } from "../../../store";
import { SuspenseComp } from "../../shared";
const SidebarHeader = lazy(() => import("./SidebarHeader"));
const SidebarNav = lazy(() => import("./SidebarNav"));

interface SidebarProps {
    collapsed?: boolean;
    onToggleCollapse?: () => void;
}

const Sidebar = ({
    collapsed: externalCollapsed,
    onToggleCollapse,
}: SidebarProps) => {
    const [internalCollapsed, setInternalCollapsed] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
    const collapsed = externalCollapsed ?? internalCollapsed;
    const { profile } = useProfileStore();

    const handleToggle = useCallback(() => {
        if (onToggleCollapse) onToggleCollapse();
        else setInternalCollapsed(prev => !prev);
    }, [onToggleCollapse]);


    const toggleSubmenu = useCallback((name: string) => {
        if (collapsed) return;

        setExpandedMenus(prev =>
            prev.includes(name)
                ? prev.filter(n => n !== name)
                : [...prev, name]
        );
    }, [collapsed]);

    return (

        <aside
            className={`${collapsed ? "w-20" : "w-64"
                } bg-gradient-to-b from-brand-900 via-brand-700 to-brand-900 
      text-white h-screen flex flex-col shadow-2xl border-r border-brand-700/50 
      overflow-hidden`}
        >
            <SuspenseComp>
                <SidebarHeader
                    collapsed={collapsed}
                    onToggle={handleToggle}
                    profile={profile ?? undefined}
                />
            </SuspenseComp>

            <SuspenseComp>
                <SidebarNav
                    collapsed={collapsed}
                    expandedMenus={expandedMenus}
                    toggleSubmenu={toggleSubmenu}
                    profile={profile ?? undefined}
                />
            </SuspenseComp>
        </aside>
    );
};

export default Sidebar;
