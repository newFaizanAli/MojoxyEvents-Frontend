import { UserForm } from "../../../forms/protected"
import { CardSection, PageMeta } from "../../../components/shared"

const UserPage = () => {
    return (
        <div>
            <PageMeta title="User" />
            <CardSection title="User">
                <UserForm />
            </CardSection>
        </div>
    )
}

export default UserPage
