import { PageMeta } from "../../components/shared"
import { SignUpForm } from "../../forms/auth"


const ArtistSignUpPage = () => {
    return (
        <div>
            <PageMeta title="Sign Up" />

            <SignUpForm role="artist" />
        </div>
    )
}

export default ArtistSignUpPage
