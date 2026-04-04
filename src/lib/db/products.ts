import { supabase } from "@/lib/supabase";
import { Product, ProductImage, ProductWithImage } from "@/types/product";

export async function getProducts(
    modelId: string,
    categoryId: string,
): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select(
            `
            id,
            name,
            price,
            slug,
            category_id,
            created_at,
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

export async function getProduct(slug: string): Promise<Product> {
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

export async function getProductImages(
    productIds: string[],
): Promise<ProductImage[]> {
    if (productIds.length === 0) return [];

    const { data, error } = await supabase
        .from("product_images")
        .select("*")
        .in("product_id", productIds)
        .order("is_main", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getProductsWithImages(
    modelId: string,
    categoryId: string,
): Promise<ProductWithImage[]> {
    const products = await getProducts(modelId, categoryId);
    const ids = products.map((p) => p.id);
    const images = await getProductImages(ids);
    const imagesMap = new Map<string, ProductImage>();

    images.forEach((img) => {
        if (!imagesMap.has(img.product_id)) {
            imagesMap.set(img.product_id, img);
        }
    });

    return products.map((product) => ({
        ...product,
        image: imagesMap.get(product.id) || null,
    }));
}
