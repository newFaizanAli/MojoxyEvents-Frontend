import { useCallback, useEffect, useState } from "react";
import { Booking } from "../../../types";
import { useBookingStore } from "../../../store";
import { Loader, PageMeta, SuspenseComp } from "../../../components/shared";
import { ZeroBooking, SelfBookingCard } from "../../../components/pages/booking";

interface EditFormData {
    event_date: string;
    event_time: string;
    attendees: number;
    budget: number;
}

const SelfBookingsList = () => {
    const { fetchSelfBookings, updateBooking } = useBookingStore();

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<EditFormData>>({});


    const loadBookings = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchSelfBookings();
            setBookings(data ?? []);
        } catch (err) {
            console.error("Load bookings failed:", err);
        } finally {
            setLoading(false);
        }
    }, [fetchSelfBookings]);

    useEffect(() => {
        loadBookings();
    }, [loadBookings]);


    const handleEdit = useCallback((booking: Booking) => {
        if (!booking._id) return;

        setEditingId(booking._id);
        setEditForm({
            event_date: booking.event_date?.split("T")[0] ?? "",
            event_time: booking.event_time ?? "",
            attendees: booking.attendees ?? 0,
            budget: booking.budget ?? 0,
        });
    }, []);

    const handleCancelEdit = useCallback(() => {
        setEditingId(null);
        setEditForm({});
    }, []);

    const handleSaveEdit = useCallback(
        async (bookingId: string) => {
            const booking = bookings.find(b => b._id === bookingId);
            const capacity = booking?.package?.capacity;

            if (capacity && editForm.attendees && editForm.attendees > capacity) {
                alert(`Max capacity is ${capacity}`);
                return;
            }

            try {
                await updateBooking(bookingId, editForm);


                setBookings(prev =>
                    prev.map(b =>
                        b._id === bookingId ? { ...b, ...editForm } : b
                    )
                );

                handleCancelEdit();
            } catch (err) {
                console.error("Update failed:", err);
            }
        },
        [bookings, editForm, updateBooking, handleCancelEdit]
    );

    const hasBookings = bookings.length > 0;

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen sm:p-6 lg:p-8">
            <PageMeta title="My Bookings" />

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800">
                        My Bookings
                    </h4>
                    <p className="mb-6 text-sm text-gray-500">
                        View and manage your event bookings
                    </p>
                </div>

                {/* Content */}
                {!hasBookings ? (
                    <ZeroBooking />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SuspenseComp>
                            {bookings.map(booking => {
                                const isEditing = editingId === booking._id;
                                const canEdit =
                                    booking.status === "pending" &&
                                    !booking.accepted_by_artist;

                                return (
                                    <SelfBookingCard
                                        key={booking._id}
                                        booking={booking}
                                        isEditing={isEditing}
                                        editForm={editForm}
                                        setEditForm={setEditForm}
                                        canEdit={canEdit}
                                        handleEdit={handleEdit}
                                        handleCancelEdit={handleCancelEdit}
                                        handleSaveEdit={handleSaveEdit}
                                    />
                                );
                            })}
                        </SuspenseComp>
                    </div>
                )}

            </div>
        </div>
    );
};

export default SelfBookingsList;