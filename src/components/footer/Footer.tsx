import "./Footer.scss";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <div className="footer-block">
                        <h3 className="footer__header">Корисні сторінки</h3>
                        <ul className="footer__links">
                            <li>
                                <Link className="footer__link" href="/models">
                                    Каталог
                                </Link>
                            </li>
                            <li>
                                <Link className="footer__link" href="/">
                                    Про нас
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-block">
                        <h3 className="footer__header">Контакти</h3>
                        <ul className="footer__links">
                            <li>
                                <a
                                    href="tel:+380500575700"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer__link"
                                >
                                    +380 500 5757 00
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://t.me/MiniCooperUkraine"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer__link"
                                >
                                    @MiniCooperUkraine
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-block">
                        <h3 className="footer__header">Соц мережі</h3>
                        <ul className="footer__links footer__links--social">
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer__link"
                                >
                                    <Image
                                        src="/icons/instagram.svg"
                                        width={36}
                                        height={36}
                                        alt="Instagram"
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer__link"
                                >
                                    <Image
                                        src="/icons/tiktok.svg"
                                        width={36}
                                        height={36}
                                        alt="TikTok"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
