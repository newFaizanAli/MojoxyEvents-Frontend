import { PageMeta } from "../../../components/shared"
import { PackagesTable } from "../../../tables"


const PackageList = () => {
    return (
        <div>
            <PageMeta title="Packages List" />
            <div className="space-y-6">
                <PackagesTable />
            </div>
        </div>
    )
}

export default PackageList
