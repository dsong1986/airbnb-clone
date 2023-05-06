'use client'

import { IconType } from "react-icons"


interface CategoryViewProps {
    icon: IconType,
    label: string,
    description: string,
}


const CategoryView: React.FC<CategoryViewProps> = ({
    icon: Icon,
    label,
    description
}) => {
    return (
        <div className="
            flex
            flex-col
            gap-6
        ">
            <div className="
                flex
                flex-row
                items-center
                gap-4
            ">
                <div>
                    <Icon size={36} />
                </div>

                <div>
                    <div className="
                        font-semibold
                        text-lg
                    ">
                        {label}
                    </div>
                    <div className="
                        text-neutral-500
                        font-light
                    " >
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryView