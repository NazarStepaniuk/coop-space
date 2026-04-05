export type Product = {
    id: string;
    name: string;
    price: number;
    slug: string;
    category_id: string;
    created_at: string;
};

export type ProductFromDB = Product & {
    product_models: {
        role: ProductRole;
    }[];
};

export type ProductImage = {
    id: string;
    product_id: string;
    image_url: string;
    is_main: boolean;
};

export type ProductRole = "stock" | "facelift";

export type ProductListItem = Product & {
    image: ProductImage | null;
    role: ProductRole;
};

export type ProductDetails = Product & {
    images: ProductImage[];
};
