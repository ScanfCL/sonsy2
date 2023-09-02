"use client";

import { Link } from "@nextui-org/link";
import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import { useTransition } from "react";
import { ProductVariant, createProductVariants } from "./actions";
import { ProductVariantType } from "../../product-variant-types/create/actions";
import { Variant } from "../../variants/actions";
import { Card, CardBody } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

type Input = Omit<ProductVariant, "id">;

const ProductCreate = ({
  productVariantTypes,
  variants,
}: {
  productVariantTypes: ProductVariantType[];
  variants: Variant[];
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<Input> = (data) => {
    startTransition(async () => {
      await createProductVariants(data);
    });
  };

  return (
    <div className="max-w-screen-lg w-full mx-auto py-6 px-4">
      <div className="text-3xl text-center mb-4 font-extrabold">
        Product Variants Create
      </div>
      <Card className="px-4 mb-4 bg-background">
        <CardBody className="">
          <div className="flex space-x-2 text-sm font-bold text-white">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/management">Management</Link>
            <span>/</span>
            <Link href="/product-variants">Product Variants</Link>
            <span>/</span>
            <Link href="/product-variants/create">Add Product Variant</Link>
          </div>
        </CardBody>
      </Card>
      <div className="grid grid-cols-1 gap-4">
        <Card className="max-w-[600px] w-full m-auto">
          <CardBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full mb-4 space-y-4"
            >
              <Input
                {...register("name", { required: true })}
                isClearable
                type="text"
                label="Name"
                color={errors.name ? "danger" : "default"}
                variant="bordered"
                placeholder="Input your product name"
                errorMessage={errors.name ? "Name is required" : ""}
                fullWidth
              />
              <Input
                {...register("price", { required: true })}
                isClearable
                type="number"
                label="Price"
                color={errors.price ? "danger" : "default"}
                variant="bordered"
                placeholder="Input your price"
                errorMessage={errors.price ? "Name is required" : ""}
                defaultValue="0"
                fullWidth
              />
              <Input
                {...register("inventory", { required: true })}
                isClearable
                type="number"
                label="Inventory"
                color={errors.inventory ? "danger" : "default"}
                variant="bordered"
                placeholder="Input your inventory"
                errorMessage={errors.inventory ? "Name is required" : ""}
                defaultValue="0"
                fullWidth
              />
              <Button
                color="primary"
                type="submit"
                fullWidth
                isLoading={isPending}
              >
                Create
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProductCreate;
