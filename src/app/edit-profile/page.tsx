import EditProfile from "@/components/main/forms/Edit Profile/EditProfile";
import TopPageHeader from "@/components/smallPieces/TopPageHeader";
import { authFetch } from "@/lib/authFetch";
import { getSession } from "@/lib/session";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function page() {
  return (
    <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
      <EditSuspense />
    </main>
  );
}

async function EditSuspense() {
  const userData = await authFetch("auth/full-profile");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mt-14">
        <EditProfile userData={userData} />
      </div>
    </Suspense>
  );
}
