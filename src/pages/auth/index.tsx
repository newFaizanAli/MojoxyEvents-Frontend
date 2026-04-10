import { lazy } from "react";

const SignInPage = lazy(() => import("./SignIn"));
const UserSignUpPage = lazy(() => import("./UserSignUp"));
const ArtistSignUpPage = lazy(() => import("./ArtistSignUp"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const PasswordOTPVerify = lazy(() => import("./PasswordOTPVerify"));
const ResetPassword = lazy(() => import("./ResetPassword"));

export {
    SignInPage,
    ForgotPassword,
    PasswordOTPVerify,
    ResetPassword,
    UserSignUpPage,
    ArtistSignUpPage
}