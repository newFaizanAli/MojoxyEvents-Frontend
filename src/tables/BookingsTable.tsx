import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { AudioIcon, PencilIcon, TrashBinIcon } from "../icons";
import { Booking } from "../types";
import { useBookingStore } from "../store";
import { ROUTES_PATHS } from "../routes/route_paths";
import DataTable from "../components/tables/data_table";
import { Button } from "../components/ui/forms";
import { formatDate, formatTime } from "../utilities/functions";

const BookingsTable = () => {
    const navigate = useNavigate();
    const { bookings, fetchBookings, deleteBooking, isFetched } = useBookingStore();


    const handleEdit = useCallback(
        (_id: string) => {
            navigate(ROUTES_PATHS.DASHBOARD.BOOKING.BASE, {
                state: {
                    bookingId: _id
                }
            });
        },
        [navigate]
    );

    const handleDelete = useCallback(
        (id: string) => {
            const confirmed = confirm("Are you sure you want to delete this booking?");

            if (!confirmed) return;

            deleteBooking(id);
        },
        [deleteBooking]
    );


    const columns = useMemo(
        () => [
            {
                title: "ID",
                render: (b: Booking) => b.booking_id,
            },

            {
                title: "Artist",
                render: (u: Booking) => (
                    <div className="flex justify-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(ROUTES_PATHS.PUBLIC?.ARTIST_SLUG(u?.artist?.stage_name ?? ""))}
                        >
                            <AudioIcon className="h-4 w-4 me-2" />
                            {u?.artist?.stage_name}
                        </Button>


                    </div>
                ),
            },

            {
                title: "User",
                render: (b: Booking) => (
                    <div>
                        <span className="block font-medium text-gray-800">{b.user?.name || ""}</span>
                        <span className="block text-xs text-gray-500">{b.user?.email || ""}</span>
                    </div>
                ),
            },

            {
                title: "Date",
                render: (b: Booking) => formatDate(b?.event_date ?? ""),
            },

            {
                title: "Time",
                render: (b: Booking) => formatTime(b?.event_time ?? ""),
            },
            {
                title: "Actions",
                render: (b: Booking) => (
                    <div className="flex justify-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(b._id!)}
                        >
                            <PencilIcon className="h-4 w-4 me-2" />
                            Edit
                        </Button>

                        <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(b._id!)}
                        >
                            <TrashBinIcon className="h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                ),
            },
        ],
        [handleEdit, handleDelete]
    );

    return (
        <DataTable<Booking>
            title="Bookings"
            addPath={ROUTES_PATHS.DASHBOARD.BOOKING.BASE}
            data={bookings}
            isFetched={isFetched}
            fetchData={fetchBookings}
            columns={columns}
            enableSearch={true}
            searchKeys={["booking_id"]}
        />
    );
};

export default BookingsTable;