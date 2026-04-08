import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES_PATHS } from "../../routes/route_paths";
import { authService } from "../../services/auth";
import { Label, Input, Button } from "../../components/ui/forms";
import { AuthBottomLink, AuthFormHeader, PasswordField } from "../../components/forms";

const SignInForm = React.memo(() => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        form?: string;
    }>({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!formData?.email) {
            newErrors.email = "Email address is required.";
        }

        if (!formData?.password) {
            newErrors.password = "Password is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) {
            return;
        }

        try {
            const response = await authService.signin(
                formData?.email,
                formData?.password
            );


            if (response?.token) {
                localStorage.setItem("mjx_token", response?.token);
                localStorage.setItem("mjx_user", JSON.stringify(response?.user));
                navigate(ROUTES_PATHS?.PUBLIC?.HOME);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (


        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">

            <AuthFormHeader title="Sign In" desc="Enter your email and password to sign in!" />

            <div>
                <form className="" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <Label>
                                Email <span className="text-error-500">*</span>{" "}
                            </Label>
                            <Input
                                name="email"
                                id="email"
                                value={formData.email}
                                placeholder="Email address *"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <Label>
                                Password <span className="text-error-500">*</span>{" "}
                            </Label>
                            <PasswordField
                                name="password"
                                label="Password*"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value,
                                    })}
                                autoComplete="current-password"
                                error={errors.password}
                            />

                        </div>
                        <div>
                            <Button type="submit" className="w-full" size="sm">
                                Sign in
                            </Button>
                        </div>
                    </div>
                </form>
                <AuthBottomLink />
            </div>
        </div>
    );
});

export default SignInForm;
