'use client'

import Container from "../Container"
import { TbBeach } from 'react-icons/tb'
import { 
    GiWindmill, GiElvenCastle, GiCampingTent, 
    GiSpookyHouse, GiIsland, GiFishingBoat,
    GiMountainCave,
 } from 'react-icons/gi'
import { MdOutlineVilla, MdOutlineCabin,MdDownhillSkiing } from 'react-icons/md'
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"
import { FaSwimmingPool } from 'react-icons/fa'
import {RiCactusLine} from 'react-icons/ri'

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to beach'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property is close to windmills'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern'
    },
    {
        label: 'Castle',
        icon: GiElvenCastle,
        description: 'This property is Castle'
    },
    {
        label: 'Pools',
        icon: FaSwimmingPool,
        description: 'This property has a pool'
    },
    {
        label: 'Cabins',
        icon: MdOutlineCabin,
        description: 'This property is a cabin'
    },
    
    {
        label: 'Camping',
        icon: GiCampingTent,
        description: 'This property is a camp'
    },
    
    {
        label: 'Mansion',
        icon: GiSpookyHouse,
        description: 'This property is a mansion'
    },
    
    {
        label: 'Skiing',
        icon: MdDownhillSkiing,
        description: 'This property is close to skiing'
    },
    
    {
        label: 'Island',
        icon: GiIsland,
        description: 'This property is on an island'
    },
    
    {
        label: 'Boat',
        icon: GiFishingBoat,
        description: 'This property is a boat'
    },
    {
        label: 'Desert',
        icon: RiCactusLine,
        description: 'This property is in a desert'
    },
    {
        label: 'Caves',
        icon: GiMountainCave,
        description: 'This property is a cave'
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = (pathname === '/')

    if(!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="
            pt-4
            gap-4
            flex flex-row
            items-center 
            justify-between
            overflow-x-auto
            ">
                {
                    categories.map((item) => (
                        <CategoryBox
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            selected={category === item.label}
                        />
                    ))
                }
            </div>
        </Container>
    )

}

export default Categories