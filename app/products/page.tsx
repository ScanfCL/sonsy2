import { getProducts } from "./actions/actions";

import ProductsPage from "./components/ProductsPage";

export default async function Products() {
  const products = await getProducts();

  return <ProductsPage products={products} />;
}
