import { PageMeta } from '../../components/shared'
import { PasswordOTPVerifyForm } from '../../forms/auth'

const PasswordOTPVerify = () => {
    return (
        <div>
            <PageMeta title="Verify OTP for Password" />
            <PasswordOTPVerifyForm />
        </div>
    )
}

export default PasswordOTPVerify
