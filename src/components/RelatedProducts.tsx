import Link from "next/link";
import { RelatedProduct } from "@/types/product";

type Params = {
    products: RelatedProduct[];
    modelSlug: string;
};

export default function RelatedProducts({ products, modelSlug }: Params) {
    return (
        <div>
            <h2>Рекомендации для вас:</h2>
            {products.map((product) => {
                return (
                    <Link
                        href={`/models/${modelSlug}/${product.category_slug}/${product.slug}`}
                        key={product.id}
                    >
                        <div>name: {product.name}</div>
                        <div>price: {product.price}</div>
                        <img
                            src={product.image?.image_url}
                            alt={product.name}
                            width={200}
                        />
                    </Link>
                );
            })}
        </div>
    );
}
