"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { Order, deleteOrderById } from "../actions/actions";
import OrderTable from "./OrderTable";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { useState, useTransition } from "react";

const OrdersPage = ({ orders }: { orders: Order[] }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [orderState, setOrderState] = useState<Order | null>(null);

  return (
    <div className="max-w-screen-lg w-full mx-auto py-6 px-4">
      <div className="text-3xl text-center mb-4 font-extrabold">Orders</div>
      <div className="flex justify-between">
        <Card className="card mb-4 h-fit bg-background">
          <CardBody className="">
            <div className="flex space-x-2 text-sm font-bold text-white">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/orders">Orders</Link>
            </div>
          </CardBody>
        </Card>
        <div className="flex justify-end mb-4">
          <Link href="/orders/create">
            <Button color="primary">
              <FaPlus /> CREATE
            </Button>
          </Link>
        </div>
      </div>
      <div className="card shadow-md overflow-x-auto">
        {/* <ProductDetailModal
          product={productState}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        /> */}
        <ConfirmDeleteModal
          name={`Order ${orderState?.id}`}
          isOpen={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
          onDelete={() => {
            startTransition(async () => {
              await deleteOrderById(orderState?.id!);
              setIsOpenDeleteModal(false);
            });
          }}
          isLoading={isPending}
        />
        <OrderTable
          orders={orders}
          onActionEdit={(order) => {
            setOrderState(order);
          }}
          onActionDelete={(order) => {
            setOrderState(order);
            setIsOpenDeleteModal(true);
          }}
        />
      </div>
    </div>
  );
};

export default OrdersPage;
