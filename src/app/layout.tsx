import "./globals.scss";
import { Montserrat } from "next/font/google";
import Header from "@/components/header/Header";

const montserrat = Montserrat({
    subsets: ["latin", "cyrillic"],
    display: "swap",
    variable: "--font-montserrat",
    weight: ["400", "500", "700"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uk" className={montserrat.variable}>
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
