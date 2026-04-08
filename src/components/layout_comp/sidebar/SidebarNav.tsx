import React from "react";
import { SIDEBAR_ITEMS } from "../../../utilities/sidebar_items";
import { SuspenseComp } from "../../shared";
import SidebarItem from "./SidebarItem";

interface SidebarNavProps {
  collapsed: boolean;
  expandedMenus: string[];
  toggleSubmenu: (name: string) => void;
  profile?: { role?: string | null };
}

const SidebarNav = React.memo(({
  collapsed,
  expandedMenus,
  toggleSubmenu,
  profile,
}: SidebarNavProps) => {
  return (
    <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      <SuspenseComp>
        {SIDEBAR_ITEMS.map((item) => (

          <SidebarItem

            key={item.name}
            item={item}
            collapsed={collapsed}
            expandedMenus={expandedMenus}
            toggleSubmenu={toggleSubmenu}
            profile={profile}
          />

        ))}
      </SuspenseComp>
    </nav>
  );
});

export default SidebarNav;
