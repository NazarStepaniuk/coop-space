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

export type ProductWithImage = Product & {
    image: ProductImage | null;
};
