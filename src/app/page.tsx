import Link from "next/link";

export default async function Home() {
    return (
        <div>
            <h1>Главная</h1>
            <Link href="/models">Модели</Link>
        </div>
    );
}
