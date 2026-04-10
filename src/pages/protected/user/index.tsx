import { lazy } from "react";

const ProfilePage = lazy(() => import("./ProfilePage"));
const UsersList = lazy(() => import("./UsersList"));
const UserPage = lazy(() => import("./UserPage"));


export {
    ProfilePage,
    UsersList,
    UserPage
}


