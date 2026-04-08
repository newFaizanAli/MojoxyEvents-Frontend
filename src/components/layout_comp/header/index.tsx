import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { User } from "../../../types";
import { ROUTES_PATHS } from "../../../routes/route_paths";
import { useProfileStore } from "../../../store";
import { authService } from "../../../services/auth";
import DesktopMenu from "./DesktopMenu";


interface Props {
    showIcon?: boolean;
    showDashboardLink?: boolean;
}

const Header = React.memo(({ showIcon = true, showDashboardLink = true }: Props) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { profile, resetProfile, isFetched: isProfileFetched, fetchProfile } = useProfileStore();
    const navigate = useNavigate();

    const isAuthenticated = authService.isAuthenticated();

    const handleLogout = async () => {
        authService.logout();
        resetProfile();
        navigate(ROUTES_PATHS.AUTH.SIGNIN); // <- React Router
    };


    useEffect(() => {
        if (!isProfileFetched && isAuthenticated) {
            fetchProfile();
        }
    }, [fetchProfile, isProfileFetched, isAuthenticated]);


    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 shadow-lg backdrop-blur-sm border-b border-brand-700/50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    {showIcon && (
                        <Link
                            to={ROUTES_PATHS?.PUBLIC?.HOME}
                            className="flex-shrink-0 transition-transform hover:scale-105 duration-200"
                        >
                            <img
                                src="/images/logo_lg_white.png"
                                alt="Logo"
                                // loading="eager"
                                decoding="sync"
                                fetchPriority="high"
                                width="160"
                                height="160"
                                className="h-10 sm:h-12 md:h-24 lg:h-40 w-auto"
                                style={{ objectFit: "contain" }}
                                loading="lazy"
                            />

                        </Link>
                    )}

                    {/* Desktop Navigation */}
                    <DesktopMenu
                        isAuthenticated={isAuthenticated}
                        showDashboardLink={showDashboardLink}
                        profile={profile as User}
                        handleLogout={handleLogout}
                    />

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {/* {mobileMenuOpen && (
          <MobileMenu
            isAuthenticated={isAuthenticated}
            showDashboardLink={showDashboardLink}
            setMobileMenuOpen={setMobileMenuOpen}
            handleLogout={handleLogout} />
        )} */}
            </div>
        </header>
    );
});

export default Header;