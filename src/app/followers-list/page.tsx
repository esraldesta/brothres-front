import FollowersAndFollowing from "@/components/main/FollowersAndFollowing";
import Pagination from "@/components/main/Pagination";
import TopPageHeader from "@/components/smallPieces/TopPageHeader";

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function page({ searchParams }: Props) {
  const pageQuery = searchParams.page || 1;
  //TODO: Fetch the followers and followings of the current user, It should recieve the page parameter for Pagination

  return (
    <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
      <TopPageHeader
        pageCode="PG32"
        pageName="Followers List"
        pageDescription="Explore those who follows you and those whom you follow"
      />
      {/* TODO: pass the followers and following array to this component */}
      <FollowersAndFollowing />
      <div className="mb-10">
        <Pagination TotalNumberOfResults={50} pageSize={10} />
      </div>
    </main>
  );
}
