import Avatar from "@/components/smallPieces/Avatar"
import Image from "next/image"
import PostHeader from "../../../../public/blogPostHeader.jpg"
import DisplayContent from "@/components/main/post/DisplayContent"
import PostFooter from "@/components/smallPieces/PostFooter"
import { formatNumber } from "@/utils"
import Link from "next/link"
import Decide from "@/components/smallPieces/Decide"
import CommentForm from "@/components/smallPieces/CommentForm"
import TopPageHeader from "@/components/smallPieces/TopPageHeader"
import { authFetch } from "@/lib/authFetch"
import { notFound } from "next/navigation"

interface Props {
    params: {
        id: string
    }
}

//NOTE: Since This is a Preview Page the actions (like, dislike, comment) should not work. it's only for showing how it might look like.

export default async function page({ params }: Props) {
    const id = params.id

    const blog = await authFetch("blogs/" + id);
    if (!blog || blog.error) notFound();

    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28 md:mx-10">
            <div className="my-16">
                <h2 className="font-bold text-lg">Here is Your Blog</h2>
                <p className="text-gray-800 text-sm">Share something amazing with the international community</p>
            </div>
            <div className="rounded-3xl border px-10 py-10">
                <div className="flex justify-end items-center gap-x-2">
                    <p className="text-gray-600">{blog.author.firstName}</p>
                    <Avatar width="w-[50px]" height="h-[50px]" iconWidth="w-[20px]" iconHeight="h-[20px]" />
                </div>

                <div className="text-center">
                    <h2 className="mt-10 pl-3 text-xl text-black font-semibold"> {blog.title} </h2>
                    <div className="flex justify-center items-center gap-6">
                        <div className="flex items-center gap-3">
                            <p className="text-stone-500 text-sm">By</p>
                            <h3 className="text-sm text-black font-medium"> {blog.author.firstName} </h3>
                            <p className="text-stone-500 text-sm"> {new Date(blog.createdAt).toDateString()}</p>
                        </div>
                    </div>
                </div>
                {/* To prevent content shifting */}
                <div className="max-w-[900px] pb-10 mx-auto w-full">
                    <Image src={blog.image} alt="blog-post-header" width={700} height={100} className="mt-7 mx-auto rounded-3xl" />
                </div>
                <div className="mt-10">
                    {/* DUMMY HTML STRING */}
                    <h3 className="font-bold text-lg mb-2">Subtitle</h3>
                    <DisplayContent content={blog.content} />
                </div>
                <PostFooter tags={blog.tags}  blogId={blog.id} />
                <div className="mt-14">
                    <h2 className="text-xl text-black font-semibold"> Refrences </h2>
                    <div className="flex flex-col justify-start gap-4 mt-4">
                        {blog.references.map((citation:string, i:number) => {
                            return (
                                <span key={citation} className="flex items-center gap-2 max-w-[350px] text-base text-black hover:text-blue-500">
                                    <p> {i + 1} </p>
                                    <Link href={citation} target="_blank"> {citation} </Link>
                                </span>
                            )
                        })}
                    </div>
                </div>

                <Decide postId={blog.id} />
            </div>
        </main>
    )
}
