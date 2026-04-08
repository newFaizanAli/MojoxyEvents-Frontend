import { ArtistForm } from "../../../forms/protected"
import { CardSection, PageMeta } from "../../../components/shared"



const ArtistPage = () => {
    return (
        <div>
            <PageMeta title="Artist" />
            <CardSection title="Artist">
                <ArtistForm />
            </CardSection>
        </div>
    )
}

export default ArtistPage
