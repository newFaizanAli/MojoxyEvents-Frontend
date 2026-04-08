import React from "react";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  profile?: { role?: string | null };
}

const SidebarHeader = React.memo(({
  collapsed,
  onToggle,
  profile,
}: SidebarHeaderProps) => {

  const roleLabel = profile?.role ? profile.role.toUpperCase() : "GUEST";

  return (

    <div className="p-4 flex items-center justify-between border-b border-brand-700/50 h-20">
      {!collapsed && (
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br rounded-lg flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="font-bold text-sm leading-tight">
              {roleLabel} PANEL
            </h2>
            <p className="text-xs text-gray-400">v2.0.1</p>
          </div>
        </div>
      )}

      <button
        onClick={onToggle}
        className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${collapsed ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
  );
});

export default SidebarHeader;
