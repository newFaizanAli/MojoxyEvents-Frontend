import { PageMeta } from "../../components/shared"
import { ForgotPasswordForm } from "../../forms/auth"
const ForgotPassword = () => {
    return (
        <div>
            <PageMeta title="Forgot Password" />
            <ForgotPasswordForm />
        </div>
    )
}

export default ForgotPassword
