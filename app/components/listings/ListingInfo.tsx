'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import CategoryView from "./ListingCategory";

interface LisitingInfoPros {
    roomCount: number;
    currentUser: SafeUser | null | undefined;
    guestCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    locationValue: string;
    bathroomCount: number;
    description: string;

}

const ListingInfo: React.FC<LisitingInfoPros> = ({
    roomCount,
    currentUser,
    guestCount,
    bathroomCount,
    description,
    category,
    locationValue

}) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div>
            <div className=" 
                flex 
                flex-row 
                gap-2
                items-center
                font-semibold
                text-md
                text-neutral-500
               
            ">

                <div>  Hosted by  </div>
                <div className="
                    text-lg
                    text-black
                ">
                    {currentUser?.name}
                </div>
                <Avatar src={currentUser?.image} />
            </div>

            <div className="
                flex 
                flex-row
                gap-3
                items-center
            ">
                <div>
                    {guestCount === 1 ? `${guestCount} Guest` : `${guestCount} Guests`}
                </div>
                <div>
                    {roomCount === 1 ? `${roomCount} Room` : `${roomCount} Rooms`}
                </div>
                <div>
                    {bathroomCount === 1 ? `${bathroomCount} Room` : `${bathroomCount} Rooms`}
                </div>
            </div>

            <hr />
            {category && (
                <div className="
                py-6
                ">
                <CategoryView 
                    label = {category.label}
                    description={category.description}
                    icon = {category.icon}
                />
              </div>
            )}

            <hr />
            <div className="
                text-lg
                font-light
                text-neutral-500
                py-4
            ">
                {description}
            </div>

            <hr />
        </div>
    )
}

export default ListingInfo