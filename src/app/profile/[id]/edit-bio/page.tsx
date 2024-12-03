import { Suspense } from "react";
import { BioEditor } from "../_components/edit-bio";
import { authFetch } from "@/lib/authFetch";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <BioSuspense userId={id} />
      </Suspense>
    </section>
  );
}

async function BioSuspense({ userId }: { userId: string }) {
  const user = await authFetch("user/" + userId);
  const session = await getSession()
  
  if (!user || user.error || !session?.user) notFound();
  if(session?.user.id !== userId){    
    
    return <div className="mx-auto my-5 w-full text-center">You don't have access to edit</div>
  }
  return (
    <section>
      <BioEditor data={user.bio} />;
    </section>
  );
}
