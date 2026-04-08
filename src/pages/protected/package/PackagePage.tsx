import { PackageForm } from "../../../forms/protected"
import { CardSection, PageMeta } from "../../../components/shared"



const PackagePage = () => {
    return (
        <div>
            <PageMeta title="Package" />
            <CardSection title="Package">
                <PackageForm />
            </CardSection>
        </div>
    )
}

export default PackagePage
