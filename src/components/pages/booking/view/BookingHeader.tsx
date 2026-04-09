
import React from 'react'
import { Booking } from '../../../../types'
import { getStatusColor } from '../../../../utilities/functions'
import { BackButton, SuspenseComp } from '../../../shared'

interface BookingHeaderProps {
    booking: Booking
}

const BookingHeader = React.memo(({ booking }: BookingHeaderProps) => {
    return (
        <SuspenseComp>
            <div className="mb-8">
                <BackButton />
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">Booking Details</h1>
                            <p className="text-brand-400">{booking.booking_id}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(booking.status)} bg-white`}>
                            {booking.status.replace('_', ' ').toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
        </SuspenseComp>
    )
})

export default BookingHeader
