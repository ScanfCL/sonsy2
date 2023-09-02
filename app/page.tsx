import { Link } from "@nextui-org/link";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 max-w-screen-lg m-auto">
      <div className="grid grid-cols-2 gap-4 w-full">
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
          shadow="sm"
        >
          <CardBody>
            <div className="text-3xl font-semibold">Dashboard</div>
            <div className="text-small font-light">
              Get an overview of your business metrics. Track sales, user
              activity, and more.
            </div>
            <div className="mt-4 text-right">
              <Link href="/dashboard">
                <Button color="primary" variant="ghost" size="sm">
                  View
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
          shadow="sm"
        >
          <CardBody>
            <div className="text-3xl font-semibold">Orders</div>
            <div className="text-small font-light">
              Manage all customer orders here. View, edit, and update order
              status in real-time.
            </div>
            <div className="mt-4 text-right">
              <Link href="/orders">
                <Button color="primary" variant="ghost" size="sm">
                  Manage
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
          shadow="sm"
        >
          <CardBody>
            <div className="text-3xl font-semibold">Products</div>
            <div className="text-small font-light">
              Your product library. Add, edit, or remove items and manage
              inventory.
            </div>
            <div className="mt-4 text-right">
              <Link href="/products">
                <Button color="primary" variant="ghost" size="sm">
                  Manage
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
