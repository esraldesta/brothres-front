import Pagination from "@/components/main/Pagination";
import RankingTable from "@/components/main/RankingTable";
import TopPageHeader from "@/components/smallPieces/TopPageHeader";
import { FOUNDERS_PER_PAGE } from "@/constants";
import { authFetch } from "@/lib/authFetch";
import { Suspense } from "react";

interface FounderRankingProps {
  searchParams: {
    page: string;
  };
}

export default async function page({ searchParams }: FounderRankingProps) {
  const pageQuery = parseInt(searchParams.page) || 1;

  return (
    <main className="max-md:px-5 md:px-7 xl:px-20">
      <div className="md:px-9 ">
        <div className="pt-20">
          <h1 className="font-bold text-2xl ">Founders Ranking Page</h1>
          <h3 className="text-xl">Meet our founders</h3>
          <Suspense fallback={<div>Loading...</div>}>
            <ListSuspense page={pageQuery} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

async function ListSuspense({ page }: { page: number }) {
  const users = await authFetch(
    `user/founders?page=${page}&pageSize=${FOUNDERS_PER_PAGE}`
  );
  if (!users || users.error) {
    return <div>{users.message}</div>;
  }

  return (
    <div>
      <RankingTable rankData={users.founders} />

      <div className="text-center my-5 text-sm text-blue-400">
        <p>**founder ranking is a title members who register for the first 3 months or the first 1000 members get.</p>
        <p> it doesn't give any special rights. But it conveys the fact that you were the eariest members of the community.</p>
      </div>
      <Pagination
        TotalNumberOfResults={users.count}
        pageSize={FOUNDERS_PER_PAGE}
      />
    </div>
  );
}
