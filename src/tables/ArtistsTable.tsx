import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { BoxCubeIcon, PencilIcon, TrashBinIcon } from "../icons";
import { ROUTES_PATHS } from "../routes/route_paths";
import { Artist } from "../types";
import { useArtistStore } from "../store";
import { Button } from "../components/ui/forms";
import DataTable from "../components/tables/data_table";

const AristsTable = () => {
    const navigate = useNavigate();

    const { artists, fetchArtists, deleteArtist, isFetched } = useArtistStore();

    const handleEdit = useCallback(
        (stage_name: string) => {
            navigate(ROUTES_PATHS.DASHBOARD.ARTIST.BASE(stage_name));
        },
        [navigate]
    );

    const handleDelete = useCallback(
        (id: string) => {
            const confirmed = confirm("Are you sure you want to delete this artist?");

            if (!confirmed) return;

            deleteArtist(id);
        },
        [deleteArtist]
    );


    const columns = useMemo(
        () => [
            {
                title: "Image",
                render: (a: {
                    img_link: File | string;
                }) => (
                    <img
                        src={
                            a.img_link instanceof File
                                ? URL.createObjectURL(a.img_link)
                                : a.img_link || ""
                        }
                        className="max-h-16 mx-auto rounded border"
                    />
                ),
            },
            {
                title: "Stage Name",
                render: (a: Artist) => a.stage_name,
            },
            {
                title: "Category",
                render: (a: Artist) => a?.category?.name,
            },
            {
                title: "Package",
                render: (a: Artist) => (
                    <Button
                        variant="primary"
                        onClick={() =>
                            navigate(ROUTES_PATHS?.DASHBOARD?.PACKAGE?.BASE(""), {
                                state: { artistId: a?._id }
                            })
                        }
                    >
                        <BoxCubeIcon className="h-4 w-4" /> Package
                    </Button>
                ),
            },
            {
                title: "Actions",
                render: (a: Artist) => (
                    <>
                        <Button
                            variant="outline"
                            className="me-2"
                            onClick={() =>
                                navigate(ROUTES_PATHS?.DASHBOARD?.ARTIST?.BASE(a?.stage_name))
                            }
                        >
                            <PencilIcon className="h-4 w-4 me-2" />
                            Edit
                        </Button>

                        <Button
                            variant="danger"
                            onClick={() => deleteArtist(a?._id ?? "")}
                        >
                            <TrashBinIcon className="h-4 w-4" />
                            Delete
                        </Button>
                    </>
                ),
            },
        ],
        [handleEdit, handleDelete]
    );

    return (
        <DataTable<Artist>
            title="Artist"
            addPath={ROUTES_PATHS.DASHBOARD.ARTIST.BASE("")}
            data={artists}
            isFetched={isFetched}
            fetchData={fetchArtists}
            columns={columns}
            enableSearch={true}
            searchKeys={["stage_name"]}
        />
    );
};

export default AristsTable;