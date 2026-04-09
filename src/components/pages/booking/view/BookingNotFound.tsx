import React from 'react'
import { BackButton } from '../../../shared'

const BookingNotFound = React.memo(() => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <BackButton />
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Booking not found</h3>
                    <p className="text-slate-600">The booking you are looking for was not found.</p>
                </div>
            </div>
        </div>
    )
})

export default BookingNotFound
