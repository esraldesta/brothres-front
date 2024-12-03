import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { IoIosArrowDown } from 'react-icons/io'
import Link from 'next/link'
import { FaRegUser } from 'react-icons/fa6'
import { GiLinkedRings } from 'react-icons/gi'
import { Button } from './ui/button'
import Logout from './icons/logout'
import { authFetch } from '@/lib/authFetch'

export default async function Navdropdown() {
    const user = await authFetch('auth/profile')

    return (
        <div className="flex gap-2">
            <Popover>
                <PopoverTrigger className="max-sm:pr-3">
                    <div className="flex gap-3 items-center">
                        <IoIosArrowDown className="mt-2" />
                    </div>
                </PopoverTrigger>

                <PopoverContent className="max-sm:w-[200px] sm:w-[250px] h-auto max-sm:mr-4 py-5 my-5 focus-visible:outline-none">
                    <div>
                        <Link
                            href="/profile/1"
                            className="flex gap-2 items-center"
                        >

                            <div
                                className={`flex items-center justify-center rounded-full bg-navy p-4`}
                            >
                                <FaRegUser
                                    className={`w-[15px] h-[15px] text-white`}
                                    stroke="2"
                                />
                            </div>

                            <div className="flex flex-col">
                                <div className="flex">
                                    <p className="font-bold leading-none">
                                        {user.firstName} {user.lastName}
                                    </p>
                                </div>
                                <span className="text-[12px] text-muted">@{user.email}</span>
                            </div>
                        </Link>

                        {/* <Avatar closePopUp={true} setOpenPopUp={setOpenPopUp} />
            <div className="flex items-center gap-10">
              <h3 className="text-base text-black font-medium">
                {data?.firstName}
              </h3>
            </div> */}

                        <hr className="border-t border-gray-400 w-full my-4" />
                        {/* LINKS TO OTHER PAGES */}
                        <div className="flex flex-col justify-start ml-4 gap-3 mt-3">
                            <Link
                                href={"/referals"}
                                className="flex items-center gap-2"
                            >
                                <GiLinkedRings className="w-4 h-4" />
                                <button className="text-[15px] text-black font-palanquin hover:text-blue-600">
                                    My Referals
                                </button>
                            </Link>
                            <Button className="flex gap-4 items-center mt-3" asChild>
                                <a href="/api/auth/signout" >
                                    <Logout className="w-4 h-4" />
                                    <span className="">Logout</span>
                                </a>

                            </Button>
                        </div>
                    </div>
                </PopoverContent>

            </Popover>
        </div>
    )
}
