import { useEffect, useState } from "react";
import { Booking } from "../../../types";
import { useBookingStore } from "../../../store";
import { Loader, PageMeta } from "../../../components/shared";
import { ArtistBookingCard } from "../../../components/pages/booking";

const ArtistBookingsList = () => {
    const { fetchArtistBookings, acceptArtistBooking } = useBookingStore();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [acceptingId, setAcceptingId] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'in_progress' | 'cancel'>('all');


    const handleAcceptBooking = async (bookingId: string): Promise<void> => {
        if (!confirm('Are you sure you want to accept this booking?')) {
            return;
        }

        try {
            setAcceptingId(bookingId);
            await acceptArtistBooking(bookingId);
            // await loadBookings();
        } catch (error) {
            console.error('Failed to accept booking:', error);
            alert('Failed to accept booking. Please try again.');
        } finally {
            setAcceptingId(null);
        }
    };

    const loadBookings = async () => {
        try {
            setLoading(true);
            const res = await fetchArtistBookings();

            const bookingsArray = Array.isArray(res)
                ? res
                : Array.isArray(res)
                    ? res
                    : [];

            setBookings(bookingsArray);

        } catch (error) {
            console.error('Failed to load bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const filteredBookings = filter === 'all'
        ? bookings
        : bookings?.filter(booking => booking?.status === filter) || [];

    if (loading) {
        return <Loader />;
    }

    const booking_status = ['all', 'pending', 'in_progress', 'approved', 'cancel'] as const

    return (
        <div className="min-h-screen sm:p-6 lg:p-8">
            <PageMeta title="Artist Bookings" />
            <div className="max-w-7xl mx-auto">
                <div className="px-2 pr-14 mb-6">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800">
                        Artist Bookings
                    </h4>
                    <p className="mb-4 text-sm text-gray-500">
                        Manage your booking requests and accepted bookings
                    </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {booking_status?.map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                                ? 'bg-brand-600 text-white'
                                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                            {status !== 'all' && (
                                <span className="ml-2 text-xs">
                                    ({bookings?.filter(b => b?.status === status).length})
                                </span>
                            )}
                            {status === 'all' && (
                                <span className="ml-2 text-xs">({bookings.length})</span>
                            )}
                        </button>
                    ))}
                </div>

            </div>

            <div className="p-3">
                {filteredBookings?.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <p className="text-slate-600">
                            {filter === 'all'
                                ? 'No bookings found'
                                : `No ${filter} bookings`}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBookings?.map((booking) => {
                            const canAccept = booking?.status === 'pending' && !booking.accepted_by_artist;

                            return (

                                <ArtistBookingCard
                                    key={booking?._id}
                                    booking={booking}
                                    canAccept={canAccept}
                                    isAccepting={acceptingId === booking?._id}
                                    handleAcceptBooking={handleAcceptBooking}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ArtistBookingsList
