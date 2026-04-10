import { lazy } from "react";

const ArtistPage = lazy(() => import("./ArtistPage"))
const ArtistBooking = lazy(() => import("./Booking"))
const ArtistsList = lazy(() => import("./ArtistsList"))
const ArtistUpdateProfilePage = lazy(() => import("./UpdateProfile"))
const AristBookingsList = lazy(() => import("./BookingList"))

export {
    ArtistPage,
    ArtistBooking,
    ArtistUpdateProfilePage,
    ArtistsList,
    AristBookingsList
}