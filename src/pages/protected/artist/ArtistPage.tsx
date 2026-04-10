import { useLocation } from "react-router";
import { ArtistForm } from "../../../forms/protected"
import { CardSection, PageMeta } from "../../../components/shared"



const ArtistPage = () => {
    const location = useLocation()
    const stage_name = location.state?.stage_name || null;

    return (
        <div>
            <PageMeta title="Artist" />
            <CardSection title="Artist">
                <ArtistForm stage_name={stage_name} />
            </CardSection>
        </div>
    )
}

export default ArtistPage
