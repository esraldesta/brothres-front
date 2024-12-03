import ArticlesBlog from "@/components/main/forms/ArticlesBlog";
import { authFetch } from "@/lib/authFetch";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page({ params }: { params: { id: string } }) {

  return (
    <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
      <div className="mt-16">
        <h3 className="text-black text-xl font-semibold"> Edit Post </h3>
        <Suspense fallback={<div className="mx-auto my-5 w-full text-center">Loading...</div>}>
          <EditSuspense id={params.id} />
        </Suspense>
      </div>
    </main>
  );
}

async function EditSuspense({ id }: { id: string }) {  
  const session = await getSession()
  const blog = await authFetch(`blogs/${id}`);

  if (!blog || blog.error) notFound();

  if(session?.user.id !== blog.authorId){    
    return <div className="mx-auto my-5 w-full text-center">You don't have access to edit this blog</div>
  }

  return (
    <div>
      <ArticlesBlog postData={blog} />
    </div>
  );
}
