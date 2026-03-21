import { supabase } from "@/lib/supabase";
import { getModelBySlug } from "@/lib/db/models";

type Params = {
    slug: string;
};

export default async function ModelPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { slug } = await params;
    const model = await getModelBySlug(slug);
    return (
        <div>
            <h1>{model?.name}</h1>
            <p>Здесь будут категории</p>
        </div>
    );
}
