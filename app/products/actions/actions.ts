"use server";

import { uuid } from "uuidv4";
import { googleApiService } from "../../../services/googleapis";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getProductVariantTypes } from "../../product-variant-types/create/actions";
import { getVariants } from "../../variants/actions";
import { getProductVariants } from "../../product-variants/create/actions";
import { sheets } from "googleapis/build/src/apis/sheets";

export type Product = { id: string; name: string; description: string };
export type Input = Omit<Product, "id">;

const SHEET_NAME = "Products";

export const createProduct = async (data: Input) => {
  await googleApiService.appendData(SHEET_NAME, [
    uuid(),
    data.name,
    data.description,
  ]);
  await redirect("/products");
  await revalidatePath("/products");
};

export const getProducts = async () => {
  const data = await googleApiService.getData(SHEET_NAME);

  const productsRaw = data?.data?.values?.slice(1, data.data.values.length);
  const products = productsRaw?.reduce((acc, cur) => {
    const productDetail = {
      id: cur[0],
      name: cur[1],
      description: cur[2],
    };

    return [...acc, productDetail];
  }, []) as Product[];

  return products;
};

export const getProductById = async (id: string) => {
  const data = await googleApiService.getData(SHEET_NAME);
  const cachedProducts = new Map<string, Product>();

  const productsRaw = data?.data?.values?.slice(1, data.data.values.length);
  productsRaw?.forEach((cur) => {
    const productDetail = {
      id: cur[0],
      name: cur[1],
      description: cur[2],
    };

    cachedProducts.set(productDetail.id, productDetail);
  });

  return cachedProducts.get(id);
};

export const updateProductById = async (id: string, newData: string[]) => {
  await googleApiService.updateData(SHEET_NAME, id, newData);
  await revalidatePath("/products");
};

export const deleteProductById = async (id: string) => {
  await googleApiService.deleteData(SHEET_NAME, id);
  await revalidatePath("/products");
};

export type ProductVariantTypesResolveField = {
  id: string;
  name: string;
  productVariants: {
    id: string;
    name: string;
    price: number;
    inventory: number;
  }[];
};

export const getProductVariantsByProductId = async (id: string) => {
  const [dataProductVariants, dataProducts] = await Promise.all([
    getProductVariants(),
    getProducts(),
  ]);

  return dataProductVariants.filter((pv) => pv.productId === id);
};
