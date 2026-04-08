import { lazy } from "react";

const BookingHeader = lazy(() => import('./BookingHeader'))
const BookingStepper = lazy(() => import('./BookingStepper'))
const BookingPackageEvent = lazy(() => import('./BookingPackageEvent'))
const BookingDateTimeLoc = lazy(() => import('./BookingDateTimeLoc'))
const BookingBudget = lazy(() => import('./BookingBudget'))
const BookingSuccess = lazy(() => import('./BookingSuccess'))


export { BookingHeader, BookingStepper, BookingPackageEvent, BookingDateTimeLoc, BookingBudget, BookingSuccess }