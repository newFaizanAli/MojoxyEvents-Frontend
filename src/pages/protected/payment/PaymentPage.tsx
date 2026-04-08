import { PaymentForm } from "../../../forms/protected"
import { CardSection, PageMeta } from "../../../components/shared"


const PaymentPage = () => {
    return (
        <div>
            <PageMeta title="Payment" />
            <CardSection title="Payment">
                <PaymentForm />
            </CardSection>
        </div>
    )
}

export default PaymentPage
