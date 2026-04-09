import { Calendar } from 'lucide-react'
import React from 'react'

const ZeroBooking = React.memo(() => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-slate-400 mb-4">
                <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No bookings yet</h3>
            <p className="text-slate-600">Your bookings will appear here once you make one.</p>
        </div>
    )
})

export default ZeroBooking
