import '@fortawesome/fontawesome-free/css/all.min.css';
import { useTheme } from '../providers/themeProvider'; // adjust the path to where you saved the ThemeProvider component

// Your ThemeSwitcher component can now use the useTheme hook
export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return (
        <div className="theme-switcher" data-theme={theme}>
            <button
                onClick={switchTheme}
                className="w-auto h-10 px-5 bg-white rounded-full shadow focus:outline-none flex items-center justify-center"
            >
                {theme === 'light' ? (
                    <>
                        <i className="fas fa-moon mr-2"></i> {/* Moon icon for light theme */}
                        <span className="hidden lg:block">Change to Dark</span>
                    </>
                ) : (
                    <>
                        <i className="fas fa-sun mr-2"></i> {/* Sun icon for dark theme */}
                        <span className="hidden lg:block">Change to Light</span>
                    </>
                )}
            </button>
        </div>
    );
}