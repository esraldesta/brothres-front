import Avatar from "@/components/smallPieces/Avatar";
import Image from "next/image";
import PostHeader from "../../../../public/blogPostHeader.jpg";
import DisplayContent from "@/components/main/post/DisplayContent";
import PostFooter from "@/components/smallPieces/PostFooter";
import { formatNumber } from "@/utils";
import Link from "next/link";
import Decide from "@/components/smallPieces/Decide";
import TopPageHeader from "@/components/smallPieces/TopPageHeader";
import { authFetch } from "@/lib/authFetch";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { formatDate } from "@/lib/utils";
import CommentForm from "./_compnents/comment-form";
import Comments from "./_compnents/comments";

interface Props {
  params: {
    id: string;
  };
}

export default async function page({ params }: Props) {
  const postId = params.id;

  return (
    <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
      <Suspense fallback={<div>Loading..</div>}>
        <BlogSuspense id={postId} />
      </Suspense>
    </main>
  );
}

async function BlogSuspense({ id }: { id: string }) {
  const blog = await authFetch("blogs/" + id);
  if (!blog || blog.error) notFound();

  return (
    <>

      {/* To prevent content shifting */}
      {blog.image && 
      <div className="max-w-[900px] pb-5 mt-20">
        <Image
          src={blog.image}
          alt="blog-post-header"
          width={700}
          height={100}
        />
      </div>}
      <h2 className="pl-3 text-xl font-bold capitalize mt-10 ">
        {blog.title}
      </h2>
      <div className="flex gap-x-2">
        <h2 className="pl-3 capitalize text-gray-900">
          By {blog.author.firstName} {blog.author.lastName}
        </h2>
        <p className="text-gray-500">{new Date(blog.createdAt).toDateString()}</p>
      </div>
      <div className="sm:mt-10 md:mt-20">
        <DisplayContent content={blog.content} />
      </div>

      <div className="mt-14">
        <h2 className="text-xl text-black font-semibold"> Refrences </h2>
        <div className="flex flex-col justify-start gap-4 mt-4">
          {blog.references.map((citation: string, i: number) => {
            return (
              <span
                key={citation}
                className="flex items-center gap-2 max-w-[350px] text-base text-black hover:text-blue-500"
              >
                <p> {i + 1} </p>
                <Link href={citation} target="_blank">
                  {citation}
                </Link>
              </span>
            );
          })}
        </div>
        <PostFooter blogId={id} tags={blog.tags} />
      </div>
      {/* <CommentForm parentId={3} blogCategoryId={4} /> */}
      <Comments blogId={id} />
    </>
  );
}
