export type Product = {
    id: string;
    name: string;
    price: number;
    slug: string;
    category_id: string;
    created_at: string;
};

export type ProductImage = {
    id: string;
    product_id: string;
    image_url: string;
    is_main: boolean;
};

export type ProductRole = "stock" | "facelift";

export type ProductDB = Product & {
    product_models: {
        model_id: string;
        role: ProductRole;
    }[];
};

export type ProductWithCategory = Product & {
    categories:
        | {
              slug: string;
          }
        | {
              slug: string;
          }[]
        | null;
};

// UI
export type ProductListItem = Product & {
    image: ProductImage | null;
    role: ProductRole;
};

export type ProductDetails = Product & {
    images: ProductImage[];
    product_models: {
        model_id: string;
        role: string;
    }[];
};

export type RelatedProduct = {
    id: string;
    name: string;
    price: number;
    slug: string;
    category_slug: string;
    image: {
        image_url: string;
    } | null;
};
