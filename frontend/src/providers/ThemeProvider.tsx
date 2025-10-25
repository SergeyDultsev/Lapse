'use client'

import { ReactNode, useEffect } from "react";
import { initTheme } from "@shared/lib/theme/initTheme";

export function ThemeProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        initTheme();
    }, []);

    return <>{children}</>
}