import Image from "next/image";
import Logo from "../../../public/logo.png";
import NavButtons from "./NavButtons";
import { SideNav } from "../side-nav";
import SearchBar from "./search-bar";
import Link from "next/link";
import SelectLang from "../SelectLang";


export default function Navbar() {
  return (
    <nav className="relative inset-x-0 top-0 mt-5 max-md:px-7 md:px-7 xl:px-20">
      <div className="flex items-center justify-between sm:gap-20 md:gap-10">
        <div className="flex items-center">
          {/* logo and sidebar */}
          <div className="flex shrink-0 items-center">
            <Link
              href="/"
              className="sm:w-[46px] sm:h-[49px]  w-[35px] h-[38px]"
            >
              <Image src={Logo} alt="logo" />
            </Link>
            <SideNav />
          </div>

          <SelectLang/>
          <SearchBar />

          <span className="h-[35px] border-[1px] ml-3 mr-5 border-gray-200"></span>
          {/* navigation links */}
          <div className="flex gap-4 items-center text-gray-500 font-semibold text-sm">
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Video Blogs</Link>
            <Link href={"/"}>Founders</Link>
          </div>

        </div>
        {/* navbar btns */}
        <div className="max-sm:w-[125px] sm:w-[350px] md:w-[400px]">
          {<NavButtons />}
        </div>
      </div>
    </nav>
  );
}
