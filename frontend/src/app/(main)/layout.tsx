'use client';

import { TanstackQueryProvider } from '@/libs';
import { 
    ThemeProvider, 
    ModalProvider 
} from '@/providers';
import { NavBar } from '@/widgets';
import '@/assets/css/global.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <TanstackQueryProvider>
            <ThemeProvider>
                <ModalProvider>
                    <div className="layout">
                        <NavBar />
                        <main className="container">{children}</main>
                    </div>
                </ModalProvider>
            </ThemeProvider>
        </TanstackQueryProvider>
    );
}