import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => {
    return (
        <div className={cn(
            "bg-background-tertiary border border-primary/30 border-1 rounded-xl p-6",
            "backdrop-blur-sm transition-all duration-200",
        )}>
            {children}
        </div>
    )
}

export default Card;