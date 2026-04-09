import React, { lazy } from "react"
import { Booking } from "../../../../types"
import { SuspenseComp } from "../../../shared"
const InfoCard = lazy(() => import("./InfoCard"))

interface BookingHeaderProps {
    booking: Booking
}

const AdditionalInfo = React.memo(({ booking }: BookingHeaderProps) => {
    return (
        <SuspenseComp>
            <div className="border-t border-slate-200 pt-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Additional Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <InfoCard label="Event Type" value={booking?.event_type || 'N/A'} />
                    <InfoCard label="Payment Status" value={booking?.payment ? 'Completed' : 'Pending'} />
                    <InfoCard label="Accepted by User" value={booking?.accepted_by_user ? 'Yes' : 'No'} />
                    <InfoCard label="Accepted by Artist" value={booking?.accepted_by_artist ? 'Yes' : 'No'} />
                </div>
            </div>
        </SuspenseComp>
    )
}
)
export default AdditionalInfo
