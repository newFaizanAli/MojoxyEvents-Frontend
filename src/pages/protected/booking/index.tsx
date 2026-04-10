import { lazy } from "react";

const BookingPage = lazy(() => import("./BookingPage"))
const BookingsList = lazy(() => import("./BookingsList"))
const SelfBookingsList = lazy(() => import("./SelfBookingsList"))
const ViewBookingPage = lazy(() => import("./ViewBookingPage"))

export {
    BookingPage,
    BookingsList,
    SelfBookingsList,
    ViewBookingPage
}