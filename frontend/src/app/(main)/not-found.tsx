import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "404",
    description: "Страница 404",
};

export default function NotFoundPage() {
    return (
        <div>
            <h1>404</h1>
            <p>Страница не найдена</p>
        </div>
    );
}