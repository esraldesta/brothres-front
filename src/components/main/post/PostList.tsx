"use client";

import PostCard from "./PostCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { HOME_PAGE_SIZE, NEXT_PUBLIC_BACKEND_URL } from "@/constants";
import { formatDate } from "@/lib/utils";
import Pagination from "../Pagination";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PostListProps {
  isVideoPost?: boolean;
}

const fetchBlogsList = async (page: number, pageSize: number) => {
  const response = await fetch(
    `${NEXT_PUBLIC_BACKEND_URL}/blogs/list?page=${page}&pageSize=${pageSize}`
  );
  const result = await response.json();
  if (response.ok) return await result;
  else throw new Error(result.message);
};



export default function PostList({ isVideoPost = false }: PostListProps) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const {
    isPending,
    isError,
    data,
  } = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: () => fetchBlogsList(currentPage, HOME_PAGE_SIZE),
    placeholderData: keepPreviousData,
    staleTime: 60 * 60 * 60,
  });

  return (
    <main className="mt-10 xl:pr-10">
      {isError ? (
        <div className="flex flex-col gap-1 items-center">
          <h1 className="font-bold text-lg">Something went wrong!</h1>
          <Button variant="link" className="text-bluish underline">
            Retry
          </Button>
        </div>
      ) : isPending ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.blogs.map((blog: any) => (
            <PostCard
              key={blog.id}
              postedBy={`${blog.author.firstName} ${blog.author.lastName}`}
              date={formatDate(blog.createdAt)}
              title={blog.title}
              description={blog.content}
              tags={blog.tags}
              likes={186}
              dislikes={0}
              comments={25}
              totalViews={1200}
              isVideoPost={blog.type === "VBlog"}
              blogId={blog.id}
              image={blog.image}
            />
          ))}
          <div className="md:mr-10">
            <Pagination
              TotalNumberOfResults={data.count}
              pageSize={HOME_PAGE_SIZE}
            />
          </div>
        </div>
      )}
    </main>
  );
}
