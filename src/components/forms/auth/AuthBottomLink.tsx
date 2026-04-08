import { Link } from "react-router";
import { ROUTES_PATHS } from "../../../routes/route_paths";

const AuthBottomLink = ({
    isSignup = false,
}: {
    isSignup?: boolean;
}) => {
    return (
        <div className="mt-6 space-y-3 text-center">

            {/* Signup / Signin */}
            <p className="text-sm text-gray-600">
                {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
                <Link
                    to={
                        isSignup
                            ? ROUTES_PATHS.AUTH.SIGNIN
                            : ROUTES_PATHS.AUTH.SIGNUP
                    }
                    className="font-medium text-brand-500 hover:text-brand-600 transition"
                >
                    {isSignup ? "Sign In" : "Sign Up"}
                </Link>
            </p>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 text-gray-400">
                <span className="h-px w-16 bg-gray-300"></span>
                <span className="text-sm">or</span>
                <span className="h-px w-16 bg-gray-300"></span>
            </div>

            {/* Forgot password */}
            <Link
                to={ROUTES_PATHS.AUTH.FORGOT_PASSWORD}
                className="block text-sm font-medium text-red-500 hover:text-red-600 transition"
            >
                Forgot your password?
            </Link>

        </div>
    );
};

export default AuthBottomLink;
