
'use client'

interface HeadingProps {
    title?: string,
    subTitle?: string,
    center?: boolean
}
const Heading: React.FC<HeadingProps> = ({
    title,
    subTitle,
    center
}) => {
    return (
        <div className="p-2">
            <div className="
            font-semibold
            text-xl
        ">
                {title}
            </div>
            <div className="
            text-md
            text-gray-600
        ">
                {subTitle}
            </div>
        </div>
    )
}

export default Heading