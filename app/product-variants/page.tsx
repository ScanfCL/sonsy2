import { Link } from "@nextui-org/link";
import { Card, CardBody } from "@nextui-org/card";
import { FaPlus } from "react-icons/fa";
import { getProductVariants } from "./create/actions";
import { Button } from "@nextui-org/button";
import ProductVariantTable from "./components/ProductVariantTable";

export const revalidate = 5;

export default async function ProductVariants() {
  const productVariants = await getProductVariants();

  return (
    <div className="max-w-screen-lg w-full mx-auto py-6 px-4">
      <div className="text-3xl text-center mb-4">
        Product Variants Management
      </div>
      <div className="flex justify-between">
        <Card className="bg-background">
          <CardBody>
            <div className="flex space-x-2 text-sm font-bold text-white">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/management">Management</Link>
              <span>/</span>
              <Link href="/product-variants">Product Variants</Link>
            </div>
          </CardBody>
        </Card>
        <div className="flex justify-end mb-4">
          <Link href="/product-variants/create">
            <Button color="primary">
              <FaPlus /> CREATE
            </Button>
          </Link>
        </div>
      </div>
      <div className="card shadow-md overflow-x-auto">
        <ProductVariantTable products={productVariants} />
      </div>
    </div>
  );
}
