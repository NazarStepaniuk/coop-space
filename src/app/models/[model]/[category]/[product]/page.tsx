import { getProduct } from "@/lib/db/products";

type Params = {
    product: string;
};

export default async function ProductPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { product: productSlug } = await params;

    const product = await getProduct(productSlug);
    if (!product) {
        return <div>Продукт не найден</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <div>price: {product.price}</div>
        </div>
    );
}
