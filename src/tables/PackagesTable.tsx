import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { PencilIcon, TrashBinIcon } from "../icons";
import { Package } from "../types";
import { usePackageStore } from "../store";
import { ROUTES_PATHS } from "../routes/route_paths";
import DataTable from "../components/tables/data_table";
import { Button } from "../components/ui/forms";

const PackagesTable = () => {
    const navigate = useNavigate();

    const { artist_packages, fetchPackages, deletePackage, isFetched } = usePackageStore();

    const handleEdit = useCallback(
        (package_id: string) => {
            navigate(ROUTES_PATHS.DASHBOARD.PACKAGE.BASE(package_id));
        },
        [navigate]
    );

    const handleDelete = useCallback(
        (id: string) => {
            const confirmed = confirm("Are you sure you want to delete this package?");

            if (!confirmed) return;

            deletePackage(id);
        },
        [deletePackage]
    );


    const columns = useMemo(
        () => [
            {
                title: "Title",
                render: (p) => p.title,
            },
            {
                title: "Artist",
                render: (p) => p?.artist?.stage_name,
            },
            {
                title: "Actions",
                render: (u: Package) => (
                    <div className="flex justify-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(u._id!)}
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
        <DataTable<Package>
            title="Package"
            addPath={ROUTES_PATHS.DASHBOARD.PACKAGE.BASE("")}
            data={artist_packages}
            isFetched={isFetched}
            fetchData={fetchPackages}
            columns={columns}
            enableSearch={true}
            searchKeys={["title"]}
        />
    );
};

export default PackagesTable;