import { supabase } from "@/lib/supabase";

export async function getProducts(modelId: string, categoryId: string) {
    const { data, error } = await supabase
        .from("products")
        .select(
            `
            id,
            name,
            price,
            slug,
            product_models!inner (
                model_id
            )
        `,
        )
        .eq("category_id", categoryId)
        .eq("product_models.model_id", modelId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getProduct(slug: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
