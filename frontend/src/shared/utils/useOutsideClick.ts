'use client';

import { useEffect, useRef } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLDivElement>(callback: () => void) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, [callback]);

    return ref;
};