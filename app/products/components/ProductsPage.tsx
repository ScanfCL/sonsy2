"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import ProductDetailModal from "./ProductDetailModal";
import ProductTable from "./ProductTable";
import { Product, deleteProductById } from "../actions/actions";
import { startTransition, useState, useTransition } from "react";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";

const ProductsPage = ({ products }: { products: Product[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [productState, setProductState] = useState<Product | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="max-w-screen-lg w-full mx-auto py-6 px-4">
      <div className="text-3xl text-center mb-4 font-extrabold">
        Products Management
      </div>
      <div className="flex justify-between">
        <Card className="card mb-4 h-fit bg-background">
          <CardBody className="">
            <div className="flex space-x-2 text-sm font-bold text-white">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/management">Management</Link>
              <span>/</span>
              <Link href="/products">Products</Link>
            </div>
          </CardBody>
        </Card>
        <div className="flex justify-end mb-4">
          <Link href="/products/create">
            <Button color="primary">
              <FaPlus /> CREATE
            </Button>
          </Link>
        </div>
      </div>
      <div className="card shadow-md overflow-x-auto">
        <ProductDetailModal
          product={productState}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
        <ConfirmDeleteModal
          name={`Product ${productState?.name}`}
          isOpen={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
          onDelete={() => {
            startTransition(async () => {
              await deleteProductById(productState?.id!);
              setIsOpenDeleteModal(false);
            });
          }}
          isLoading={isPending}
        />
        <ProductTable
          products={products}
          onActionEdit={(product) => {
            setProductState(product);
            setIsOpen(true);
          }}
          onActionDelete={(product) => {
            setProductState(product);
            setIsOpenDeleteModal(true);
          }}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
