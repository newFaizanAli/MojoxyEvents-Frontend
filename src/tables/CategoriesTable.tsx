import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { PencilIcon, TrashBinIcon } from "../icons";
import { Category } from "../types";
import { useCategoryStore } from "../store";
import { ROUTES_PATHS } from "../routes/route_paths";
import DataTable from "../components/tables/data_table";
import { Button } from "../components/ui/forms";

const CategoriesTable = () => {
    const navigate = useNavigate();
    const { categories, deleteCategory, fetchCategories, isFetched } = useCategoryStore();


    const handleEdit = useCallback(
        (slug: string) => {
            navigate(ROUTES_PATHS.DASHBOARD.CATEGORY.BASE(slug));
        },
        [navigate]
    );

    const handleDelete = useCallback(
        (id: string) => {
            const confirmed = confirm("Are you sure you want to delete this category?");

            if (!confirmed) return;

            deleteCategory(id);
        },
        [deleteCategory]
    );


    const columns = useMemo(
        () => [
            {
                title: "Slug",
                render: (c) => c.slug,
            },
            {
                title: "Name",
                render: (c) => c.name,
            },
            {
                title: "Actions",
                render: (u: Category) => (
                    <div className="flex justify-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(u.slug!)}
                        >
                            <PencilIcon className="h-4 w-4 me-2" />
                            Edit
                        </Button>

                        <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(u._id!)}
                        >
                            <TrashBinIcon className="h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                ),
            },
        ],
        [handleEdit, handleDelete]
    );

    return (
        <DataTable<Category>
            title="Category"
            addPath={ROUTES_PATHS.DASHBOARD.CATEGORY.BASE("")}
            data={categories}
            isFetched={isFetched}
            fetchData={fetchCategories}
            columns={columns}
            enableSearch={true}
            searchKeys={["name", "slug"]}
        />
    );
};

export default CategoriesTable;