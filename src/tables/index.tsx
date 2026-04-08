import { lazy } from "react";

const UsersTable = lazy(() => import("./UsersTable"))
const ArtistsTable = lazy(() => import("./ArtistsTable"))
const CategoriesTable = lazy(() => import("./CategoriesTable"))
const PackagesTable = lazy(() => import("./PackagesTable"))
const BookingsTable = lazy(() => import("./BookingsTable"))
const PaymentsList = lazy(() => import("./PaymentsList"))


export {
    UsersTable,
    ArtistsTable,
    CategoriesTable,
    PackagesTable,
    BookingsTable,
    PaymentsList
}