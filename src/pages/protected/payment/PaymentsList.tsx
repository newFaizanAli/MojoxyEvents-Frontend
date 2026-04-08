import { PaymentsList } from '../../../tables'
import { PageMeta } from '../../../components/shared'

const PaymentList = () => {
    return (
        <div>
            <PageMeta title="Payments List" />
            <div className="space-y-6">
                <PaymentsList />
            </div>

        </div>
    )
}

export default PaymentList
