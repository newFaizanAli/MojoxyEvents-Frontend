import { PageMeta } from "../../../components/shared"
import { ArtistsTable } from "../../../tables"

const ArtistsList = () => {
    return (
        <div>
            <PageMeta title="Artists List" />
            <div className="space-y-6">
                <ArtistsTable />
            </div>
        </div>
    )
}

export default ArtistsList
