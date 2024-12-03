import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";

export default function LogoElement({ small = false }) {
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="sm:w-[46px] sm:h-[49px]  w-[35px] h-[38px]">
        <Image src={Logo} alt="logo" width={46} height={49} />
      </Link>
      {!small ? (
        <span className="font-black sm:text-2xl whitespace-nowrap">
          Brothers Community
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
