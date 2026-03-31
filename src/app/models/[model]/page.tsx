import Link from "next/link";
import { getModelBySlug } from "@/lib/db/models";
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
    const model = await getModelBySlug(modelSlug);

    const categories = await getCategories(model.id);

    return (
        <div>
            <h1>{model.name}</h1>

            <h2>Категории</h2>

            {categories?.map((category) => (
                <div key={category.id}>
                    <Link href={`/models/${model.slug}/${category.slug}`}>
                        {category.name}
                        {category.image_url && (
                            <img
                                src={category.image_url}
                                alt={category.slug}
                                width={200}
                            />
                        )}
                    </Link>
                </div>
            ))}
        </div>
    );
}
