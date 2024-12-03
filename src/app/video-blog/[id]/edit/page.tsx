// import VideoBlog from "@/components/Main/forms/VideoBlog";
// import TopPageHeader from "@/components/Small Pieces/TopPageHeader";

// export default function page() {
//   return (
//     <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
//       <TopPageHeader
//         pageCode="PG-32"
//         pageName="Create video blog page"
//         pageDescription="Bring your ideas to life with video"
//       />
//       <div className="mt-14">
//         <h3 className="text-xl text-black font-semibold">
//           {" "}
//           Create Video Blog{" "}
//         </h3>
//       </div>
//       <VideoBlog />
//     </main>
//   );
// }

import VideoBlog from "@/components/main/forms/VideoBlog";
import TopPageHeader from "@/components/smallPieces/TopPageHeader";
import { authFetch } from "@/lib/authFetch";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default function page({ params }: { params: { id: string } }) {
  return (
    <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
      <TopPageHeader
        pageCode="PG-32"
        pageName="Create video blog page"
        pageDescription="Bring your ideas to life with video"
      />

      <div className="mt-16">
        <h3 className="text-black text-xl font-semibold"> Edit Video Post </h3>
        <Suspense fallback={<div>Loading...</div>}>
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
      <VideoBlog vblogData={blog} />
    </div>
  );
}
