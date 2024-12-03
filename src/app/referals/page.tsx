import Pagination from "@/components/main/Pagination";
import Table from "@/components/main/Tabel";
import { FOUNDERS_PER_PAGE, Referals } from "@/constants";
import { authFetch } from "@/lib/authFetch";
import { Suspense } from "react";

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function page({ searchParams }: Props) {
  const pageQuery = parseInt(searchParams.page) || 1;

  return (
    <main className="max-md:px-5 md:px-7 xl:px-20">
      <div className="md:px-9">
        <div className="">
          <div className="py-20">
            {/* <SmallProfileCard>
              <span className="text-[12px] text-muted">(106 blogs)</span>
            </SmallProfileCard> */}
          </div>
          <div className="pb-20">
            <h1 className="font-bold text-4xl ">Referral Page </h1>
            <h3 className="text-xl">
              All members who were refereed by you will appear in this table{" "}
            </h3>
          </div>
        </div>
        <div className="pt-20">
          <Suspense fallback={<div>Loading...</div>}>
            <ReferalSuspense page={pageQuery} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

async function ReferalSuspense({ page }: { page: number }) {
  const myReferals = await authFetch(
    `user/referals?page=${page}&pageSize=${FOUNDERS_PER_PAGE}`
  );

  return (
    <div>
      <Table referals={myReferals.refered} />
      <Pagination
        TotalNumberOfResults={myReferals.count}
        pageSize={FOUNDERS_PER_PAGE}
      />
    </div>
  );
}
