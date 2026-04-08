import { lazy } from "react";

const AuthBottomLink = lazy(() => import("./AuthBottomLink"));
const AuthFormHeader = lazy(() => import("./AuthFormHeader"));
const OtpVerification = lazy(() => import("./OtpVerification"));
const PasswordField = lazy(() => import("./PasswordField"));


export {
    AuthBottomLink,
    AuthFormHeader,
    OtpVerification,
    PasswordField
}