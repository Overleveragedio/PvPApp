import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    variant?: "primary" | "secondary";
    className?: string;
}

const FilterSelect = ({
    options,
    placeholder = "Select...",
    value,
    onChange,
    variant = "secondary",
    className = ""
}: SelectProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={clsx("relative", className)}>
            <select
                value={value}
                onChange={handleChange}
                className={clsx(
                    "appearance-none bg-background border rounded-xl px-4 py-2 pr-10 font-medium focus:outline-none transition-colors cursor-pointer text-sm",
                    {
                        "border-primary/30 text-primary focus:border-primary/50": variant === "primary",
                        "border-slate-700/50 text-slate-300 focus:border-primary/50": variant === "secondary"
                    }
                )}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown
                className={clsx(
                    "absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none",
                    {
                        "text-primary": variant === "primary",
                        "text-slate-400": variant === "secondary"
                    }
                )}
            />
        </div>
    );
};

export default FilterSelect;