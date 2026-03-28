import { supabase } from "@/lib/supabase";
import { Model } from "@/types/model";

export async function getModels() {
    const { data, error } = await supabase.from("models").select("*");
    if (error) {
        throw new Error(error.message);
    }

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
