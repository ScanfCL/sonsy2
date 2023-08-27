import { getProductVariantTypes } from '../../product-variant-types/create/actions';
import { getVariants } from '../../variants/actions';
import ProductVariantCreate from './ProductVariantCreate';

export default async function Products() {
  const productVariantTypes = await getProductVariantTypes();
  const variants = await getVariants();

  return (
    <ProductVariantCreate
      productVariantTypes={productVariantTypes}
      variants={variants}
    />
  );
}
