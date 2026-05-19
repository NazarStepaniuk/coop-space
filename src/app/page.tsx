import Hero from "@/components/hero/Hero";
import { getModels } from "@/lib/db/models";

export default async function Home() {
    const models = await getModels(8);

    return (
        <div>
            <Hero models={models} />
        </div>
    );
}
