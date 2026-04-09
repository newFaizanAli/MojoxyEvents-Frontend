import { CardSection, PageMeta } from "../../../components/shared";
import { ProfileForm } from "../../../forms/auth";


const ProfilePage = () => {
    return (
        <div>
            <PageMeta title="Profile" />
            <CardSection title="View Profile">
                <ProfileForm />
            </CardSection>
        </div>
    );
};

export default ProfilePage;
