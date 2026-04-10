import { lazy } from "react";

const PaymentPage = lazy(() => import("./PaymentPage"))
const PaymentList = lazy(() => import("./PaymentsList"))

export {
    PaymentPage,
    PaymentList
}