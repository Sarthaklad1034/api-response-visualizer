// src/hooks/useClipboard.js
import { useState, useCallback } from 'react';

export const useClipboard = () => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback(async(text) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    }, []);

    return { copyToClipboard, isCopied };
};