"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductListItem, ProductRole } from "@/types/product";

type Params = {
    products: ProductListItem[];
    basePath: string;
};

export default function CategoryProducts({ products, basePath }: Params) {
    const roles = [...new Set(products.map((p) => p.role))];
    const showTabs = roles.length > 1;

    const [tab, setTab] = useState<ProductRole>(roles[0]);
    const filteredProducts = products.filter((p) => p.role === tab);

    return (
        <div>
            {showTabs && (
                <>
                    {roles.includes("stock") && (
                        <button onClick={() => setTab("stock")}>Сток</button>
                    )}
                    {roles.includes("facelift") && (
                        <button onClick={() => setTab("facelift")}>
                            Фейслифт
                        </button>
                    )}
                </>
            )}

            {!showTabs && (
                <p>{roles[0] === "facelift" ? "Фейслифт" : "Сток"}</p>
            )}

            {filteredProducts.map((product) => {
                return (
                    <div key={product.id}>
                        <Link href={`${basePath}/${product.slug}`}>
                            {product.image && (
                                <img
                                    src={product.image.image_url}
                                    alt={product.name}
                                    width={150}
                                />
                            )}
                            {product.name}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
