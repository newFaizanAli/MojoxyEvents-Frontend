import { PageMeta } from "../../components/shared"
import { SignUpForm } from "../../forms/auth"


const SignUpPage = () => {
    return (
        <div>
            <PageMeta title="Sign Up" />

            <SignUpForm />
        </div>
    )
}

export default SignUpPage
