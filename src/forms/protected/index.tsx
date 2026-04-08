import { lazy } from "react";

const UserForm = lazy(() => import("./UserForm"))
const ArtistForm = lazy(() => import("./ArtistForm"))
const CategoryForm = lazy(() => import("./CategoryForm"))
const PackageForm = lazy(() => import("./PackageForm"))
const BookingForm = lazy(() => import("./BookingForm"))
const PaymentForm = lazy(() => import("./PaymentForm"))

export {
    UserForm,
    ArtistForm,
    CategoryForm,
    PackageForm,
    BookingForm,
    PaymentForm
}