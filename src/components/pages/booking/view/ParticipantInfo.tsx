import React, { lazy } from "react"
import { Package, User } from "lucide-react"
import { Booking } from "../../../../types"
import { SuspenseComp } from "../../../shared"
const InfoCard = lazy(() => import("./InfoCard"))

interface BookingHeaderProps {
    booking: Booking
}

const ParticipantInfo = React.memo(({ booking }: BookingHeaderProps) => {
    return (
        <SuspenseComp>
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-brand-600" />
                    Participant Information
                </h2>

                <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    <InfoCard label="Client" value={booking.user?.name || 'N/A'} />
                    <InfoCard label="Artist" value={booking.artist?.stage_name || 'N/A'} />
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Package className="w-5 h-5 text-brand-600" />
                        <label className="text-xs font-medium text-slate-500 uppercase">Package</label>
                    </div>
                    <p className="text-slate-900 font-medium">{booking.package?.title || 'No package'}</p>
                    <p className="text-sm text-slate-600 mt-1">Capacity: {booking.package?.capacity || 'N/A'} people</p>
                </div>
            </div>
        </SuspenseComp>
    )
})

export default ParticipantInfo
