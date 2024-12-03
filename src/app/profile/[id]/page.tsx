import Bio from "@/components/main/Bio";
import { authFetch } from "@/lib/authFetch";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_TYPES } from "./_components/blogs-suspense";
import { PROFILE_BLOGS_PER_PAGE } from "@/constants";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <section>
      <BioSuspense userId={id}/>
    </section >
  );
}

async function BioSuspense({ userId }: { userId: string }) {
  const user = await authFetch("user/" + userId);
  console.log(user);

  if (!user || user.error) notFound();

  const { blogs } = await authFetch(
    `blogs/user/${BLOG_TYPES.Blog}/${userId}?page=${1}&pageSize=${PROFILE_BLOGS_PER_PAGE}`
  );

  return (
    <div className="">
      <h3 className="my-10 mb-2">About Me:</h3>
      <div className="w-full bg-gray-100 relative rounded overflow-hidden">
        <span className="h-full my-2 w-2 bg-blue-200 absolute left-0 -top-2"></span>
        <div className="ml-10 py-5"><Bio content={user.bio} userId={userId} /></div>
      </div>

      <h3 className="my-10 mb-2">My Blogs on Brotherhod Community:</h3>
      <div className="w-full bg-gray-100 relative rounded overflow-hidden">
        <span className="h-full my-2 w-2 bg-blue-200 absolute left-0 -top-2"></span>
        <div className="ml-16 py-5">
          <ul className="list-disc text-blue-600">
            {blogs.map((blog: any) => (
              <li>
                <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="my-10 mb-2">My Blogs on Brotherhod Community:</h3>
      <div className="w-full bg-gray-100 relative rounded overflow-hidden">
        <span className="h-full my-2 w-2 bg-blue-200 absolute left-0 -top-2"></span>
        <p className="ml-10 py-1">
          Feel free to comment on my blogs,if you like them.
        </p>
      </div>
    </div>
  );
}
