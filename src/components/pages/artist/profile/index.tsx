import { lazy } from "react";

const ArtistProfileCTA = lazy(() => import("./CTA"))
const ArtistProfileEventType = lazy(() => import("./EventType"))
const ArtistProfileGenre = lazy(() => import("./Genre"))
const ArtistProfileHeroSec = lazy(() => import("./HeroSection"))
const ArtistProfileMainContent = lazy(() => import("./MainContent"))
const ArtistProfileQuickInfo = lazy(() => import("./QuickInfo"))

export {
    ArtistProfileCTA,
    ArtistProfileEventType,
    ArtistProfileGenre,
    ArtistProfileHeroSec,
    ArtistProfileMainContent,
    ArtistProfileQuickInfo
}