import Avatar from "@/components/smallPieces/Avatar";
import Header from "./_components/header";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavLinks } from "@/components/ProfileNav";
import { authFetch } from "@/lib/authFetch";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import SmallProfileCard from "@/components/Profile-small-card";

interface ProfileLayoutProps {
  children: ReactNode;
  params: { id: string };
}

export default async function ProfileLayout({
  children,
  params,
}: ProfileLayoutProps) {
  const user = await authFetch("user/" + params.id);
  if (!user || user.error) notFound();

  const session = await getSession();

  return (
    <main className="sm:mx-20 md:mx-32 mt-5">
      <div className="flex justify-between items-center gap-x-2">
        <div className="flex gap-3 items-center">
          <SmallProfileCard/>
        </div>
        <Button variant={"outline"} className="text-blue-900" asChild>
          {params.id.toString() === session?.user.id.toString() && (
            <Link href="/edit-profile">Edit Profile</Link>
          )}
        </Button>
      </div>
      <NavLinks id={params.id} />
      {children}
    </main>
  );
}
