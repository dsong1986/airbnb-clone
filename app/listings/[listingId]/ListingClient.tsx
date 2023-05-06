'use client'

import axios from "axios"
import { SafeUser, SafeListing } from "@/app/types";
import ListingHead from "@/app/components/listings/ListingHead";
import Container from "@/app/components/Container";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { useMemo } from "react";
import { categories } from "@/app/components/navbar/Categories";


interface ListingClientProps {
    currentUser?: SafeUser | null;
    listing: SafeListing;
}

const ListingClient: React.FC<ListingClientProps> = ({
    currentUser,
    listing,
}) => {

    const category = useMemo(() => {
        return categories.find((items) => 
         items.label === listing.category);
     }, [listing.category]);

    return (
        <Container>
            <div className="
                 max-w-screen-lg 
                 mx-auto
            ">
            
                <div className="flex flex-col gap-6">
                    <ListingHead
                        id={listing.id}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        title={listing.title}
                        currentUser={currentUser}
                    />
                    <div>
                        <ListingInfo 
                            currentUser = {currentUser}
                            roomCount={listing.roomCount}
                            category = {category}
                            locationValue={listing.locationValue}
                            description={listing.description}
                            bathroomCount = {listing.bathroomCount}
                            guestCount={listing.guestCount}
                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient
