import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { PencilIcon, TrashBinIcon } from "../icons";
import { User } from "../types";
import { useUsersStore } from "../store";
import { ROUTES_PATHS } from "../routes/route_paths";
import DataTable from "../components/tables/data_table";
import { Badge, Button } from "../components/ui/forms";

const UsersTable = () => {
  const navigate = useNavigate();
  const { users, fetchUsers, deleteUser, isFetched } = useUsersStore();


  const handleEdit = useCallback(
    (id: string) => {
      navigate(ROUTES_PATHS.DASHBOARD.USER.BASE, {
        state: { user_id: id },
      });
    },
    [navigate]
  );

  const handleDelete = useCallback(
    (id: string) => {
      const confirmed = confirm("Are you sure you want to delete this user?");

      if (!confirmed) return;

      deleteUser(id);
    },
    [deleteUser]
  );


  const columns = useMemo(
    () => [
      {
        title: "User",
        render: (u: User) => (
          <div>
            <span className="block font-medium text-gray-800">{u.name}</span>
            <span className="block text-xs text-gray-500">{u.role}</span>
          </div>
        ),
      },
      {
        title: "Email",
        render: (u: User) => u.email,
      },
      {
        title: "Phone",
        render: (u: User) => u.phone || "-",
      },
      {
        title: "Status",
        render: (u: User) => (
          <Badge size="sm" color={u.isActive ? "success" : "error"}>
            {u.isActive ? "Active" : "Blocked"}
          </Badge>
        ),
      },
      {
        title: "Actions",
        render: (u: User) => (
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
    <DataTable<User>
      title="User"
      addPath={ROUTES_PATHS.DASHBOARD.USER.BASE}
      data={users}
      isFetched={isFetched}
      fetchData={fetchUsers}
      columns={columns}
      enableSearch={true}
      searchKeys={["name", "email", "role"]}
    />
  );
};

export default UsersTable;