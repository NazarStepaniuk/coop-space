import { supabase } from "@/lib/supabase";
import { Category } from "@/types/category";

export async function getCategories(modelId: string): Promise<Category[]> {
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

    const categories = data?.flatMap((item) => item.categories ?? []) ?? [];

    return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
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
