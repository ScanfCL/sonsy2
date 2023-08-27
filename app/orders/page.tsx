import { getOrders } from "./actions/actions";
import OrdersPage from "./components/OrdersPage";

export default async function Products() {
  const orders = await getOrders();

  return <OrdersPage orders={orders} />;
}
