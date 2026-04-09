import { lazy } from "react";

const ZeroBooking = lazy(() => import("./ZeroBooking"));
const SelfBookingCard = lazy(() => import('./SelfBookingCard'));


export {
    ZeroBooking,
    SelfBookingCard
}