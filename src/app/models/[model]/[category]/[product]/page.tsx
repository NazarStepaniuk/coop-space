import { getProductBySlug } from "@/lib/db/products";

type Params = {
    product: string;
};

export default async function ProductPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { product: productSlug } = await params;

    const product = await getProductBySlug(productSlug);
    if (!product) {
        return <div>Продукт не найден</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <div>price: {product.price}</div>
            {product.images?.map((img) => (
                <img src={img.image_url} alt={product.name} width={350} />
            ))}
        </div>
    );
}
