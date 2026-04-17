import { getProductBySlug, getRelatedProducts } from "@/lib/db/products";
import { getCategoryBySlug } from "@/lib/db/categories";
import { getModelBySlug } from "@/lib/db/models";
import RelatedProducts from "@/components/RelatedProducts";

type Params = {
    product: string;
    model: string;
};

export default async function ProductPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { product: productSlug, model: modelSlug } = await params;

    const product = await getProductBySlug(productSlug),
        model = await getModelBySlug(modelSlug);

    if (!product) {
        return <div>Продукт не найден</div>;
    }

    const related = await getRelatedProducts(
        model.id,
        product.category_id,
        product.id,
    );

    return (
        <div>
            <h1>{product.name}</h1>
            <div>price: {product.price}</div>
            {product.images?.map((img) => (
                <img src={img.image_url} alt={product.name} width={350} />
            ))}
            <br />
            <br />
            <br />
            <br />
            {related && (
                <RelatedProducts products={related} modelSlug={model.slug} />
            )}
        </div>
    );
}
