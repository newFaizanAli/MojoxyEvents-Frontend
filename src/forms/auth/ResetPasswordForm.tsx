import { useState } from "react";
import { useNavigate, useParams } from "react-router"
import { ROUTES_PATHS } from "../../routes/route_paths";
import { authService } from "../../services/auth";
import { toastError, toastSuccess } from "../../utilities/toast_utils";
import { AuthFormHeader, PasswordField } from "../../components/forms";
import { Button, Label } from "../../components/ui/forms";


const ResetPasswordForm = () => {

    const navigate = useNavigate()
    const [password, setPassword] = useState("");
    const { token } = useParams<{ token: string }>();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!token || !password) return

            const res = await authService.resetPassword(token!, password);

            if (res.success) {
                toastSuccess(res.message || "Password changed");
                navigate(ROUTES_PATHS.AUTH.SIGNIN)
            }

        } catch {
            toastError("Failed to verify OTP");
            navigate(ROUTES_PATHS.PUBLIC.HOME);
        }
    };

    return (
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">

            <AuthFormHeader title="Reset Password" desc="Enter your new password." />
            <form className="space-y-6" onSubmit={handleReset}>
                <div>
                    <Label>
                        New Password <span className="text-error-500">*</span>{" "}
                    </Label>
                    <PasswordField
                        name="password"
                        label="Password*"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>
                <div>
                    <Button type="submit" className="w-full" size="sm">
                        Reset Password
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ResetPasswordForm
