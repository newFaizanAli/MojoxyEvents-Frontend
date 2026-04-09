import { MainLayout, AuthLayout, DashboardLayout, AppLayout } from "../layout";
import { ROUTES_PATHS } from "./route_paths";
import ProtectedRoute from "./protected";
import { ForgotPassword, PasswordOTPVerify, ResetPassword, SignInPage, SignUpPage } from "../pages/auth";
import { HomePage, CategoriesPage, ArtistsPage, ArtistProfile } from "../pages/public";
import {
    ArtistBooking, DashboardPage, UserPage, UsersList, ProfilePage,
    ArtistPage, ArtistsList, AristBookingsList, CategoryPage, CategoriesList,
    PackagePage, PackagesList, PaymentPage, PaymentList,
    BookingPage, BookingsList, SelfBookingsList, ViewBookingPage,
} from "../pages/protected";


const app_routes = [
    {
        element: <AppLayout />,
        children: [

            {
                element: <MainLayout />,
                children: [
                    { path: ROUTES_PATHS?.PUBLIC?.HOME, element: <HomePage /> },
                    { path: ROUTES_PATHS?.PUBLIC?.CATEGORIES, element: <CategoriesPage /> },
                    { path: ROUTES_PATHS?.PUBLIC?.ARTISTS, element: <ArtistsPage /> },
                    { path: "artist/:slug", element: <ArtistProfile /> },
                ],
            },


            {
                element: <ProtectedRoute />,
                children: [

                    {
                        element: <ProtectedRoute allowedRoles={["admin", "user", "artist"]} />,
                        children: [
                            {
                                path: ROUTES_PATHS?.DASHBOARD?.BASE,
                                element: <DashboardLayout />,
                                children: [
                                    { index: true, element: <DashboardPage /> },
                                    { path: ROUTES_PATHS?.DASHBOARD?.USER?.BOOKING?.LIST, element: <SelfBookingsList /> },
                                ],
                            },
                        ],
                    },

                    {
                        element: <ProtectedRoute allowedRoles={["admin", "user", "artist"]} />,
                        children: [
                            {
                                element: <MainLayout />,
                                children: [
                                    { path: "artist/:slug/book", element: <ArtistBooking /> },
                                    { path: "booking/:booking_id", element: <ViewBookingPage /> },

                                ],
                            },
                        ],
                    },


                    {
                        element: <ProtectedRoute allowedRoles={["admin"]} />,
                        children: [
                            {
                                path: ROUTES_PATHS?.DASHBOARD?.BASE,
                                element: <DashboardLayout />,
                                children: [
                                    { path: ROUTES_PATHS?.DASHBOARD?.USER?.LIST, element: <UsersList /> },
                                    { path: ROUTES_PATHS?.DASHBOARD?.USER?.BASE, element: <UserPage /> },
                                    { path: ROUTES_PATHS?.DASHBOARD.USER?.PROFILE, element: <ProfilePage /> },
                                    // artist
                                    { path: ROUTES_PATHS?.DASHBOARD?.ARTIST?.LIST, element: <ArtistsList /> },
                                    { path: "artist/:stage_name?", element: <ArtistPage /> },
                                    // category
                                    { path: ROUTES_PATHS?.DASHBOARD?.CATEGORY?.LIST, element: <CategoriesList /> },
                                    { path: "category/:slug?", element: <CategoryPage /> },
                                    // package
                                    { path: ROUTES_PATHS?.DASHBOARD?.PACKAGE?.LIST, element: <PackagesList /> },
                                    { path: "package/:package_id?", element: <PackagePage /> },
                                    // booking
                                    { path: ROUTES_PATHS?.DASHBOARD?.BOOKING?.LIST, element: <BookingsList /> },
                                    { path: ROUTES_PATHS?.DASHBOARD?.BOOKING?.BASE, element: <BookingPage /> },
                                    // payment
                                    { path: ROUTES_PATHS?.DASHBOARD?.PAYMENT?.LIST, element: <PaymentList /> },
                                    { path: "payment/:payment_id?", element: <PaymentPage /> },
                                ],
                            },
                        ],
                    },


                    {
                        element: <ProtectedRoute allowedRoles={["artist"]} />,
                        children: [
                            {
                                element: <DashboardLayout />,
                                children: [
                                    { path: ROUTES_PATHS?.DASHBOARD?.ARTIST?.BOOKING?.LIST, element: <AristBookingsList /> },
                                ],
                            },
                        ],
                    },



                ],
            },
        ],
    },


    {
        element: <AuthLayout />,
        path: "auth",
        children: [
            { path: ROUTES_PATHS?.AUTH.SIGNIN, element: <SignInPage /> },
            { path: ROUTES_PATHS?.AUTH.SIGNUP, element: <SignUpPage /> },
            { path: ROUTES_PATHS?.AUTH.FORGOT_PASSWORD, element: <ForgotPassword /> },
            { path: "/auth/verify-otp/:email", element: <PasswordOTPVerify /> },
            { path: "/auth/reset-password/:token", element: <ResetPassword /> },
        ],
    },


    //   { path: ROUTES_PATHS?.DENIED, element: <Pages.PermissionDenied /> },
    { path: "*", element: <div>Not Found</div> },
];

export default app_routes;
