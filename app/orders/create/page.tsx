import { getProductVariants } from "@/app/product-variants/create/actions";
import { getProducts } from "@/app/products/actions/actions";
import OrderCreate from "@/features/order/OrderCreate";

export default async function OrderCreatePage() {
  const [products, productVariants] = await Promise.all([
    getProducts(),
    getProductVariants(),
  ]);

  return <OrderCreate products={products} productVariants={productVariants} />;
}
