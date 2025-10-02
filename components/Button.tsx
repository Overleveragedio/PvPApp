interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    className = '',
    type = 'button'
}: ButtonProps) => {
    const baseStyles = "font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer";

    const variants = {
        primary: "bg-gradient-to-r from-primary to-accent shadow-lg shadow-accent/25 text-black font-bold",
        secondary: "text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 bg-transparent"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm h-8",
        md: "px-6 py-3 text-base h-10 sm:h-12",
        lg: "px-8 py-4 text-lg h-12 sm:h-14"
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;