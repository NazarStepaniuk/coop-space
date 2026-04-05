import { supabase } from "@/lib/supabase";
import {
    Product,
    ProductFromDB,
    ProductImage,
    ProductListItem,
    ProductDetails,
} from "@/types/product";

export async function getProducts(
    modelId: string,
    categoryId: string,
): Promise<ProductFromDB[]> {
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
                model_id,
                role
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

export async function getProductBySlug(
    slug: string,
): Promise<ProductDetails | null> {
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
            product_images (
                id,
                product_id,
                image_url,
                is_main
            )
        `,
        )
        .eq("slug", slug)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    if (!data) return null;

    return {
        ...data,
        images: data.product_images || [],
    };
}

export async function getMainImages(
    productIds: string[],
): Promise<ProductImage[]> {
    if (productIds.length === 0) return [];

    const { data, error } = await supabase
        .from("product_images")
        .select("*")
        .in("product_id", productIds)
        .eq("is_main", true);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getProductsForList(
    modelId: string,
    categoryId: string,
): Promise<ProductListItem[]> {
    const products = await getProducts(modelId, categoryId);
    const ids = products.map((p) => p.id);
    const images = await getMainImages(ids);
    const imagesMap = new Map<string, ProductImage>();

    images.forEach((img) => {
        if (!imagesMap.has(img.product_id)) {
            imagesMap.set(img.product_id, img);
        }
    });

    return products.map((product) => ({
        ...product,
        role: product.product_models?.[0]?.role ?? "stock",
        image: imagesMap.get(product.id) || null,
    }));
}
