import {Button} from "@/components/ui/button";
import {db} from "@/db";
import {Check, Shield} from "lucide-react";
import Image from "next/image";
import {notFound} from "next/navigation";
import BackButton from "./back-button";

interface PageProps {
  params: {
    productId: string;
  };
}

const Page = async ({params}: PageProps) => {
  const {productId} = params;

  //   if (!productId) return notFound();

  const productsDb = db.collection("products");

  const search = productsDb.find(
    {$and: [{id: productId}]},
    {
      projection: {
        _id: 0,
      },
    }
  );

  if (!(await search.hasNext())) {
    return notFound();
  }

  const product = (await search.next()) as Product;

  return (
    <div className="py-8 pb-8 px-12 divide-y divide-zinc-100 bg-white shadow-md rounded-b-md">
      <div>
        <BackButton />

        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>
        </div>

        <div className="aspect-square my-6 border border-border w-52 h-52">
          <div className="relative bg-zinc-100 w-full h-full overflow-hidden rounded-xl">
            <Image
              fill
              loading="eager"
              className="h-full w-full object-cover object-center"
              src={`/${product.imageId}`}
              alt="product image"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <p className="font-medium text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="mt-4 space-y-6">
            <p className="text-base max-w-prose text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="mt-6 flex items-center">
            <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
            <p className="ml-2 text-sm text-muted-foreground">
              Eligible for express delivery
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button className="w-full mt-10">Add to cart</Button>

        <div className="mt-6 text-center">
          <div className="inline-flex text-sm text-medium">
            <Shield className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400" />
            <span className="text-muted-foreground hover:text-gray-700">
              30 Day Return Guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
