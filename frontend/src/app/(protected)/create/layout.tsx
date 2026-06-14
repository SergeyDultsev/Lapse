'use client';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="layout">
            <main className="container">{children}</main>
        </div>
    );
}