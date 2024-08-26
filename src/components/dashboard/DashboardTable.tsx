"use client";
import { Pagination } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { useMemo, useState } from "react";

export default function DashboardTable({
  columns,
  rows,
}: {
  columns: {
    key: string;
    label: string;
  }[];
  rows: any[];
}) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 25;

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);
  return (
    <Table
      isStriped
      removeWrapper
      aria-label="Full width custom table with data specific to this page."
      className="my-4"
      bottomContent={
        rows.length >= rowsPerPage && (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="success"
              size="lg"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        )
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"Nu există date de afișat."} items={items}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell className="align-text-top">
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
