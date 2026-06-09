import Hero from "@/components/hero/Hero";
import WhyUs from "@/components/whyUs/WhyUs";
import { getModels } from "@/lib/db/models";

export default async function Home() {
    const models = await getModels(8);

    return (
        <div>
            <Hero models={models} />
            <WhyUs />
        </div>
    );
}
