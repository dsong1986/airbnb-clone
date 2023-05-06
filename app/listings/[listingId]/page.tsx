// This is a server components do not use client

import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    listingId?: string,
}


const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <div className="
            absolute
            top-[80px]
        ">
               <ListingClient
                    listing = {listing}
                    currentUser = {currentUser}
               />     
            </div>
        </ClientOnly>
    )
}
export default ListingPage;