import { supabase } from "@/lib/supabase";

export async function getCategories(modelId: string) {
    const { data, error } = await supabase
        .from("category_models")
        .select(
            `
            categories (
                id,
                name,
                slug,
                image_url,
                created_at
            )
        `,
        )
        .eq("model_id", modelId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getCategory(slug: string) {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
