import "./WhyUs.scss";
import { Truck, BadgePercent, RotateCcw, Headset } from "lucide-react";

export default function WhyUs() {
    return (
        <section className="why-us">
            <div className="container">
                <h2 className="why-us__title">Чому обирають нас?</h2>
                <div className="why-us__wrapper">
                    <div className="why-us__item">
                        <h3 className="why-us__subtitle">Швидка доставка</h3>
                        <Truck size={40} className="why-us__icon" />
                        <span className="why-us__text">
                            Відправляємо в день замовлення
                        </span>
                    </div>
                    <div className="why-us__item">
                        <h3 className="why-us__subtitle">Знайшли дешевше?</h3>
                        <BadgePercent size={40} className="why-us__icon" />
                        <span className="why-us__text">
                            Зв'яжіться з нами для знижки
                        </span>
                    </div>
                    <div className="why-us__item">
                        <h3 className="why-us__subtitle">
                            Не підійшла запчастина?
                        </h3>
                        <RotateCcw size={40} className="why-us__icon" />
                        <span className="why-us__text">
                            Повертаєм 100% суми
                        </span>
                    </div>
                    <div className="why-us__item">
                        <h3 className="why-us__subtitle">Постійна підтримка</h3>
                        <Headset size={40} className="why-us__icon" />
                        <span className="why-us__text">
                            Допомагаємо підібрати товар
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
