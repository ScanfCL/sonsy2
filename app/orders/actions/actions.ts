"use server";

import { uuid } from "uuidv4";
import { googleApiService } from "@/services/googleapis";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Product, getProducts } from "@/app/products/actions/actions";
import {
  ProductVariant,
  getProductVariants,
} from "@/app/product-variants/create/actions";
import { format } from "date-fns";

const SHEET_NAME = "Orders";

enum OrderStatus {
  Pending = "Pending",
  Preparing = "Preparing",
  Delivering = "Delivering",
  Shipped = "Shipped",
}

export type Customer = {
  name: string;
  address: string;
  tel: string;
};

export type Order = {
  id: string;
  productId: string;
  productVariantId: string;
  qty: number;
  unitPrice: number;
  customer: Customer;
  orderDate: string;
  status: OrderStatus;
  trackingNo?: string;
  createdAt: string;

  product?: Product;
  productVariant?: ProductVariant;
};

export type CreateOrderInput = Omit<
  Order,
  "id" | "createdAt" | "product" | "productVariant"
>;

export const createOrders = async (data: CreateOrderInput) => {
  const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  await googleApiService.appendData(SHEET_NAME, [
    uuid(),
    data.productId,
    data.productVariantId,
    data.qty.toString(),
    data.unitPrice.toString(),
    data.customer.name,
    data.customer.tel,
    data.customer.address,
    data.orderDate,
    data.status,
    data?.trackingNo || "",
    now,
  ]);

  await redirect("/orders");
};

export const getOrders = async () => {
  const [data, products, productVariants] = await Promise.all([
    googleApiService.getData(SHEET_NAME),
    getProducts(),
    getProductVariants(),
  ]);

  const ordersRaw = data?.data?.values?.slice(1, data.data.values.length);
  const orders = ordersRaw?.reduce((acc, cur) => {
    const product = products.find((product) => product.id === cur[1]);
    const productVariant = productVariants.find((pv) => pv.id === cur[2]);

    const orderDetail: Order = {
      id: cur[0],
      productId: cur[1],
      productVariantId: cur[2],
      qty: cur[3],
      unitPrice: cur[4],
      customer: {
        name: cur[5],
        tel: cur[6],
        address: cur[7],
      },
      orderDate: cur[8],
      status: cur[9],
      trackingNo: cur[10],
      createdAt: cur[11],

      //resolve field
      product,
      productVariant,
    };

    return [...acc, orderDetail];
  }, []) as Order[];

  return orders;
};

export const getOrderById = async (id: string) => {
  const [data, products, productVariants] = await Promise.all([
    googleApiService.getData(SHEET_NAME),
    getProducts(),
    getProductVariants(),
  ]);

  const cachedOrders = new Map<string, Order>();

  const ordersRaw = data?.data?.values?.slice(1, data.data.values.length);
  ordersRaw?.forEach((cur) => {
    const product = products.find((product) => product.id === cur[1]);
    const productVariant = productVariants.find((pv) => pv.id === cur[2]);

    const orderDetail = {
      id: cur[0],
      productId: cur[1],
      productVariantId: cur[2],
      qty: cur[3],
      unitPrice: cur[4],
      customer: {
        name: cur[5],
        tel: cur[6],
        address: cur[7],
      },
      orderDate: cur[8],
      status: cur[9],
      trackingNo: cur[10],
      createdAt: cur[11],

      //resolve field
      product,
      productVariant,
    };

    cachedOrders.set(orderDetail.id, orderDetail);
  });

  return cachedOrders.get(id);
};

export const updateOrderById = async (id: string, newData: string[]) => {
  await googleApiService.updateData(SHEET_NAME, id, newData);
  await revalidatePath("/orders");
};

export const deleteOrderById = async (id: string) => {
  await googleApiService.deleteData(SHEET_NAME, id);
  await revalidatePath("/orders");
};
