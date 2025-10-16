import { LucideIcon, Search } from "lucide-react";

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description: string;
    className?: string;
}

export const EmptyState = ({
    icon: Icon = Search,
    title,
    description,
    className = "col-span-full",
}: EmptyStateProps) => {
    return (
        <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
            <Icon className="w-12 h-12 text-slate-500 mb-4" />
            <h3 className="text-lg font-semibold text-slate-300 mb-2">
                {title}
            </h3>
            <p className="text-slate-400 max-w-md">
                {description}
            </p>
        </div>
    );
};
