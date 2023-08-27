"use server";
import { uuid } from "uuidv4";
import { googleApiService } from "../../../services/googleapis";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ProductVariant = {
  id: string;
  name: string;
  price: number;
  inventory: number;
  productId: string;
};
export type Input = Omit<ProductVariant, "id">;

const SHEET_NAME = "ProductVariants";

export const createProductVariants = async (data: Input) => {
  await googleApiService.appendData(SHEET_NAME, [
    uuid(),
    data.name,
    data.price.toString(),
    data.inventory.toString(),
    data.productId,
  ]);
  await redirect("/product-variants");
  await revalidatePath("/product-variants");
};

export const getProductVariants = async () => {
  const data = await googleApiService.getData(SHEET_NAME);

  const productsRaw = data?.data?.values?.slice(1, data.data.values.length);
  const products = productsRaw?.reduce(
    (acc, cur) => [
      ...acc,
      {
        id: cur[0],
        name: cur[1],
        price: cur[2],
        inventory: cur[3],
        productId: cur[4],
      },
    ],
    [],
  ) as ProductVariant[];

  return products;
};
