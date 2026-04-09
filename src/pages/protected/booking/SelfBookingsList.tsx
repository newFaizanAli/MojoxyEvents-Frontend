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

const INITIAL_FORM: EditFormData = {
    event_date: "",
    event_time: "",
    attendees: 0,
    budget: 0,
};

const SelfBookingsList = () => {

    const fetchSelfBookings = useBookingStore(s => s.fetchSelfBookings);
    const updateBooking = useBookingStore(s => s.updateBooking);

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<EditFormData>(INITIAL_FORM);



    useEffect(() => {
        let mounted = true;

        const load = async () => {
            setLoading(true);
            try {
                const data = await fetchSelfBookings();

                if (mounted) setBookings(data ?? []);
            } catch (err) {
                console.error("Load bookings failed:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        load();

        return () => {
            mounted = false; // prevent state update after unmount
        };
    }, [fetchSelfBookings]);


    const handleEdit = useCallback((b: Booking) => {
        if (!b?._id) return;

        setEditingId(b._id);
        setEditForm({
            event_date: b.event_date?.split("T")[0] || "",
            event_time: b.event_time || "",
            attendees: b.attendees || 0,
            budget: b.budget || 0,
        });
    }, []);


    const handleCancelEdit = useCallback(() => {
        setEditingId(null);
        setEditForm(INITIAL_FORM);
    }, []);


    const handleSaveEdit = useCallback(
        async (bookingId: string) => {
            const booking = bookings.find(b => b._id === bookingId);
            const capacity = booking?.package?.capacity;

            if (capacity && editForm.attendees > capacity) {
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
                {bookings.length === 0 ? (
                    <ZeroBooking />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SuspenseComp>
                            {bookings.map(b => {
                                const isEditing = editingId === b._id;
                                const canEdit =
                                    b.status === "pending" && !b.accepted_by_artist;

                                return (
                                    <SelfBookingCard
                                        key={b._id}
                                        booking={b}
                                        isEditing={isEditing}
                                        editForm={editForm}
                                        setEditForm={setEditForm as {
                                            (value: React.SetStateAction<Partial<EditFormData>>): void;
                                        }}
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