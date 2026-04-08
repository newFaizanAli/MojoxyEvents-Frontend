import { CardSection, PageMeta } from "../../../components/shared"
import { CategoryForm } from "../../../forms/protected"


const CategoryPage = () => {
    return (
        <div>
            <PageMeta title="Category" />
            <CardSection title="Category">
                <CategoryForm />
            </CardSection>

        </div>
    )
}

export default CategoryPage
