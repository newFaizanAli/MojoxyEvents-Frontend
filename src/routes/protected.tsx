import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { ROUTES_PATHS } from "./route_paths";
import { authService } from "../services/auth";
import { useProfileStore } from "../store";
import { Loader } from "../components/shared";


interface ProtectedRouteProps {
    allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { profile, isFetched: isProfileFetched, fetchProfile } = useProfileStore();

    useEffect(() => {
        if (!isProfileFetched) {
            fetchProfile().catch((err) => console.error("Failed to fetch profile:", err));
        }
    }, [isProfileFetched, fetchProfile]);

    if (!authService.isAuthenticated()) {
        return <Navigate to={ROUTES_PATHS?.AUTH.SIGNIN} replace />;
    }

    // Wait for profile to load
    if (!isProfileFetched) {
        return <Loader />;
    }


    if (allowedRoles && !allowedRoles.includes(profile?.role || "")) {
        return <Navigate to={ROUTES_PATHS?.DENIED} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
