import Link from "next/link";
import { IoMdNotifications } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Navdropdown from "../nav-dropdown";
import { getSession } from "@/lib/session";
import SmallProfileCard from "../Profile-small-card";
import { Suspense } from "react";

export default async function NavButtons() {
  const session = await getSession()
  return (
    <section
      className={`flex items-center justify-end ${session?.user ? "gap-7" : "max-sm:ml-6 gap-10"}  text-sm`}
    >
      {session?.user ? (
        <Popover>
          <PopoverTrigger>
            <div className="max-lg:hidden w-[135px] h-auto border border-navy px-3 py-2 text-sm text-navy rounded-md focus-visible:outline-none font-semibold flex items-center gap-3">
              <p> Create Post </p>
              <div>
                <MdKeyboardArrowDown className="w-4 h-4 text-navy" />
              </div>
            </div>
          </PopoverTrigger>

          <PopoverContent className="mt-2 w-[180px] h-auto bg-white border-none rounded-md px-4 py-3 flex flex-col items-start gap-1">
            <Link
              href={"/create-post"}
              className="hover:bg-blue-300 hover:bg-opacity-60 px-4 py-2 rounded-md text-sm text-black font-palanquin"
            >
              Create Blog Post
            </Link>
            <Link
              href={"/video-blog/create"}
              className="hover:bg-blue-300 hover:bg-opacity-60 px-4 py-2 rounded-md text-sm text-black font-palanquin"
            >
              Create Video Blog
            </Link>
          </PopoverContent>

        </Popover>
      ) : (
        <Link
          href="/register"
          className="max-lg:hidden w-[110px] h-auto border border-navy px-3 py-2 text-sm text-navy rounded-md focus-visible:outline-none font-semibold"
        >
          Get Started
        </Link>
      )}
      {session?.user ? (
        <div className="flex items-center max-sm:gap-2 sm:gap-4">
          <Link href={"/notifications"} className="relative">
            <IoMdNotifications className="w-7 h-7 text-navy" />
            <div className="absolute right-1.5 top-0 rounded-full w-2 h-2 bg-orangeRed" />
          </Link>
          <Suspense fallback={<div>Loading</div>}>
            <SmallProfileCard/>
          </Suspense>
          <Navdropdown/>

        </div>
      ) : (
        <Link
          href="/sign-in"
          className="bg-navy text-white px-6 max-sm:py-2 sm:py-3 text-sm focus-visible:outline-none rounded-md font-semibold"
        >
          Sign In
        </Link>
      )}
    </section>
  );
}
