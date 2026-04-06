import { getModelBySlug } from "@/lib/db/models";
import { getCategoryBySlug } from "@/lib/db/categories";
import { getProductsForList } from "@/lib/db/products";

import CategoryProducts from "@/components/CategoryProducts";

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

    const products = await getProductsForList(model.id, category.id);

    return (
        <div>
            <h1>{model.name}</h1>
            <h2>{category.name}</h2>

            {products?.length === 0 && <p>Нет товаров</p>}

            <CategoryProducts
                products={products}
                basePath={`/models/${model.slug}/${category.slug}`}
            />
        </div>
    );
}
