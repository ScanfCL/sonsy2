'use server';
import { uuid } from 'uuidv4';
import { googleApiService } from '../../services/googleapis';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type Variant = {
  id: string;
  name: string;
  productVariantTypeId: string;
};
export type CreateVariantInput = Omit<Variant, 'id'>;

const SHEET_NAME = 'Variants';

export const createVariant = async (data: CreateVariantInput) => {
  await googleApiService.appendData(SHEET_NAME, [
    uuid(),
    data.name,
    data.productVariantTypeId,
  ]);
  await redirect('/variants');
  await revalidatePath('/variants');
};

export const getVariants = async () => {
  const data = await googleApiService.getData(SHEET_NAME);

  const productsRaw = data?.data?.values?.slice(1, data.data.values.length);
  const products = productsRaw?.reduce(
    (acc, cur) => [
      ...acc,
      {
        id: cur[0],
        name: cur[1],
        productVariantTypeId: cur[2],
      },
    ],
    []
  ) as Variant[];

  return products;
};
