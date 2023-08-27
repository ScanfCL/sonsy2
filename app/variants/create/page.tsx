import { getProductVariantTypes } from '../../product-variant-types/create/actions';
import VariantCreate from './VariantCreate';

export default async function Variants() {
  const productVariantTypes = await getProductVariantTypes();

  return <VariantCreate productVariantTypes={productVariantTypes} />;
}
