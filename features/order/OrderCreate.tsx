"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMemo, useRef, useTransition } from "react";

import { CreateOrderInput, createOrders } from "@/app/orders/actions/actions";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem, SelectedItems } from "@nextui-org/select";
import { Product } from "@/app/products/actions/actions";
import { ProductVariant } from "@/app/product-variants/create/actions";
import { Chip } from "@nextui-org/chip";
import confetti from "canvas-confetti";

type OrderCreateProps = {
  products: Product[];
  productVariants: ProductVariant[];
};

export enum OrderStatus {
  Pending = "Pending",
  Preparing = "Preparing",
  Delivering = "Delivering",
  Shipped = "Shipped",
}

const orderStatusOptions = [
  OrderStatus.Pending,
  OrderStatus.Shipped,
  OrderStatus.Preparing,
  OrderStatus.Delivering,
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

const OrderCreate = ({ products, productVariants }: OrderCreateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateOrderInput>();
  const [isPending, startTransition] = useTransition();
  const productId = watch("productId");
  const productVariantId = watch("productVariantId");

  const handleConfetti = () => {
    confetti({});
  };

  const onSubmit: SubmitHandler<CreateOrderInput> = (data) => {
    console.log("data", data);
    startTransition(async () => {
      await createOrders(data);
      handleConfetti();
    });
  };

  const variantOptions = useMemo(
    () => productVariants.filter((pv) => pv.productId === productId),
    [productId, productVariants],
  );

  const selectedVariant = useMemo(
    () => productVariants.find((pv) => pv.productId === productId)?.price,
    [productVariantId],
  );

  return (
    <div className="max-w-screen-lg w-full mx-auto py-6 px-4">
      <div className="text-3xl text-center mb-4 font-extrabold">
        Order Create
      </div>
      <Card className="card mb-4 h-fit bg-background">
        <CardBody className="">
          <div className="flex space-x-2 text-sm font-bold text-white">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/management">Management</Link>
            <span>/</span>
            <Link href="/products">Orders</Link>
            <span>/</span>
            <Link href="/products/create">Add Order</Link>
          </div>
        </CardBody>
      </Card>
      <div>
        <div className="w-full m-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form-control w-full mb-4 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardBody className="space-y-4">
                  <div>Order Detail</div>
                  <Select
                    {...register("productId", { required: true })}
                    label="Product"
                    placeholder="Please select Product"
                    color={errors.productId ? "danger" : "default"}
                    errorMessage={errors.productId ? "ProductVariantType" : ""}
                    validationState={errors.productId ? "invalid" : "valid"}
                    variant="bordered"
                    fullWidth
                  >
                    {products.map((pvt) => (
                      <SelectItem key={pvt.id} value={pvt.id}>
                        {pvt.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    {...register("productVariantId", { required: true })}
                    label="Variant"
                    placeholder="Please select Product"
                    color={errors.productVariantId ? "danger" : "default"}
                    errorMessage={
                      errors.productVariantId ? "ProductVariantType" : ""
                    }
                    validationState={
                      errors.productVariantId ? "invalid" : "valid"
                    }
                    variant="bordered"
                    isDisabled={!variantOptions.length}
                    fullWidth
                  >
                    {variantOptions.map((pvt) => (
                      <SelectItem key={pvt.id} value={pvt.id}>
                        {pvt.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    {...register("qty", { required: true })}
                    isClearable
                    type="number"
                    label="Quantity"
                    variant="bordered"
                    placeholder="Input your quantity"
                    onClear={() => console.log("input cleared")}
                    color={errors.qty ? "danger" : "default"}
                    errorMessage={errors.qty ? "Quantity is required" : ""}
                    validationState={errors.qty ? "invalid" : "valid"}
                    fullWidth
                  />
                  <Input
                    {...register("unitPrice", { required: true })}
                    isClearable
                    type="number"
                    label="Unit Price"
                    variant="bordered"
                    placeholder="Input your unit price"
                    defaultValue={selectedVariant?.toString()}
                    color={errors.unitPrice ? "danger" : "default"}
                    errorMessage={
                      errors.unitPrice ? "Unit price is required" : ""
                    }
                    validationState={errors.unitPrice ? "invalid" : "valid"}
                    fullWidth
                  />
                  <Input
                    {...register("orderDate", { required: true })}
                    isClearable
                    type="date"
                    label="Order date"
                    variant="bordered"
                    placeholder="Input order date"
                    color={errors?.orderDate ? "danger" : "default"}
                    errorMessage={
                      errors?.orderDate ? "Order date is required" : ""
                    }
                    validationState={errors.orderDate ? "invalid" : "valid"}
                    fullWidth
                  />
                  <Select
                    {...register("status", { required: true })}
                    label="Status"
                    placeholder="Please select status"
                    color={errors.status ? "danger" : "default"}
                    errorMessage={errors.status ? "Status is required" : ""}
                    validationState={errors.status ? "invalid" : "valid"}
                    variant="bordered"
                    renderValue={(items: SelectedItems<OrderStatus>) => {
                      return items.map((item) => (
                        <div key={item.key}>
                          <Chip
                            size="sm"
                            color={getStatusColor(
                              item?.props?.value as OrderStatus,
                            )}
                          >
                            {item?.props?.value}
                          </Chip>
                        </div>
                      ));
                    }}
                    fullWidth
                  >
                    {orderStatusOptions?.map((status) => (
                      <SelectItem key={status} value={status}>
                        <Chip size="sm" color={getStatusColor(status)}>
                          {status}
                        </Chip>
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    {...register("trackingNo")}
                    isClearable
                    type="text"
                    label="Tracking No"
                    variant="bordered"
                    placeholder="Input your tracking No"
                    fullWidth
                  />
                </CardBody>
              </Card>
              <Card>
                <CardBody className="space-y-4">
                  <div>Customer Information</div>
                  <Input
                    {...register("customer.name", { required: true })}
                    isClearable
                    type="text"
                    label="Customer name"
                    variant="bordered"
                    placeholder="Input your customer name"
                    color={errors?.customer?.name ? "danger" : "default"}
                    errorMessage={
                      errors?.customer?.name ? "Customer name is required" : ""
                    }
                    validationState={
                      errors.customer?.name ? "invalid" : "valid"
                    }
                    fullWidth
                  />
                  <Input
                    {...register("customer.address", { required: true })}
                    isClearable
                    type="text"
                    label="Customer address"
                    variant="bordered"
                    placeholder="Input your customer address"
                    color={errors?.customer?.address ? "danger" : "default"}
                    errorMessage={
                      errors?.customer?.name
                        ? "Customer address is required"
                        : ""
                    }
                    validationState={
                      errors?.customer?.name ? "invalid" : "valid"
                    }
                    fullWidth
                  />
                  <Input
                    {...register("customer.tel", { required: true })}
                    isClearable
                    type="text"
                    label="Customer phone number"
                    variant="bordered"
                    placeholder="Input your customer phone number"
                    color={errors?.customer?.tel ? "danger" : "default"}
                    errorMessage={
                      errors?.customer?.tel
                        ? "Customer phone number is required"
                        : ""
                    }
                    validationState={
                      errors?.customer?.tel ? "invalid" : "valid"
                    }
                    fullWidth
                  />
                </CardBody>
              </Card>
            </div>
            <Button
              color="primary"
              type="submit"
              fullWidth
              isLoading={isPending}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderCreate;
