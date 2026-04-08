import { BookingForm } from '../../../forms/protected'
import { CardSection, PageMeta } from '../../../components/shared'


const BookingPage = () => {
    return (
        <div>
            <PageMeta title="Booking" />
            <CardSection title="Package">
                <BookingForm />
            </CardSection>
        </div>
    )
}

export default BookingPage
