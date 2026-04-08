import { Link, Outlet } from "react-router";
import { ROUTES_PATHS } from "../routes/route_paths";
import GridShape from "../components/layout_comp/auth/GridShape";

const AuthLayout = () => {
    return (
        <div className="relative w-full h-screen bg-white">
            <div className="relative flex flex-col lg:flex-row w-full h-full">
                {/* Left side */}
                <div className="flex flex-col flex-1">
                    {/* Top link */}
                    <div className="w-full max-w-md pt-10 px-6 mx-auto">
                        <Link
                            to={ROUTES_PATHS?.PUBLIC?.HOME}
                            className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700"
                        >
                            Back to Page
                        </Link>
                    </div>

                    {/* Centered Outlet */}
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-md px-6">
                            <Outlet />
                        </div>
                    </div>
                </div>

                {/* Right side */}
                <div className="hidden lg:flex lg:w-1/2 bg-[#2c2034] items-center justify-center">
                    <div className="relative flex flex-col items-center justify-center">
                        <GridShape />
                        <Link to={ROUTES_PATHS?.PUBLIC?.HOME} className="block mt-4">
                            <img
                                src="/images/logo_lg_white.png"
                                alt="Logo"
                                width={400}
                                loading="lazy"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;