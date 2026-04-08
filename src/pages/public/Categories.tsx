import { useEffect } from "react";
import { useCategoryStore } from "../../store";
import { PageMeta } from "../../components/shared"
import CategoryCard from "../../components/pages/category/CategoryCard";


const Categories = () => {

    const { categories, fetchCategories, isFetched } = useCategoryStore();

    useEffect(() => {
        if (!isFetched) fetchCategories();
    }, [fetchCategories, isFetched]);

    return (
        <div className="relative min-h-screen flex justify-center flex-wrap">
            <PageMeta title="Categories" />
            <div className="text-center max-w-4xl">
                <h1 className="pt-20 text-[40px] sm:text-[60px] md:text-[60px] leading-tight font-bold text-gray-700">
                    Explore our <span className="text-brand-400">top performing</span>{" "}
                    categories
                </h1>

                <div className=" w-full flex flex-wrap justify-center gap-6 py-20 ">
                    {categories.map((category, idx) => (
                        <CategoryCard
                            key={idx}
                            name={category.name}
                            imgLink={
                                category.img_link instanceof File
                                    ? URL.createObjectURL(category.img_link)
                                    : category.img_link || ""
                            }
                            categId={category?._id}
                        />
                    ))}

                </div>

            </div>
        </div>
    )
}

export default Categories
