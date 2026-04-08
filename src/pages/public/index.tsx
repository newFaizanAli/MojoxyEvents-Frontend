import { lazy } from "react";
const HomePage = lazy(() => import("./Home"));
const CategoriesPage = lazy(() => import("./Categories"));
const ArtistsPage = lazy(() => import("./Artists"));
const ArtistProfile = lazy(() => import("./ArtistProfile"))


export { HomePage, CategoriesPage, ArtistsPage, ArtistProfile };