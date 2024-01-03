import React, { createContext, useContext } from 'react';
import useLocalStorage from 'use-local-storage';

// Create a context for the theme
export const ThemeContext = createContext({
    theme: 'light',
    setTheme: (theme: string) => { },
});

// Create a provider component that wraps your application and makes the theme available to all components
export function ThemeProvider({ children }) {
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Create a hook that lets components use the theme
export function useTheme() {
    return useContext(ThemeContext);
}