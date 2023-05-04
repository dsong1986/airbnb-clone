
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
        <div className="p-3">
            <div className="
            font-semibold
            text-xl
            pb-1
        ">
                {title}
            </div>
            <div className="
            text-sm
            text-gray-400
        ">
                {subTitle}
            </div>
        </div>
    )
}

export default Heading