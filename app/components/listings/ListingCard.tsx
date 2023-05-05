'use client'
import { Listing } from "@prisma/client";
import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { useReducer } from "react";
import { useRouter } from "next/navigation";

interface ListingCardProps {
    data: Listing;
    onAction?: (id: string) => void;
    disabled?: boolean;
    currentUser?: SafeUser | null;
    actionLabel?: string;

}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    onAction,
    disabled,
    currentUser,
    actionLabel
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue)
    const router = useRouter();
    return (
        <div 
            onClick={ () => router.push(`/listings/${data.id}`)}
            className="
                col-span-1 
                cursor-pointer 
                group
        ">
            <div className="flex flex-col gap-2 w-full">

                {/* Image here */}
                <div className="
                    aspect-square
                    w-full
                    relative
                    overflow-hidden
                    rounded-xl
                ">
                    <Image
                        fill
                        alt="Lsting"
                        src={data.imageSrc}
                        className="
                            object-cover 
                            h-full 
                            w-full 
                            group-hover:scale-110 
                            transition
                        "
                    />

                    <div className="
                        absolute
                        top-3
                        right-3
                    ">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />

                    </div>
                </div>

                {/* Location */}
                <div className="
                    font-semibold
                    text-l
                ">
                    {location?.region}, {location?.label}
                </div>

                {/* Reservation or Category */}
                <div className="
                    font-light
                    text-neutral-500
                ">
                    {data.category}

                </div>

                {/* Price */}
                <div className="flex flex-row gap-1">
                    <div className="font-semibold">
                        ${data.price}
                    </div>
                    <div className="font-light">
                        night
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ListingCard