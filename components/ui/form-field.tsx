import { ReactNode } from "react";

interface FormFieldProps {
    icon: ReactNode;
    label: string;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    badge?: { text: string; variant: "success" | "warning" | "error" };
    helperText?: string;
    className?: string;
}

export function FormField({
    icon,
    label,
    name,
    type,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    badge,
    helperText,
    className = ""
}: FormFieldProps) {
    const badgeStyles = {
        success: "bg-green-500/20 text-green-400",
        warning: "bg-yellow-500/20 text-yellow-400",
        error: "bg-red-500/20 text-red-400",
    };

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-foreground mb-2">
                <div className="flex items-center gap-2">
                    {icon}
                    {label}
                </div>
            </label>
            <div className="relative">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={placeholder}
                />
                {badge && (
                    <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded ${badgeStyles[badge.variant]}`}>
                        {badge.text}
                    </span>
                )}
            </div>
            {error && (
                <p className="text-xs text-red-400 mt-1">{error}</p>
            )}
            {helperText && !error && (
                <p className="text-xs text-muted-foreground mt-1">{helperText}</p>
            )}
        </div>
    );
}