import Link from "next/link";
import { getModelBySlug } from "@/lib/db/models";
import { getCategoriesByModel } from "@/lib/db/categories";

type Params = {
    model: string;
};

export default async function ModelPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { model } = await params;
    const modelData = await getModelBySlug(model);

    const categoriesData = await getCategoriesByModel(modelData.id);
    const categories = categoriesData?.map((item) => item.categories).flat();

    return (
        <div>
            <h1>{modelData.name}</h1>

            <h2>Категории</h2>

            {categories?.map((category) => (
                <div key={category.id}>
                    <Link href={`/models/${modelData.slug}/${category.slug}`}>
                        {category.name}
                    </Link>
                </div>
            ))}
        </div>
    );
}
