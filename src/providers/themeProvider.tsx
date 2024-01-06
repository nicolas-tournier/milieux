import React, { createContext, useContext } from 'react';
import useLocalStorage from 'use-local-storage';

export const ThemeContext = createContext({
    theme: 'light',
    setTheme: (theme: string) => { },
});

export function ThemeProvider({ children }) {
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}