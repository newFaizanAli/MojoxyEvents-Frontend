import { PageMeta } from "../../../components/shared"
import CategoriesTable from "../../../tables/CategoriesTable"


const CategoryList = () => {
    return (
        <div>
            <PageMeta title="Categories List" />
            <div className="space-y-6">
                <CategoriesTable />
            </div>
        </div>
    )
}

export default CategoryList
