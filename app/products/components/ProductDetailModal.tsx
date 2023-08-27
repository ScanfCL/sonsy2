"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Product, updateProductById } from "../actions/actions";
import { Input } from "@nextui-org/input";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateProduct = { id: string; name: string; description: string };
type Input = Omit<CreateProduct, "id">;

const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
}: {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<Input> = (data) => {
    startTransition(async () => {
      if (product) {
        await updateProductById(product.id, [
          product.id,
          data.name,
          data.description,
        ]);
      }
      await onClose();
    });
  };

  return (
    <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-control w-full mb-4 space-y-4"
            >
              <ModalHeader className="flex flex-col gap-1">
                Product Detail
              </ModalHeader>
              <ModalBody>
                {" "}
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
                  defaultValue={product?.name}
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
                  defaultValue={product?.description}
                  errorMessage={
                    errors.description ? "Description is required" : ""
                  }
                  fullWidth
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="secondary" type="submit" isLoading={isPending}>
                  Save
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProductDetailModal;
