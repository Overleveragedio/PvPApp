import { cn } from "@/lib/utils";

interface GradientHeadingProps {
    children: React.ReactNode;
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const SectionHeading = ({
    children,
    size = 'lg',
    className,
    as: Component = 'h2'
}: GradientHeadingProps) => {
    const sizeClasses = {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
        '7xl': 'text-7xl',
        '8xl': 'text-8xl',
        '9xl': 'text-9xl'
    };

    return (
        <Component className={cn('font-bold', sizeClasses[size], className)}>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {children}
            </span>
        </Component>
    );
};

export default SectionHeading;