'use client'
import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";


interface HostPlaceInputProps {
    title: string;
    subTitle: string;
    value: number;
    onChange: (value: number) => void;

}
const HostPlaceInput: React.FC<HostPlaceInputProps> = ({
    title,
    subTitle,
    value,
    onChange
}) => {

    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const onReduce = useCallback(() => {
        if (value === 1) {
            return;
        }

        onChange(value - 1);
    }, [onChange, value])

    return (
        <div>
            <div className="
                flex 
                flex-row
                items-center
                justify-between
            ">
                <div className="flex flex-col">
                    <div className="font-medium">{title}</div>
                    <div className="font-loght text-gray-600">{subTitle}</div>
                </div>
                <div className="
                    flex
                    flex-row
                    items-center
                    gap-4
                ">
                    <div
                        onClick={onReduce}
                        className="  border-[1px]
                        cursor-pointer
                        rounded-full
                        p-2"
                    >
                        <AiOutlineMinus />
                    </div>
                    <div className="
                        font-light 
                        text-xl 
                        text-neutral-600
                    ">
                        {value}
                    </div>
                    <div onClick={onAdd}
                        className="
                          border-[1px]
                           cursor-pointer
                           rounded-full
                           p-2
                        ">
                        <AiOutlinePlus /></div>
                </div>
            </div>

        </div>
    )
}

export default HostPlaceInput;