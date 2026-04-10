import { lazy } from "react";

const CategoriesList = lazy(() => import("./CategoriesList"))
const CategoryPage = lazy(() => import("./CategoryPage"))

export {
    CategoriesList,
    CategoryPage
}