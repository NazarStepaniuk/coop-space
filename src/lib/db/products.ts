import { supabase } from "@/lib/supabase";
import {
    ProductDB,
    ProductImage,
    ProductListItem,
    ProductDetails,
    ProductWithCategory,
    RelatedProduct,
} from "@/types/product";

export async function getProducts(
    modelId: string,
    categoryId: string,
): Promise<ProductDB[]> {
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

    if (error) throw new Error(error.message);

    return data ?? [];
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
            ),
            product_models (
                model_id,
                role
            )
        `,
        )
        .eq("slug", slug)
        .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) return null;

    return {
        ...data,
        images: data.product_images || [],
    };
}

async function getMainImages(productIds: string[]): Promise<ProductImage[]> {
    if (!productIds.length) return [];

    const { data, error } = await supabase
        .from("product_images")
        .select("*")
        .in("product_id", productIds)
        .eq("is_main", true);

    if (error) throw new Error(error.message);

    return data ?? [];
}

async function mapToListItems(
    products: ProductDB[],
): Promise<ProductListItem[]> {
    const ids = products.map((p) => p.id);
    const images = await getMainImages(ids);

    const imageMap = new Map<string, ProductImage>();

    images.forEach((img) => {
        if (!imageMap.has(img.product_id)) {
            imageMap.set(img.product_id, img);
        }
    });

    return products.map((p) => ({
        ...p,
        role: p.product_models?.[0]?.role ?? "stock",
        image: imageMap.get(p.id) || null,
    }));
}

function mapToRelatedProducts(
    products: ProductWithCategory[],
    images: ProductImage[],
): RelatedProduct[] {
    const imageMap = new Map<string, ProductImage>();

    images?.forEach((img) => {
        if (!imageMap.has(img.product_id)) {
            imageMap.set(img.product_id, img);
        }
    });

    return products.slice(0, 4).map((p) => {
        const mainImage = imageMap.get(p.id) || null;
        const categorySlug = Array.isArray(p.categories)
            ? p.categories[0]?.slug
            : p.categories?.slug;

        return {
            id: p.id,
            name: p.name,
            price: p.price,
            slug: p.slug,
            category_slug: categorySlug ?? "",
            image: mainImage ? { image_url: mainImage.image_url } : null,
        };
    });
}

export async function getProductsForList(
    modelId: string,
    categoryId: string,
): Promise<ProductListItem[]> {
    const products = await getProducts(modelId, categoryId);
    return mapToListItems(products);
}

export async function getRelatedProducts(
    modelId: string,
    categoryId: string,
    productId: string,
): Promise<RelatedProduct[]> {
    const { data: relations, error: relError } = await supabase
        .from("category_relations")
        .select("related_category_id")
        .eq("category_id", categoryId);

    if (relError) throw new Error(relError.message);

    const categoryIds = relations?.map((r) => r.related_category_id) ?? [];

    if (!categoryIds.length) return [];

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
            categories (
                slug
            ),
            product_images (
                id,
                product_id,
                image_url,
                is_main
            ),
            product_models!inner (
                model_id,
                role
            )
        `,
        )
        .in("category_id", categoryIds)
        .eq("product_models.model_id", modelId)
        .not("id", "eq", productId);

    if (error) throw new Error(error.message);
    if (!data?.length) return [];

    const typedData = data as ProductWithCategory[];

    const grouped = new Map<string, ProductWithCategory[]>();

    for (const product of typedData) {
        if (!grouped.has(product.category_id)) {
            grouped.set(product.category_id, []);
        }
        grouped.get(product.category_id)!.push(product);
    }

    const result: ProductWithCategory[] = [];

    for (const [, products] of grouped) {
        const randomIndex = Math.floor(Math.random() * products.length);
        result.push(products[randomIndex]);
    }

    if (result.length < 4) {
        for (const p of typedData) {
            if (!result.find((r) => r.id === p.id)) {
                result.push(p);
            }
            if (result.length === 4) break;
        }
    }

    const ids = result.map((p) => p.id);

    const { data: images, error: imgError } = await supabase
        .from("product_images")
        .select("*")
        .in("product_id", ids)
        .eq("is_main", true);

    if (imgError) throw new Error(imgError.message);

    return mapToRelatedProducts(result, images ?? []);
}
