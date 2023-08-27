"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useCallback } from "react";

import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { EditIcon } from "@/components/icons/EditIcon";
import { EyeIcon } from "@/components/icons/EyeIcon";

import { Product } from "../actions/actions";
import { on } from "events";

type ProductTableProps = {
  products: Product[];
  onActionEdit?: (product: Product) => void;
  onActionDelete?: (product: Product) => void;
};

const columns = [
  { name: "ID", uid: "id" },
  { name: "NAME", uid: "name" },
  { name: "Description", uid: "description" },
  { name: "ACTIONS", uid: "actions" },
];

const ProductTable = ({
  products,
  onActionEdit,
  onActionDelete,
}: ProductTableProps) => {
  const renderCell = useCallback(
    (item: Product, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof Product];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon
                  {...(onActionEdit && {
                    onClick: () => onActionEdit(item),
                  })}
                />
              </span>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon
                  {...(onActionDelete && {
                    onClick: () => onActionDelete(item),
                  })}
                />
              </span>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onActionDelete, onActionEdit],
  );

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={products}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
