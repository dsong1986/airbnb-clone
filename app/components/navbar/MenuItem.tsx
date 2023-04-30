'use client';

import React from "react";

interface MenuItemProps {
    onClick: ()=>void;
    label: string;
    weight: string;
}

const MenuItem : React.FC <MenuItemProps> = ({
    onClick,
    label,
    weight
}) => {
    return (
        <div onClick={onClick} 
            className={`px-4 py-2 my-1 hover:bg-neutral-100 font-light transition  font-poppins ${weight}`}>
            {label}
        </div>
    )
};

export default MenuItem