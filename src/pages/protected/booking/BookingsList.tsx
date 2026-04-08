import { BookingsTable } from "../../../tables"
import { PageMeta } from "../../../components/shared"



const BookingsList = () => {
    return (
        <div>
            <PageMeta title="Bookings List" />
            <div className="space-y-6">
                <BookingsTable />
            </div>
        </div>
    )
}

export default BookingsList
