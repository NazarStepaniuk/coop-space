import Link from "next/link";
import { getModels } from "@/lib/db/models";

export default async function ModelsPage() {
    const models = await getModels();

    return (
        <div>
            <h1>Модели</h1>

            {models?.map((model) => (
                <div key={model.id}>
                    <Link href={`/models/${model.slug}`}>{model.name}</Link>
                </div>
            ))}
        </div>
    );
}
