"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import { useTransition } from "react";

import { createProduct } from "../actions/actions";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

type CreateProduct = { id: string; name: string; description: string };
type Input = Omit<CreateProduct, "id">;

const ProductCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<Input> = (data) => {
    startTransition(async () => {
      await createProduct(data);
    });
  };

  return (
    <div className="max-w-screen-lg w-full mx-auto py-6 px-4">
      <div className="text-3xl text-center mb-4 font-extrabold">
        Product Create
      </div>
      <Card className="card mb-4 h-fit bg-background">
        <CardBody className="">
          <div className="flex space-x-2 text-sm font-bold text-white">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/management">Management</Link>
            <span>/</span>
            <Link href="/products">Products</Link>
            <span>/</span>
            <Link href="/products/create">Add Product</Link>
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
              <Input
                {...register("description", { required: true })}
                isClearable
                type="text"
                label="Description"
                variant="bordered"
                placeholder="Input your product description"
                color={errors.description ? "danger" : "default"}
                onClear={() => console.log("input cleared")}
                errorMessage={
                  errors.description ? "Description is required" : ""
                }
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
