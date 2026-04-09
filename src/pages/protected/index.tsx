import { lazy } from "react";

const DashboardPage = lazy(() => import("./dashbaord"))
// artist
const ArtistBooking = lazy(() => import("./artist/Booking"))
const ArtistPage = lazy(() => import("./artist/ArtistPage"))
const ArtistsList = lazy(() => import("./artist/ArtistsList"))
const AristBookingsList = lazy(() => import("./artist/BookingList"))
// user
const UserPage = lazy(() => import("./user/UserPage"))
const UsersList = lazy(() => import("./user/UsersList"))
// category
const CategoryPage = lazy(() => import("./category/CategoryPage"))
const CategoriesList = lazy(() => import("./category/CategoriesList"))
// package 
const PackagePage = lazy(() => import("./package/PackagePage"))
const PackagesList = lazy(() => import("./package/PackagesList"))
// booking
const BookingPage = lazy(() => import("./booking/BookingPage"))
const BookingsList = lazy(() => import("./booking/BookingsList"))
const SelfBookingsList = lazy(() => import("./booking/SelfBookingsList"))
const ViewBookingPage = lazy(() => import("./booking/ViewBookingPage"))
// payment
const PaymentPage = lazy(() => import("./payment/PaymentPage"))
const PaymentList = lazy(() => import("./payment/PaymentsList"))

export {
    DashboardPage,
    UserPage,
    UsersList,
    ArtistBooking,
    ArtistPage,
    ArtistsList,
    AristBookingsList,
    CategoryPage,
    CategoriesList,
    PackagePage,
    PackagesList,
    BookingPage,
    BookingsList,
    ViewBookingPage,
    SelfBookingsList,
    PaymentPage,
    PaymentList
}