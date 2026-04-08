import { lazy } from "react";
const HeroSection = lazy(() => import("./HeroSection"));
const TopImages = lazy(() => import("./TopImages"));
const RecognizedStar = lazy(() => import("./RecognizedStar"));
const ExcellenceSection = lazy(() => import("./ExcellenceSection"));
const CategoriesSection = lazy(() => import("./CategoriesSection"));


export {
    HeroSection,
    TopImages,
    RecognizedStar,
    ExcellenceSection,
    CategoriesSection,
}