"use client";

import Link from "next/link";
import { useForm, SubmitHandler, set } from "react-hook-form";
import classNames from "classnames";
import { useTransition, useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { useOnClickOutside } from "usehooks-ts";

import {
  Product,
  ProductVariantTypesResolveField,
  createProduct,
} from "../actions/actions";
import { createProductVariantTypeById } from "../actions/product-variant-type";
import { ProductVariant } from "@/app/product-variants/create/actions";

type Input = Omit<Product, "id">;

const ProductDetail = ({
  product,
  productVariants,
}: {
  product?: Product;
  productVariants?: ProductVariant[];
}) => {
  const [showModalVariantType, setShowModalVariantType] = useState(false);
  const [showModalVariant, setShowModalVariant] = useState(false);
  const ref = useRef(null);
  const refVariantModal = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const {
    getValues: getValuesVariantType,
    register: registerVariantType,
    formState: { errors: errorsVariantType },
  } = useForm<{ name: string }>();

  const [isPending, startTransition] = useTransition();
  const [isPendingProductVariantType, startTransitionProductVariantType] =
    useTransition();

  useOnClickOutside(ref, () => {
    setShowModalVariantType(false);
    setShowModalVariantType(false);
  });

  useOnClickOutside(refVariantModal, () => {
    setShowModalVariant(false);
    setShowModalVariant(false);
  });

  const onSubmit: SubmitHandler<Input> = (data) => {
    startTransition(async () => {
      await createProduct(data);
    });
  };

  const onSubmitVariantType = () => {
    startTransitionProductVariantType(async () => {
      const name = getValuesVariantType("name");
      const data = {
        name,
      };

      await createProductVariantTypeById(product?.id || "", data);
    });
  };

  return (
    <div className="max-w-screen-lg w-full mx-auto py-6 px-4">
      <dialog
        className={classNames("modal", { "modal-open": showModalVariantType })}
      >
        <form method="dialog" className="modal-box" ref={ref}>
          <label className="label">
            <span className="label-text font-bold">Variant</span>
          </label>
          <input
            type="text"
            {...registerVariantType("name", {
              required: true,
            })}
            placeholder="Variant Type Name"
            className={classNames("input input-bordered w-full mb-4", {
              "input-error": errorsVariantType.name,
            })}
          />
          <div className="flex items-center justify-end gap-4">
            <div className="modal-action mt-0">
              <button
                className="btn"
                onClick={() => setShowModalVariantType(false)}
              >
                CLOSE
              </button>
            </div>
            <button
              className="btn btn-neutral"
              onClick={() => onSubmitVariantType()}
            >
              {isPendingProductVariantType ? (
                <span className="loading loading-spinner" />
              ) : null}
              SAVE
            </button>
          </div>
        </form>
      </dialog>
      <dialog
        className={classNames("modal", { "modal-open": showModalVariant })}
      >
        <form method="dialog" className="modal-box" ref={refVariantModal}>
          <label className="label">
            <span className="label-text font-bold">Variant</span>
          </label>
          <input
            type="text"
            {...registerVariantType("name", {
              required: true,
            })}
            placeholder="Variant Type Name"
            className={classNames("input input-bordered w-full mb-4", {
              "input-error": errorsVariantType.name,
            })}
          />
          <div className="flex items-center justify-end gap-4">
            <div className="modal-action mt-0">
              <button
                className="btn"
                onClick={() => setShowModalVariant(false)}
              >
                CLOSE
              </button>
            </div>
            <button
              className="btn btn-neutral"
              onClick={() => onSubmitVariantType()}
            >
              {isPendingProductVariantType ? (
                <span className="loading loading-spinner" />
              ) : null}
              SAVE
            </button>
          </div>
        </form>
      </dialog>
      <div className="text-3xl text-center mb-4 font-extrabold">
        Product Create
      </div>
      <div className="flex justify-between">
        <div className="card bg-secondary px-4 mb-4 h-fit">
          <div className="text-sm breadcrumbs font-bold text-white">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/management">Management</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/products/create">Add Product</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="card shadow-md bg-primary text-primary-content">
          <div className="card-body w-fit m-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-control w-full max-w-xs mb-4"
            >
              <label className="label">
                <span className="label-text font-bold">Product Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                className={classNames("input input-bordered w-full max-w-xs", {
                  "input-error": errors.name,
                })}
                defaultValue={product?.name}
              />
              <label className="label">
                <span className="label-text font-bold">
                  Product Description
                </span>
              </label>
              <input
                {...register("description", { required: true })}
                type="text"
                placeholder="Description"
                className={classNames("input input-bordered w-full max-w-xs", {
                  "input-error": errors.description,
                })}
                defaultValue={product?.description}
              />
              <button
                className="btn btn-neutral w-80 font-bold text-white mt-4"
                type="submit"
              >
                {isPending ? (
                  <span className="loading loading-spinner" />
                ) : null}
                CREATE
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <button
            className="btn btn-neutral"
            onClick={() => {
              setShowModalVariantType(true);
              setShowModalVariantType(true);
            }}
          >
            <FaPlus /> ADD VARIANT TYPE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
