'use server';

import { uuid } from 'uuidv4';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { googleApiService } from '../../../services/googleapis';
import { ProductVariantType } from '../../product-variant-types/create/actions';

export type Input = Omit<ProductVariantType, 'id' | 'productId'>;

const PRODUCT_VARIANT_TYPES = 'ProductVariantTypes';

export const createProductVariantTypeById = async (
  productId: string,
  data: Input
) => {
  const productVariantId = uuid();

  await googleApiService.appendData(PRODUCT_VARIANT_TYPES, [
    productVariantId,
    data.name,
    productId,
  ]);

  await redirect(`/products/${productId}`);
  await revalidatePath(`/products/${productId}`);
};
