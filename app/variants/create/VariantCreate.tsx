'use client';

import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import { useTransition } from 'react';

import { CreateVariantInput, createVariant } from '../actions';
import { ProductVariantType } from '../../product-variant-types/create/actions';

type Input = Omit<CreateVariantInput, 'id'>;

const VariantCreate = ({
  productVariantTypes,
}: {
  productVariantTypes: ProductVariantType[];
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<Input> = (data) => {
    startTransition(async () => {
      await createVariant(data);
    });
  };

  return (
    <div className="max-w-screen-lg w-full mx-auto py-6 px-4">
      <div className="text-3xl text-center mb-4 font-extrabold">
        Variant Create
      </div>
      <div className="card bg-secondary px-4 mb-4">
        <div className="text-sm breadcrumbs font-bold text-white">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/management">Management</Link>
            </li>
            <li>
              <Link href="/products">Variants</Link>
            </li>
            <li>
              <Link href="/products/create">Add Variant</Link>
            </li>
          </ul>
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
                <span className="label-text font-bold">Variant Name</span>
              </label>
              <input
                {...register('name', { required: true })}
                type="text"
                placeholder="Name"
                className={classNames('input input-bordered w-full max-w-xs', {
                  'input-error': errors.name,
                })}
              />
              <label className="label">
                <span className="label-text font-bold">
                  Product Variant Type Name
                </span>
              </label>
              <select
                {...register('productVariantTypeId', { required: true })}
                className={classNames(
                  'select select-bordered w-full max-w-xs',
                  {
                    'select-error': errors.productVariantTypeId,
                  }
                )}
              >
                <option disabled selected value={''}>
                  Product Variant Type
                </option>
                {productVariantTypes?.map((pvt) => (
                  <option key={pvt.id} value={pvt.id}>
                    {pvt.name}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-neutral w-80 font-bold text-white mt-4"
                type="submit"
              >
                {isPending ? (
                  <span className="loading loading-spinner" />
                ) : null}
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantCreate;
