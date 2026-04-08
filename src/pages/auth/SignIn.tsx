import PageMeta from "../../components/shared/PageMeta";
import { SignInForm } from "../../forms/auth";

const SignInPage = () => {
    return (
        <div>
            <PageMeta title="Sign In" />

            <SignInForm />

        </div>
    );
};

export default SignInPage;
