import { lazy } from "react";

const ZeroBooking = lazy(() => import("./ZeroBooking"));
const SelfBookingCard = lazy(() => import('./SelfBookingCard'));
const ArtistBookingCard = lazy(() => import('./ArtistBookingCard'));

export {
    ZeroBooking,
    SelfBookingCard,
    ArtistBookingCard
}