import { lazy } from "react";

const PackagePage = lazy(() => import("./PackagePage"))
const PackagesList = lazy(() => import("./PackagesList"))

export {
    PackagePage,
    PackagesList
}