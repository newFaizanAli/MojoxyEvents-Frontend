import React from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle } from 'lucide-react'
import { Artist } from '../../../../types';
import { ROUTES_PATHS } from '../../../../routes/route_paths';
import { SuspenseComp } from '../../../shared';
interface Props {
    artist: Artist;
    slug: string;
}


const BookingSuccess = React.memo(({ artist, slug }: Props) => {

    const navigate = useNavigate();

    return (
        <SuspenseComp>
            <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Submitted!</h2>
                <p className="text-gray-600 mb-6">
                    Your booking request has been sent to {artist.stage_name}. You'll receive a confirmation once the artist accepts.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate(ROUTES_PATHS?.DASHBOARD?.USER.BOOKING.LIST)}
                        className="px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700"
                    >
                        View My Bookings
                    </button>
                    <button
                        onClick={() => navigate(ROUTES_PATHS.PUBLIC.ARTIST_SLUG(slug))}
                        className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
                    >
                        Back to Profile
                    </button>
                </div>
            </div>
        </SuspenseComp>
    )
})

export default BookingSuccess
