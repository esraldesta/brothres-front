import Avatar from "@/components/smallPieces/Avatar";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authFetch } from "@/lib/authFetch";
import { notFound } from "next/navigation";
import { Topnav } from "./_components/Topnav";

interface ProfileLayoutProps {
  children: ReactNode;
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  const userData = await authFetch("auth/full-profile");
  return (
    <main className="sm:mx-20 md:mx-32 mt-5">
      <div className="flex justify-between items-center gap-x-2">
        <div className="flex gap-3 items-center">
          <Avatar
            width="w-[50px]"
            height="h-[50px]"
            iconWidth="w-[20px]"
            iconHeight="h-[20px]"
          />
          <div className="flex flex-col justify-center">
            <p className="font-bold text-lg py-0">
              {userData.firstName} {userData.lastName}
            </p>
            <span className="text-sm text-gray-400 -mt-2">
              @{userData.userName}
            </span>
          </div>
        </div>
      </div>
      <Topnav />
      {children}
    </main>
  );
}
