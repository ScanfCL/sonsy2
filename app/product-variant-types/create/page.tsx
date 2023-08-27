import ProductVariantTypeCreate from './ProductVariantTypeCreate';
import { getProducts } from '../../products/actions/actions';

export default async function Products() {
  const products = await getProducts();

  return <ProductVariantTypeCreate products={products} />;
}
