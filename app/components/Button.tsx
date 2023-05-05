'use client'
import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    iconColor?:string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;

}

const Button: React.FC<ButtonProps> = ({
    label,
    outline,
    onClick,
    disabled,
    small,
    iconColor,
    icon: Icon,
}) => {
    return (
        <button
            onClick={onClick}
            className={`
            relative
            w-full
            rounded-lg
            disabled:opacity-70
            disabled:cursor-not-allowed
            border-[1px]
        
            ${outline? 'hover:bg-neutral-100' : ''}
           
            ${outline ? 'bg-white' : 'bg-rose-500'}
            ${outline ? 'border-black' : 'border-rose-500'}
            ${outline ? 'text-black' : 'text-white'}
            ${small ? 'h-8' : 'h-12'}
        `}
        >
            {Icon && (
                <Icon
                    size={24}
                    color={iconColor}
                    className="
                        absolute
                        left-4
                        top-3
                    "
                />
            )}
            {label}
        </button>
    )

}

export default Button