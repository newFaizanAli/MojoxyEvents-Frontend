import { lazy } from "react";

const SignInPage = lazy(() => import("./SignIn"));
const SignUpPage = lazy(() => import("./SignUp"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const PasswordOTPVerify = lazy(() => import("./PasswordOTPVerify"));
const ResetPassword = lazy(() => import("./ResetPassword"));

export {
    SignInPage,
    SignUpPage,
    ForgotPassword,
    PasswordOTPVerify,
    ResetPassword
}