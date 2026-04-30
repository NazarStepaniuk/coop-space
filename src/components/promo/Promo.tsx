"use client";
import "./Promo.scss";
import carGarage from "@/assets/img/car-garage.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Promo() {
    return (
        <section className="promo">
            <div className="container">
                <div className="promo__wrapper">
                    <h1 className="promo__title">
                        Знайди запчастини
                        <br />
                        для свого MINI
                    </h1>

                    <Image
                        src={carGarage}
                        alt="Mini in garage"
                        className="promo__img"
                    />

                    <Link href="/models" className="promo__btn">
                        Перейти в каталог
                    </Link>
                </div>
            </div>
        </section>
    );
}
