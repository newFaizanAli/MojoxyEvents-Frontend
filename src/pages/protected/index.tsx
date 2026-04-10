import { lazy } from "react";

const DashboardPage = lazy(() => import("./dashbaord"))

import {
    ArtistUpdateProfilePage, ArtistBooking,
    ArtistPage, ArtistsList, AristBookingsList
} from "./artist"
// user
import { UserPage, UsersList, ProfilePage } from "./user"
// category
import { CategoryPage, CategoriesList } from "./category"
// package 
import { PackagePage, PackagesList } from "./package"
// booking
import { BookingPage, BookingsList, ViewBookingPage, SelfBookingsList } from "./booking"
// payment
import { PaymentPage, PaymentList } from "./payment"

export {
    DashboardPage,
    // user
    UserPage,
    UsersList,
    // profile
    ProfilePage,
    //artist
    ArtistUpdateProfilePage,
    ArtistBooking,
    ArtistPage,
    ArtistsList,
    AristBookingsList,
    // category
    CategoryPage,
    CategoriesList,
    // package
    PackagePage,
    PackagesList,
    // booking
    BookingPage,
    BookingsList,
    ViewBookingPage,
    SelfBookingsList,
    // payment
    PaymentPage,
    PaymentList
}