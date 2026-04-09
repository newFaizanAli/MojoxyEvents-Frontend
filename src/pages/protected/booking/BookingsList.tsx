import { AllBookingsTable } from "../../../tables"
import { PageMeta } from "../../../components/shared"



const BookingsList = () => {
    return (
        <div>
            <PageMeta title="Bookings List" />
            <div className="space-y-6">
                <AllBookingsTable />
            </div>
        </div>
    )
}

export default BookingsList
