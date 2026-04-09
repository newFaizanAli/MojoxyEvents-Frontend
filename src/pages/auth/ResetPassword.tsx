import PageMeta from "../../components/shared/PageMeta"
import { ResetPasswordForm } from "../../forms/auth"

const ResetPassword = () => {
    return (
        <div>
            <PageMeta title="Reset Password" />
            <ResetPasswordForm />
        </div>
    )
}

export default ResetPassword
