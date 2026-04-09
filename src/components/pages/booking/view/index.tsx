import { lazy } from "react";

import BookingNotFound from "./BookingNotFound";
const BookingHeader = lazy(() => import('./BookingHeader'));
const AdditionalInfo = lazy(() => import('./AdditionalInfo'));
const ParticipantInfo = lazy(() => import('./ParticipantInfo'));
const EventDetails = lazy(() => import('./EventDetails'));

export {
    BookingNotFound,
    BookingHeader,
    AdditionalInfo,
    ParticipantInfo,
    EventDetails
}