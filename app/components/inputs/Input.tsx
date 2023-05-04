'use client'

import {
    FieldErrors,
    FieldValues,
    UseFormRegister 
} from 'react-hook-form'

import {BiDollar} from 'react-icons/bi'

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    errors: FieldErrors;
    register: UseFormRegister<FieldValues>;
    required?: boolean;
    formatPrice?: boolean
 
}
const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    register,
    required,
    errors,
    formatPrice
 
}) => {
   
    return (
        <div className='w-full relative'>
            {formatPrice && (
                <BiDollar
                size={20}  
                className="
                  text-neutral-700
                  absolute
                  top-3
                  left-2
                "
              />
            )
            }
           <input 
                id={id}
                type={type}
                disabled = {disabled}
                placeholder=' '
                {...register(id, {required})}
                className={`
                    peer
                    w-full
                    text-s
                    rounded-lg
                    border-[1px]
                    p-3
                    font-light
                    bg-white                 
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${formatPrice ? 'pl-9' : 'pl-4'}
                    ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
            />
            
            <label className={`
                absolute
                text-md
                text-gray-500
                duration-150
                transform
                -translate-y-3
                top-3
                z-9
                left-2
                origin-[0] 
                ${formatPrice ? 'left-9' : 'left-4'}
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                peer-focus:-translate-x-1
                ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}               
            `}>
                {label}
            </label>
        </div>
    )
}

export default Input