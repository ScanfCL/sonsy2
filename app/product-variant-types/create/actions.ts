'use server';
import { uuid } from 'uuidv4';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { googleApiService } from '../../../services/googleapis';

export type ProductVariantType = {
  id: string;
  name: string;
  productId: string;
};
export type Input = Omit<ProductVariantType, 'id'>;

const SHEET_NAME = 'ProductVariantTypes';

export const createProductVariantTypes = async (data: Input) => {
  await googleApiService.appendData(SHEET_NAME, [
    uuid(),
    data.name,
    data.productId,
  ]);
  await redirect('/product-variant-types');
  await revalidatePath('/product-variant-types');
};

export const getProductVariantTypes = async () => {
  const data = await googleApiService.getData(SHEET_NAME);

  const productsRaw = data?.data?.values?.slice(1, data.data.values.length);
  const products = productsRaw?.reduce(
    (acc, cur) => [
      ...acc,
      {
        id: cur[0],
        name: cur[1],
        productId: cur[2],
      },
    ],
    []
  ) as ProductVariantType[];

  return products;
};
