import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES_PATHS } from '../../routes/route_paths';
import { authService } from '../../services/auth';
import { toastError, toastSuccess } from '../../utilities';
import { Button, Input, Label } from '../../components/ui/forms';
import { AuthFormHeader } from '../../components/forms'
import { SuspenseComp } from '../../components/shared'


const ForgotPasswordForm = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await authService.forgotPassword(email);

            if (res.success) {
                toastSuccess(res.message || "OTP sent to email");
                navigate(ROUTES_PATHS.AUTH.VERIFY_OTP(email));
            }

        } catch {
            toastError("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };



    return (
        <SuspenseComp>
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <AuthFormHeader title="Forgot Password" desc="Enter your email address to reset your password" />
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <Label>
                            Enter Email <span className="text-error-500">*</span>{" "}
                        </Label>
                        <Input
                            name="email"
                            id="email"
                            value={email}
                            placeholder="Email address *"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button type="submit" className="w-full" size="sm">
                            {loading ? "Sending..." : "Send Reset Link"}
                        </Button>
                    </div>
                </form>
            </div>
        </SuspenseComp>
    )
}

export default ForgotPasswordForm
