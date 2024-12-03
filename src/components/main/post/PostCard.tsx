"use client";

import Image from "next/image";
import postImage from "../../../../public/postImage.png";
import VideoImage from "../../../../public/videoImage.jpg";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
} from "react-icons/ai";
import { IoStatsChartOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { PROFILE_PAGE_PATH } from "@/constants";
import { formatNumber } from "@/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import DisplayContent from "./DisplayContent";
import { DeleteBlogButton } from "@/app/blog/[id]/_compnents/delete-blog-button";
import { isValidUrl } from "@/lib/utils";
import Comment from "../../icons/comment";
import Heart from "../../icons/heart";

interface PostCardProps {
  postedBy: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  dislikes: number;
  comments: number;
  totalViews: number;
  isVideoPost?: boolean;
  blogId: string;
  userId?: string;
  image?: string | null;
}

// Data about the post is fetched deom the database later. for now it is static

export default function PostCard({
  postedBy,
  date,
  title,
  description,
  tags,
  likes,
  dislikes,
  comments,
  totalViews,
  isVideoPost = false,
  blogId,
  userId,
  image,
}: PostCardProps) {
  const { isAuthenticated, data } = useSelector(
    (state: RootState) => state.user
  );
  const pathname = usePathname();

  const isProfilePage =
    isAuthenticated &&
    data?.id == userId &&
    pathname.startsWith(PROFILE_PAGE_PATH);

  const viewCount = formatNumber(totalViews);
  const baseUrl = isVideoPost ? `/video-blog/${blogId}` : `/blog/${blogId}`;

  return (
    <section className="border border-grey-200 mt-8 flex items-start gap-10 rounded-xl p-8">
      {isVideoPost ? (
        <Link href={"/"} className="max-lg:hidden">
          <Image src={VideoImage} alt="post-image" width={200} height={250} />
        </Link>
      ) : image && isValidUrl(image) ? (
        <Image
          src={image}
          alt="post-image"
          width={200}
          height={200}
          className="max-lg:hidden rounded-sm"
        />
      ) : (
        ""
      )}
      <div className="flex flex-1 flex-col justify-start">
        <div></div>
        <div className="flex flex-wrap max-sm:gap-4 items-start justify-between">
          <span className="flex items-center gap-3 text-sm">
            <h5 className="text-text font-semibold"> By {postedBy} </h5>
            <p className="text-muted text-[14px]"> {date} </p>
          </span>

        </div>
        <span className="mt-4">
          <div className="flex gap-4 items-center">
            <h2 className="text-[20px] text-black font-bold"> {title} </h2>
            <div className="flex gap-4 items-center">
              <div className="flex gap-[1px] text-bluish items-center">
                <Heart className="w-4 h-4 text-redish mt-[7px]" />
                <p className="text-[12px] font-semibold text-bluish">
                  {likes}
                </p>
              </div>
              <div className="flex items-center gap-[1px] text-redish">
                <Comment className="w-4 h-4  text-bluish mt-[7px]" />
                <p className="text-[12px] font-semibold text-bluish">
                  {comments}
                </p>
              </div>
            </div>
          </div>

          {/* add line limit */}
          <p className="max-sm:text-xs sm:text-[15px] mt-2 leading-6 max-w-[750px]">
            <DisplayContent content={description} line={2} />
          </p>
        </span>
        <Link
          href={baseUrl}
          className="text-sm text-orangeRed font-semibold mt-3"
        >
          Continue reading
        </Link>
        <div className="flex flex-wrap max-sm:gap-5 items-center ">
          {isProfilePage && (
            <button className="maxw-[140px] bg-green-300 px-4 py-2 rounded-md text-white text-base focus-visible:outline-none ">
              <Link
                className="xl:mr-4 flex items-center gap-2"
                href={`${baseUrl}/edit`}
              >
                <CiEdit className="w-4 h-4 text-white" />
                <p className="text-white text-sm"> Edit </p>
              </Link>
            </button>
          )}

          {isProfilePage && (
            <DeleteBlogButton id={blogId} userId={userId as string} />
          )}
        </div>
      </div>
    </section>
  );
}
