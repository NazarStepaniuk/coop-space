"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

import MobileMenu from "./MobileMenu";
import "./Header.scss";

export default function Header() {
    return (
        <header className="header">
            <div className="header__wrapper">
                <MobileMenu />

                <Link href="/" className="header__logo">
                    <Image src="/logo.svg" width={70} height={30} alt="Logo" />
                </Link>

                <nav className="header__menu">
                    <ul>
                        <li>
                            <Link className="header__link" href="/models">
                                Каталог
                            </Link>
                        </li>
                        <li>
                            <Link className="header__link" href="/">
                                Про нас
                            </Link>
                        </li>
                        <li>
                            <Link className="header__link" href="/">
                                Відгуки
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="header__contacts">
                    <a
                        className="header__contact"
                        href="tel:+380500575700"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Phone size={22} />
                        <span>+380 500 5757 00</span>
                    </a>
                    <a
                        className="header__contact"
                        href="https://t.me/MiniCooperUkraine"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/icons/telegram.svg"
                            width={22}
                            height={22}
                            alt="Telegram"
                        />
                        <span>@MiniCooperUkraine</span>
                    </a>
                </div>
            </div>
        </header>
    );
}
