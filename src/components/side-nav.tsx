import LogoElement from "./logo";
import Link from "next/link";
import Home from "./icons/home";
import Founder from "./icons/founder";
import Logout from "./icons/logout";
import { Check, LogIn } from "lucide-react";
import { RiArrowDropDownLine } from "react-icons/ri";
import SmallProfileCard from "./Profile-small-card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Navdropdown from "./nav-dropdown";
import { getSession } from "@/lib/session";

export async function SideNav() {
  const session = await getSession()

  return (
    <div className="grid grid-cols-2 gap-2 text-text">
      <Sheet>
        <SheetTrigger asChild><RiArrowDropDownLine className="w-5 h-5" /></SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle><LogoElement /></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-1 py-4">
            <Link
              href="/"
              className="flex gap-4 items-center group hover:bg-bluish-light p-2"
            >
              <Home className="w-4 h-4 group-hover:text-bluish text-muted" />
              <span className="group-hover:text-bluish text-text"> Home</span>
            </Link>
            <Link
              href="/founder-ranking"
              className="flex gap-4 items-center group hover:bg-bluish-light p-2"
            >
              <Founder className="w-[18px] h-[18px] group-hover:text-bluish text-muted" />
              <span className="group-hover:text-bluish text-text">
                Founders Ranking Page
              </span>
            </Link>

            <Link
              href="/referals"
              className="flex gap-4 items-center group hover:bg-bluish-light p-2"
            >
              <Check className="w-4 h-4 group-hover:text-bluish text-muted" />
              <span className="group-hover:text-bluish text-text">
                Referals
              </span>
            </Link>

            {session?.user ? (
              <a
                className="flex gap-4 items-center group hover:bg-bluish-light p-2 cursor-pointer"
                 href="/api/auth/signout"
              >
                  <Logout className="w-4 h-4 group-hover:text-bluish text-muted" />

                <span className="group-hover:text-bluish text-text">
                  Logout
                </span>
              </a>
            ) : (
              <Link
                href={"/sign-in"}
                className="flex gap-4 items-center group hover:bg-bluish-light p-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 group-hover:text-bluish text-muted" />
                <span className="group-hover:text-bluish text-text">
                  Sign in
                </span>
              </Link>
            )}
          </div>

          {session?.user && (
            <div className="flex items-center max-sm:gap-2 sm:gap-4 bg-bluish-light mt-4 p-2">
              <SmallProfileCard/>
              <Navdropdown/>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
