// import Link from "next/link";
import { Link } from "@nextui-org/link";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

export default async function Index() {
  return (
    <div className="max-w-screen-lg w-full mx-auto py-6 px-4">
      <div className="text-3xl text-center mb-4 font-extrabold">Management</div>
      <Card className="card mb-4 h-fit bg-background">
        <CardBody className="">
          <div className="flex space-x-2 text-sm font-bold text-white">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/management">Management</Link>
          </div>
        </CardBody>
      </Card>
      <div className="grid grid-cols-1 gap-4">
        <Card className="card shadow-md text-primary-content">
          <CardBody>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl">Products</h2>
                <p className="text-sm">Products Management</p>
              </div>
              <div className="card-actions justify-end">
                <Link href="/products">
                  <Button color="primary" variant="ghost" size="sm">
                    Manage
                  </Button>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="card shadow-md text-primary-content">
          <CardBody>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl">ProductVariants</h2>
                <p className="text-sm">Product Variants Management </p>
              </div>
              <div className="card-actions justify-end">
                <Link href="/product-variants">
                  <Button color="primary" variant="ghost" size="sm">
                    Manage
                  </Button>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
        {/* <Card className="card shadow-md text-primary-content">
          <CardBody>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl">ProductVariantTypes</h2>
                <p className="text-sm">Product Variant Types Management </p>
              </div>
              <div className="card-actions justify-end">
                <Link href="/product-variant-types">
                  <Button color="primary" variant="ghost" size="sm">
                    Manage
                  </Button>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card> */}
        {/* <Card className="card shadow-md text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Variants</h2>
            <p>Variants Management </p>
            <div className="card-actions justify-end">
              <Link href="/variants">
                <button className="btn">Manage</button>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
