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
import { Tooltip } from "@nextui-org/tooltip";

import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { EditIcon } from "@/components/icons/EditIcon";
import { EyeIcon } from "@/components/icons/EyeIcon";

import { ProductVariant } from "../create/actions";

const columns = [
  { name: "ID", uid: "id" },
  { name: "NAME", uid: "name" },
  { name: "Price", uid: "price" },
  { name: "Inventory", uid: "inventory" },
  { name: "Product Id", uid: "productId" },
  { name: "ACTIONS", uid: "actions" },
];

const ProductVariantTable = ({ products }: { products: ProductVariant[] }) => {
  const renderCell = useCallback(
    (item: ProductVariant, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof ProductVariant];

      switch (columnKey) {
        case "id":
        case "productVariantTypeId":
          const textId = cellValue as string;

          return `${textId.slice(0, 4)}...${textId.slice(
            textId.length - 4,
            textId.length,
          )}`;

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit item">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete item">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
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

export default ProductVariantTable;
