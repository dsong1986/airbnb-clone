'use client'
import Avatar from '../Avatar'
import { BsGlobe2 } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'

const UserMenu = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex items-center justify-between gap-6">
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition  cursor-pointer">
                    Switch to Hosting
                </div>

                <div className="hidden md:block">
                    <div className="flex justify-center items-center rounded-full hover:bg-neutral-100 transition  cursor-pointer w-[40px] h-[40px] ">
                        <BsGlobe2 size={16} />
                    </div>
                </div>

                <div className="hidden md:block">
                    <div onClick={toggleOpen}
                        className="py-2 px-3 flex items-center gap-1 rounded-full border-[1px] cursor-pointer hover:shadow-md transition ">
                        <AiOutlineMenu />
                        <div className="hidden md:block">
                            <Avatar />
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute right-0 
                                hidden md:block
                                w-[240px] 
                                bg-white  rounded-lg 
                                border-[1px] shadow-md">
                    <div className="flex flex-col cursor-pointer ">
                        <MenuItem onClick={loginModal.onOpen} label="Log in" weight="font-normal" />
                        <MenuItem onClick={registerModal.onOpen} label="Sign up" weight="font-light"/>
                        <hr />
                        <MenuItem onClick={() => {}} label="Airbnb your home" weight="font-light" />
                        <MenuItem onClick={() => {}} label="help" weight="font-light"/>
                    </div>

                </div>
            )}
        </div>
    )
}

export default UserMenu                                                                                                                   