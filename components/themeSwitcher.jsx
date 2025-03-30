'use client';
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/context/themeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className="flex items-center space-x-2 transition-colors duration-500 ease-in-out">
            {
                theme === 'light' ?
                    <Moon size={16} />
                    :
                    <Sun size={16} />
            }
            <Switch onCheckedChange={toggleTheme} className="cursor-pointer" />
        </div>
    );
}