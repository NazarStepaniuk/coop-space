import { getModelBySlug } from "@/lib/db/models";
import { getCategoryBySlug } from "@/lib/db/categories";
import { getProducts, getProductImages } from "@/lib/db/products";

import Link from "next/link";

type Params = {
    model: string;
    category: string;
};

export default async function CategoryPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { model: modelSlug, category: categorySlug } = await params;

    const model = await getModelBySlug(modelSlug);
    if (!model) {
        return <div>Модель не найдена</div>;
    }

    const category = await getCategoryBySlug(categorySlug);
    if (!category) {
        return <div>Категория не найдена</div>;
    }

    const products = await getProducts(model.id, category.id);
    const productIds = products.map((product) => product.id).filter(Boolean);
    const productImages = await getProductImages(productIds);
    const productImagesMap = new Map();

    productImages.forEach((img) => {
        if (!productImagesMap.has(img.product_id)) {
            productImagesMap.set(img.product_id, img);
        }
    });

    return (
        <div>
            <h1>{model.name}</h1>
            <h2>{category.name}</h2>

            <h3>Товары</h3>

            {products?.length === 0 && <p>Нет товаров</p>}

            {products?.map((product) => {
                const image = productImagesMap.get(product.id);
                return (
                    <div key={product.id}>
                        <Link
                            href={`/models/${model.slug}/${category.slug}/${product.slug}`}
                        >
                            {image && (
                                <img
                                    src={image.image_url}
                                    alt={product.name}
                                    width={150}
                                />
                            )}
                            {product.name}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
