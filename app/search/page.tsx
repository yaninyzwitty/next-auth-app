import {db} from "@/db";
import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: {[key: string]: string | string[] | undefined};
};

// export const dynamic = "force-dynamic";

async function SearchPage({searchParams}: Props) {
  const query = searchParams?.q || "";
  const products = [];

  //   find similar products

  const similarProducts = await db
    .collection("products")
    .find(
      {},
      {
        sort: {
          $vectorize: `${query}`,
        },
        limit: 20,
        projection: {
          _id: 0, //exclude the ids
        },
        includeSimilarity: false,
      }
    )
    .toArray();
  products.push(...similarProducts) as Partial<Product>;

  return (
    <ul className="py-4 divide-y divide-zinc-100 bg-white shadow-md rounded-b-md">
      {products.slice(0, 3).map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <li className="mx-auto py-4 px-8 flex space-x-4">
            <div className="relative flex items-center bg-zinc-100 rounded-lg h-40 w-40">
              <Image
                loading="eager"
                fill
                alt="product-image"
                src={`/${product.imageId}`}
              />
            </div>

            <div className="w-full flex-1 space-y-2 py-1">
              <h1 className="text-lg font-medium text-gray-900">
                {product.name}
              </h1>

              <p className="prose prose-sm text-gray-500 line-clamp-3">
                {product.description}
              </p>

              <p className="text-base font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default SearchPage;
