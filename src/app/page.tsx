import Header from "@/components/main/Header";
import PostList from "@/components/main/post/PostList";

interface Props {
  searchParams: {
    page: string;
    catagory: string;
  };
}

export default function Home({ searchParams }: Props) {
  const pageQuery = searchParams.page || 1;

  return (
    <div className="max-md:mx-5 md:mx-7 xl:mx-20">
      <Header />
      <div className="xl:mx-7 max-md:mt-8 md:mt-10 lg:mt-20 mb-28">
        <h1 className="font-bold uppercase text-xl">Blog Posts</h1>
        <PostList />
      </div>
    </div>
  );
}
