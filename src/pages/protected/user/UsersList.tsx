import { UsersTable } from "../../../tables"
import { PageMeta } from "../../../components/shared"

const UsersList = () => {
    return (
        <div>
            <PageMeta title="Users List" />
            <div className="space-y-6">
                <UsersTable />
            </div>
        </div>
    )
}

export default UsersList
