import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { SuspenseComp } from "../shared";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table/table";
import { Button, Input } from "../ui/forms";

interface Column<T> {
    title: string;
    render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    title: string;
    addPath: string;

    data: T[];
    columns: Column<T>[];

    isFetched: boolean;
    fetchData: () => void;

    enableSearch?: boolean;
    searchKeys?: (keyof T)[];
}

function DataTable<T>({
    title,
    addPath,
    data,
    columns,
    isFetched,
    fetchData,
    enableSearch = false,
    searchKeys = [],
}: DataTableProps<T>) {

    const [search, setSearch] = useState("");
    const navigate = useNavigate()


    useEffect(() => {
        if (!isFetched) fetchData();
    }, [isFetched, fetchData]);


    const filteredData = useMemo(() => {
        if (!enableSearch || !search) return data;

        return data.filter((item) =>
            searchKeys.some((key) =>
                String(item[key] ?? "")
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
        );
    }, [data, search, enableSearch, searchKeys]);


    useEffect(() => {
        if (!isFetched) fetchData();
    }, [isFetched, fetchData]);

    return (
        <SuspenseComp>
            <div className="main">

                {/* Header */}
                <div className="flex justify-between items-center my-4 gap-4">
                    <h4 className="text-xl font-semibold text-gray-800">
                        {title} List
                    </h4>

                    <div className="flex items-center gap-3">

                        {/* ✅ SEARCH FIELD */}
                        {enableSearch && (
                            <div className="w-64">
                                <Input
                                    placeholder={`Search ${title}...`}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        )}

                        <Button
                            variant="primary"
                            onClick={() => (navigate(addPath))}
                        >
                            Add {title}
                        </Button>

                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <div className="max-w-full overflow-x-auto">

                        <Table>

                            {/* Head */}
                            <TableHeader className="border-b border-gray-100 text-center">
                                <TableRow>
                                    {columns.map((col, i) => (
                                        <TableCell key={i} isHeader className="px-5 py-3">
                                            {col.title}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHeader>

                            {/* Body */}
                            <TableBody className="divide-y divide-gray-100 text-center">
                                {filteredData.map((row, i) => (
                                    <TableRow key={i}>
                                        {columns.map((col, j) => (
                                            <TableCell key={j} className="px-4 py-3">
                                                {col.render(row)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>

                    </div>
                </div>
            </div>
        </SuspenseComp>
    );
}

export default DataTable;
