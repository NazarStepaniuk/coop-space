"use client";
import { Model } from "@/types/model";
import "./Hero.scss";
import HeroModels from "./HeroModels";
import Link from "next/link";

export default function Hero({ models }: { models: Model[] }) {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero__wrapper">
                    <h1 className="hero__title">
                        Знайди запчастини
                        <br />
                        для свого MINI
                    </h1>
                    <form>
                        <input
                            type="text"
                            className="hero__search"
                            placeholder="Пошук моделі"
                            name="search"
                        />
                    </form>
                </div>
                <HeroModels models={models} />
                <Link href="/models" className="hero__link">
                    Переглянути всі моделі
                </Link>
            </div>
        </section>
    );
}
