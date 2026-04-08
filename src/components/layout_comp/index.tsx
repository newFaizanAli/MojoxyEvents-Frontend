import { lazy } from "react";

const Footer = lazy(() => import("./footer"));
const Header = lazy(() => import("./header"));
const Sidebar = lazy(() => import(("./sidebar")))
const GridShape = lazy(() => import("./auth/GridShape"));



export { Header, Footer, Sidebar, GridShape };