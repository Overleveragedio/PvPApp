import { generateUsername } from "@/lib/utils";

interface UserAvatarProps {
    address: string;
    size?: "sm" | "md" | "lg";
    variant?: "solid" | "gradient";
}

const UserAvatar = ({ address, size = "md", variant = "solid" }: UserAvatarProps) => {
    const sizes = {
        sm: "w-6 h-6 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-20 h-20 text-2xl",
    };

    const backgrounds = {
        solid: "bg-primary",
        gradient: "bg-gradient-to-r from-primary to-accent",
    };

    const textColor = variant === "gradient" ? "text-black" : "text-white";

    return (
        <div className={`${sizes[size]} ${backgrounds[variant]} rounded-full flex items-center justify-center`}>
            <span className={`${textColor} font-bold`}>
                {generateUsername(address).charAt(4)}
            </span>
        </div>
    );
};

export default UserAvatar;