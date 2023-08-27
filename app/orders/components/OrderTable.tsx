"use client";

import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { EditIcon } from "@/components/icons/EditIcon";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useCallback } from "react";
import { Order } from "../actions/actions";
import { ProductVariant } from "@/app/product-variants/create/actions";
import { Product } from "@/app/products/actions/actions";
import { Chip } from "@nextui-org/chip";

import { generateColorByText } from "@/utils/random-color";
import { format } from "date-fns";
import { OrderStatus } from "@/features/order/OrderCreate";

type OrderTableProps = {
  orders: Order[];
  onActionEdit?: (order: Order) => void;
  onActionDelete?: (order: Order) => void;
};

const columns = [
  { name: "ID", uid: "id" },
  { name: "PRODUCT", uid: "product" },
  { name: "PRODUCT VARIANT", uid: "productVariant" },
  { name: "QTY", uid: "qty" },
  { name: "UNIT PRICE", uid: "unitPrice" },
  { name: "ORDER DATE", uid: "orderDate" },
  { name: "STATUS", uid: "status" },
  // { name: "TRACKING NO", uid: "trackingNo" },
  { name: "CREATED AT", uid: "createdAt" },
  { name: "ACTIONS", uid: "actions" },
];

export const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Pending:
      return "warning";
    case OrderStatus.Preparing:
      return "default";
    case OrderStatus.Delivering:
      return "primary";
    case OrderStatus.Shipped:
      return "success";
    default:
      return "default";
  }
};

const OrderTable = ({
  orders,
  onActionEdit,
  onActionDelete,
}: OrderTableProps) => {
  const renderCell = useCallback(
    (item: Order, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof Order];

      switch (columnKey) {
        case "id":
          const textId = cellValue as string;

          return `${textId.slice(0, 4)}...${textId.slice(
            textId.length - 4,
            textId.length,
          )}`;

        case "product":
          return (cellValue as Product | ProductVariant)?.name;

        case "orderDate":
          return format(new Date(cellValue as string), "dd MMM yyyy");

        case "createdAt":
          return format(new Date(cellValue as string), "dd MMM yyyy HH:mm");

        case "status":
          return (
            <Chip size="sm" color={getStatusColor(cellValue as OrderStatus)}>
              {cellValue as OrderStatus}
            </Chip>
          );

        case "productVariant":
          return (
            <div className="space-x-1 space-y-1">
              {[item.productVariant?.name].map((name) => (
                <Chip
                  style={{
                    backgroundColor: generateColorByText({
                      text: item.productVariant?.name || "",
                    }),
                  }}
                  size="sm"
                  key={name}
                  className="whitespace-nowrap"
                >
                  {name}
                </Chip>
              ))}
            </div>
          );

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
          return cellValue as string;
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
      <TableBody items={orders}>
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

export default OrderTable;
