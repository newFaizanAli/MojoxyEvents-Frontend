import { useState } from "react";
import { useNavigate, useParams } from "react-router"
import { ROUTES_PATHS } from "../../routes/route_paths";
import { authService } from "../../services/auth";
import { toastError } from "../../utilities";
import { AuthFormHeader } from "../../components/forms";
import { Button, Input, Label } from "../../components/ui/forms";




const PasswordOTPVerifyForm = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState("");
    const { email } = useParams<{ email: string }>();

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!email) return

            const res = await authService.verifyOTP(email!, otp);

            if (res.success) {
                navigate(ROUTES_PATHS.AUTH.RESET(res.token));
            }

        } catch {
            toastError("Failed to verify OTP");
            navigate(ROUTES_PATHS.PUBLIC.HOME);
        }

    };
    return (

        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">

            <AuthFormHeader title="Verify OTP" desc="Enter the OTP sent to your email address." />

            <form className="space-y-6" onSubmit={handleVerify}>
                <div>
                    <Label>
                        Enter OTP
                    </Label>
                    <Input
                        type="text"
                        name="otp"
                        value={otp}
                        placeholder="Enter OTP"
                        onChange={(e) => setOtp(e.target.value)}
                    />


                </div>
                <div>
                    <Button type="submit" className="w-full" size="sm">
                        Verify OTP
                    </Button>
                </div>
            </form>

        </div>

    )
}

export default PasswordOTPVerifyForm
