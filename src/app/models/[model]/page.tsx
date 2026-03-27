import Link from "next/link";
import { getModel } from "@/lib/db/models";
import { getCategories } from "@/lib/db/categories";

type Params = {
    model: string;
};

export default async function ModelPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { model: modelSlug } = await params;
    const model = await getModel(modelSlug);

    const categoriesData = await getCategories(model.id);
    const categories = categoriesData?.map((item) => item.categories).flat();

    return (
        <div>
            <h1>{model.name}</h1>

            <h2>Категории</h2>

            {categories?.map((category) => (
                <div key={category.id}>
                    <Link href={`/models/${model.slug}/${category.slug}`}>
                        {category.name}
                    </Link>
                </div>
            ))}
        </div>
    );
}
