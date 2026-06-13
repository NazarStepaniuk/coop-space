import HeroModels from "@/components/hero/HeroModels";
import { getModels } from "@/lib/db/models";
import "./models.scss";

export default async function ModelsPage() {
    const models = await getModels();

    return (
        <section className="models">
            <div className="container">
                <h1 className="title-h1">Каталог запчастин MINI</h1>
                <p className="models__subtitle">Оберіть модель автомобіля</p>
                <HeroModels models={models} />
            </div>
        </section>
    );
}
