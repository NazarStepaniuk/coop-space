import { supabase } from "@/lib/supabase";
import { Model } from "@/types/model";

export async function getModels(limit?: number): Promise<Model[]> {
    let query = supabase
        .from("models")
        .select("*")
        .order("name", { ascending: true });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    return data;
}

export async function getModelBySlug(slug: string): Promise<Model> {
    const { data, error } = await supabase
        .from("models")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
