import { useRef, useState } from "react"
import { Link } from "react-router"
import { ChevronDownIcon, LayoutGrid, LogInIcon, LogOutIcon, User } from 'lucide-react'
import { User as Profile } from "../../../types"
import { ROUTES_PATHS } from "../../../routes/route_paths"
import { getInitials } from "../../../utilities/functions"


// import ModuleSearch from "./ModuleSearch"


const DesktopMenu = ({
    isAuthenticated,
    showDashboardLink = true,
    profile,
    handleLogout
}: {
    isAuthenticated: boolean,
    showDashboardLink: boolean,
    profile: Profile,
    handleLogout: () => void
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    return (
        <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
            {showDashboardLink && <>
                <nav className="flex items-center gap-6 text-white font-medium">
                    <Link to={ROUTES_PATHS?.PUBLIC?.HOME} className="hover:text-primary-300 transition-colors">
                        Home
                    </Link>
                    <Link
                        to={ROUTES_PATHS?.PUBLIC?.CATEGORIES}
                        className="hover:text-primary-300 transition-colors"
                    >
                        Categories
                    </Link>
                    <Link
                        to={ROUTES_PATHS?.PUBLIC?.ARTISTS}
                        className="hover:text-primary-300 transition-colors"
                    >
                        Artists
                    </Link>
                </nav>
                {/* <div className="w-full max-w-md">
          <ModuleSearch />
        </div> */}
            </>}

            {isAuthenticated ? (
                <div className="flex items-center gap-3">
                    <Link
                        to={showDashboardLink ? '/dashboard' : ROUTES_PATHS?.PUBLIC?.HOME}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white 
            backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg transition-all duration-200 
            font-medium"
                    >
                        <LayoutGrid className="w-4 h-4" />
                        {showDashboardLink ? "Dahboard" : "Home"}
                    </Link>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen((prev) => !prev)}
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm
               border border-white/20 rounded-full pl-1 pr-3 py-1 transition-all duration-200"
                        >
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-semibold text-sm shadow-lg ring-2 ring-white/30">
                                {profile?.name ? getInitials(profile.name) : "MJ"}
                            </div>
                            <span className="text-white text-sm font-medium hidden lg:block">
                                {profile?.name || "User"}
                            </span>
                            <ChevronDownIcon
                                className={`h-4 w-4 text-white transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white 
              shadow-2xl py-2 z-50 border border-gray-100 animate-in fade-in 
              slide-in-from-top-2 duration-200">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {profile?.name || "User"}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {profile?.email || "user@example.com"}
                                    </p>
                                </div>
                                <Link
                                    to={{}}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm
                   text-gray-700 hover:bg-gray-50
                   transition-colors"
                                    onClick={() => setDropdownOpen(false)}
                                >

                                    <User className="w-4 h-4" />
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-4 py-2.5 text-left 
                  text-sm text-red-600 hover:bg-red-50
                   transition-colors"
                                >
                                    <LogOutIcon className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Link
                    to={ROUTES_PATHS?.AUTH.SIGNIN}
                    className="flex items-center gap-2 bg-white text-brand-900
           hover:bg-gray-100 px-5 py-2.5 rounded-lg transition-all duration-200
            font-semibold shadow-lg"
                >
                    <LogInIcon className="w-4 h-4" />
                    Sign In
                </Link>
            )}
        </div>
    )
}

export default DesktopMenu
