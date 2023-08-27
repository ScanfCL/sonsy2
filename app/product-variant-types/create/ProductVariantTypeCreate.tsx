"use client";

import { Link } from "@nextui-org/link";
import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import { useTransition } from "react";

import { createProductVariantTypes } from "./actions";
import { Product } from "../../products/actions/actions";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";

type CreateProduct = { id: string; name: string; productId: string };
type Input = Omit<CreateProduct, "id">;

const ProductVariantTypeCreate = ({ products }: { products: Product[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<Input> = (data) => {
    startTransition(async () => {
      await createProductVariantTypes(data);
    });
  };

  return (
    <div className="max-w-screen-lg w-full mx-auto py-6 px-4">
      <div className="text-3xl text-center mb-4 font-extrabold">
        Product Variant Type Create
      </div>
      <Card className="bg-background px-4 mb-4">
        <CardBody>
          <div className="flex space-x-2 text-sm font-bold text-white">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/management">Management</Link>
            <span>/</span>
            <Link href="/product-variant-types">ProductVariantTypes</Link>
            <span>/</span>
            <Link href="/product-variant-types/create">Add Product</Link>
          </div>
        </CardBody>
      </Card>
      <div className="grid grid-cols-1 gap-4">
        <Card className="max-w-[600px] w-full m-auto">
          <CardBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-control w-full mb-4 space-y-4"
            >
              <Input
                {...register("name", { required: true })}
                isClearable
                type="text"
                label="Name"
                color={errors.name ? "danger" : "default"}
                variant="bordered"
                placeholder="Input your product name"
                onClear={() => console.log("input cleared")}
                errorMessage={errors.name ? "Name is required" : ""}
                fullWidth
              />
              <Select
                {...register("productId", { required: true })}
                isRequired
                label=" Product"
                placeholder="Please select Product"
                defaultSelectedKeys={["cat"]}
                color={errors.productId ? "danger" : "default"}
                errorMessage={errors.productId ? "ProductVariantType" : ""}
                variant="bordered"
                fullWidth
              >
                {products.map((pvt) => (
                  <SelectItem key={pvt.id} value={pvt.id}>
                    {pvt.name}
                  </SelectItem>
                ))}
              </Select>
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

export default ProductVariantTypeCreate;
