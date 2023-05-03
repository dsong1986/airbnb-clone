'use client'

import { IconType } from "react-icons";

interface CategoryInputProps {
    label:string,
    icon:IconType,
    selected:boolean,
    onClick: (vale:string) =>void;
}

const CategoryInput:React.FC<CategoryInputProps> = ({
    label,
    icon : Icon,
    selected,
    onClick
}) => {
    return (
        <div
            onClick={ () => onClick(label)} 
            className={`
            rounded-lg
            flex
            flex-col
            p-3
            gap-2
            transition
            cursor-pointer
            hover:border-neutral-800
            hover:border-[2px]
            ${selected? 'bg-neutral-50' : 'bg-white' }
            ${selected? 'border-black' : 'border-gray-400'}
            ${selected? 'border-[2px]' : 'border-[1px]' }
         `} >
            <div><Icon size={30}/></div>
            <div className=" font-semibold ">{label}</div>
            
        </div>
    )
}

export default CategoryInput