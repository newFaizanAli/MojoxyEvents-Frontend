import { lazy } from "react";

const SignInForm = lazy(() => import("./SignIn"));
const SignUpForm = lazy(() => import("./SignUp"));
const ForgotPasswordForm = lazy(() => import("./ForgotPassword"));
const PasswordOTPVerifyForm = lazy(() => import("./PasswordOTPVerifyForm"));
const ResetPasswordForm = lazy(() => import("./ResetPasswordForm"));
const ProfileForm = lazy(() => import("./ProfileForm"));

export {
    SignInForm,
    SignUpForm,
    ForgotPasswordForm,
    PasswordOTPVerifyForm,
    ResetPasswordForm,
    ProfileForm
}