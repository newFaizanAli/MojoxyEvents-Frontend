import { PageMeta } from "../../components/shared"
import { SignUpForm } from "../../forms/auth"


const UserSignUpPage = () => {
    return (
        <div>
            <PageMeta title="Sign Up" />

            <SignUpForm role="user" />
        </div>
    )
}

export default UserSignUpPage
