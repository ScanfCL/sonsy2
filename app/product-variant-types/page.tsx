import { getProductVariantTypes } from "./create/actions";
// import ProductsPage from './Products';
import { FaPlus } from "react-icons/fa";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import ProductVariantTypeTable from "./components/ProductVariantTypeTable";

export const revalidate = 5;

export default async function ProductVariantTypes() {
  const productVariantTypes = await getProductVariantTypes();

  return (
    <div className="max-w-screen-lg w-full mx-auto py-6 px-4">
      <div className="text-3xl text-center mb-4">
        Product Variant Types Management
      </div>
      <div className="flex justify-between">
        <Card className="bg-background px-4 mb-4 h-fit">
          <CardBody>
            <div className="flex space-x-2 text-sm font-bold text-white">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/management">Management</Link>
              <span>/</span>
              <Link href="/product-variant-types">Product Variant Types</Link>
            </div>
          </CardBody>
        </Card>
        <div className="flex justify-end mb-4">
          <Link href="/product-variant-types/create">
            <Button>
              <FaPlus /> CREATE
            </Button>
          </Link>
        </div>
      </div>
      <div className="card shadow-md overflow-x-auto">
        <ProductVariantTypeTable products={productVariantTypes} />
      </div>
    </div>
  );
}
