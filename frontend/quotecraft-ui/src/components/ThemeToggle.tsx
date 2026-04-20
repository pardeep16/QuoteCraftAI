import { useThemeContext } from "../context/ThemeContext";
import { MoonIcon, SunIcon } from "lucide-react";


const ThemeToggle = () => {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex size-9 items-center justify-center
       rounded-full border border-slate-300 bg-white/60 text-slate-700
        transition hover:bg-white dark:border-slate-700 dark:bg-slate-800/70
         dark:text-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
            title="Toggle theme"
        >
            {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
        </button>
    )

}

export { ThemeToggle };