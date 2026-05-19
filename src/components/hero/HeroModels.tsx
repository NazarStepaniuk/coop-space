import { Model } from "@/types/model";
import Link from "next/link";
import Image from "next/image";
import modelDefault from "@/assets/img/model-default.webp";

export default function HeroModels({ models }: { models: Model[] }) {
    return (
        <ul className="hero__list">
            {models?.map((model) => (
                <li key={model.id}>
                    <Link href={`/models/${model.slug}`} className="hero__card">
                        <div className="hero__card-img">
                            <Image
                                src={model.image_url || modelDefault}
                                alt={model.name}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                        <div className="hero__card-name">{model.name}</div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
