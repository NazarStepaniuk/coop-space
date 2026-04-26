"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    return (
        <>
            <button
                className="burger"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div
                className={`header__mobile-wrapper ${isOpen ? "header__mobile_active" : ""}`}
            >
                <div
                    className="header__mobile-close"
                    onClick={() => setIsOpen(false)}
                >
                    <span></span>
                    <span></span>
                </div>

                <nav className="header__mobile-menu">
                    <ul>
                        <li>
                            <Link
                                className="header__mobile-link"
                                href="/models"
                                onClick={() => setIsOpen(false)}
                            >
                                Каталог
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="header__mobile-link"
                                href="/"
                                onClick={() => setIsOpen(false)}
                            >
                                Про нас
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="header__mobile-link"
                                href="/"
                                onClick={() => setIsOpen(false)}
                            >
                                Відгуки
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {isOpen && (
                <div className="overlay" onClick={() => setIsOpen(false)} />
            )}
        </>
    );
}
