import {
  getProductById,
  getProductVariantsByProductId,
} from '../actions/actions';
import ProductDetail from './ProductDetail';

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  const productVariants = await getProductVariantsByProductId(params.id);

  return <ProductDetail product={product} productVariants={productVariants} />;
}
