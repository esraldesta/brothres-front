import Link from "next/link";
import { ReactNode } from "react";
import { cn, isValidUrl } from "@/lib/utils";
import { FaRegUser } from "react-icons/fa6";
import Image from "next/image";
import { authFetch } from "@/lib/authFetch";

interface Props {
  children?: ReactNode;
  className?: string;
  image?: string | null;
  size?: number;
}

export default async function SmallProfileCard({
  children,
  className,
  image,
  size = 15,
}: Props) {
  const user= await authFetch('auth/profile') 
  return (
    <Link
      href="/profile/1"
      className={cn("flex gap-2 items-center", className)}
    >
      {image && isValidUrl(image) ? (
        <Image src={image} height={size} width={size} alt="profile image" />
      ) : (
        <div
          className={`flex items-center justify-center rounded-full bg-navy p-4`}
        >
          <FaRegUser
            className={`w-[${size}px] h-[${size}px] text-white`}
            stroke="2"
          />
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex">
          <p className="font-bold leading-none">
            {user.firstName} {user.lastName}
          </p>
          {children ? <>{children}</> : ""}
        </div>
        <span className="text-[12px] text-muted">@{user.email}</span>
      </div>
    </Link>
  );
}
