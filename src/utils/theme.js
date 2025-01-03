// src/utils/theme.js
export const getStoredTheme = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.warn('Failed to get theme from localStorage:', error);
        return null;
    }
};

export const setStoredTheme = (key, theme) => {
    try {
        localStorage.setItem(key, theme);
    } catch (error) {
        console.warn('Failed to store theme in localStorage:', error);
    }
};

export const applyThemeStyles = (theme) => {
    const styles = {
        light: {
            '--background': 'white',
            '--text-primary': '#1a1a1a',
            '--text-secondary': '#4a4a4a',
            '--accent': '#2563eb',
            '--border': '#e5e7eb',
            '--card': 'white',
            '--card-foreground': '#1a1a1a',
            '--primary': '#2563eb',
            '--primary-foreground': 'white',
            '--secondary': '#f3f4f6',
            '--secondary-foreground': '#1a1a1a',
            '--destructive': '#ef4444',
            '--destructive-foreground': 'white',
            '--ring': '#2563eb',
        },
        dark: {
            '--background': '#1a1a1a',
            '--text-primary': '#ffffff',
            '--text-secondary': '#a3a3a3',
            '--accent': '#3b82f6',
            '--border': '#2e2e2e',
            '--card': '#1a1a1a',
            '--card-foreground': '#ffffff',
            '--primary': '#3b82f6',
            '--primary-foreground': '#ffffff',
            '--secondary': '#2e2e2e',
            '--secondary-foreground': '#ffffff',
            '--destructive': '#ef4444',
            '--destructive-foreground': '#ffffff',
            '--ring': '#3b82f6',
        }
    };

    const root = document.documentElement;
    Object.entries(styles[theme]).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
};