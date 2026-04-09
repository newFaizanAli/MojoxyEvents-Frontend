import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Booking } from '../../../types';
import { useBookingStore } from '../../../store';
import { Loader, PageMeta } from '../../../components/shared';
import {
    BookingHeader, AdditionalInfo,
    BookingNotFound, ParticipantInfo,
    EventDetails
} from '../../../components/pages/booking/view';


const ViewBookingPage = React.memo(() => {
    const { booking_id } = useParams<{ booking_id: string }>();
    const { fetchBookingById } = useBookingStore();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);


    const loadBooking = useCallback(async () => {
        if (!booking_id) return;

        try {
            setLoading(true);
            const data = await fetchBookingById(booking_id);

            setBooking(data);

        } catch (error) {
            console.error('Failed to load booking:', error);
        } finally {
            setLoading(false);
        }
    }, [booking_id, fetchBookingById]);

    useEffect(() => {
        loadBooking();
    }, [loadBooking]);


    if (loading) {
        return (
            <Loader />
        );
    }

    if (!booking) {
        return (
            <BookingNotFound />
        );
    }

    return (
        <>
            <PageMeta
                title={`Booking Details`}
            />
            <div className="min-h-screen bg-gradient-to-brsm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <BookingHeader booking={booking} />

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                        <div className="p-6 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <ParticipantInfo booking={booking} />
                                <EventDetails booking={booking} />
                            </div>

                            <AdditionalInfo booking={booking} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default ViewBookingPage;