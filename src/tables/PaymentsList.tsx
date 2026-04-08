import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { PencilIcon, TrashBinIcon } from "../icons";
import { Payment } from "../types";
import { usePaymentStore } from "../store";
import { ROUTES_PATHS } from "../routes/route_paths";
import DataTable from "../components/tables/data_table";
import { Button } from "../components/ui/forms";

const PaymentsTable = () => {
    const navigate = useNavigate();
    const { payments, fetchPayments, deletePayment, isFetched } = usePaymentStore();


    const handleEdit = useCallback(
        (id: string) => {
            navigate(ROUTES_PATHS.DASHBOARD.PAYMENT.BASE, {
                state: { payment_id: id },
            });
        },
        [navigate]
    );

    const handleDelete = useCallback(
        (id: string) => {
            const confirmed = confirm("Are you sure you want to delete this payment?");

            if (!confirmed) return;

            deletePayment(id);
        },
        [deletePayment]
    );


    const columns = useMemo(
        () => [
            {
                title: "ID",
                render: (p: Payment) => p.payment_id,
            },
            {
                title: "Actions",
                render: (u: Payment) => (
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
        <DataTable<Payment>
            title="Payment"
            addPath={ROUTES_PATHS.DASHBOARD.PAYMENT.BASE}
            data={payments}
            isFetched={isFetched}
            fetchData={fetchPayments}
            columns={columns}
            enableSearch={true}
            searchKeys={["payment_id", "receipt_url"]}
        />
    );
};

export default PaymentsTable;