"use client";

import { Visitors } from "@/constants";
import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { memo, useMemo } from "react";

const TRACK_ID: { [key: string]: string } = {
  "/": "all",
  "/create-blog": "write-blog",
  "/video-blog/create": "write-blog",
  "/founders": "founders",
};

function getTrackId(pathname: string): string {
  if (TRACK_ID[pathname]) {
    return TRACK_ID[pathname];
  }

  const profileMatch = pathname.match(/^\/profile\/(\d+)$/);

  if (profileMatch) {
    return `user-${profileMatch[1]}`;
  }

  const blogMatch = pathname.match(/^\/blog\/(\d+)$/);
  if (blogMatch) {
    return `blog-${blogMatch[1]}`;
  }

  return "all";
}

const getVisitor = async (id: string) => {
  return await apiClient.get(`/stat/${id}`);
};

function VisitorsBanner() {
  const pathname = usePathname();

  const trackId = getTrackId(pathname);

  const { data, error } = useQuery({
    queryKey: ["footer", trackId],
    queryFn: () => getVisitor(trackId),
    staleTime: 60 * 10, // 10 min
  });

  const visitorsCount: { [key: string]: number } = useMemo(() => {
    if (data) {
      return {
        monthly: data.data.monthly,
        weekly: data.data.weekly,
        daily: data.data.daily,
        hourly: data.data.hourly,
        monthlyAverage: data.data.monthlyAverage,
        weeklyAverage: data.data.weeklyAverage,
        dailyAverage: data.data.dailyAverage,
        hourlyAverage: data.data.hourlyAverage,
      };
    }

    // loading and error
    return {
      monthly: 0,
      weekly: 0,
      daily: 0,
      hourly: 0,
      monthlyAverage: 0,
      weeklyAverage: 0,
      dailyAverage: 0,
      hourlyAverage: 0,
    };
  }, [data]);

  return (
    <section className="mt-5">
      <div className="w-full max-sm:h-auto bg-gradient-to-r from-blue-950 via-blue-950 to-cyan-400 max-sm:px-5 sm:px-14 md:px-16 lg:px-20 xl:px-28 py-4">
        <h2 className="max-md:text-lg md:text-xl text-white font-semibold">
          Visitor&apos;s Counter
        </h2>
        <div className="flex flex-wrap items-center">
          {Visitors.map((item, i) => {
            return (
              <span
                key={i}
                className="flex items-center relative mt-2 text-white uppercase"
              >
                <h5 className="font-light text-sm"> {item.label} </h5>
                <div
                  className={`absolute inset-0 opacity-50 ${i === Visitors.length - 1 || i === Visitors.length - 2 ? "w-[90px]" : "w-[34px]"}`}
                />
                <p className="pl-1 font-bold"> {visitorsCount[item.value]} </p>
                {i === Visitors.length - 1 ? null : (
                  <span className="text-white mx-5 h-[12px] border-l"></span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(VisitorsBanner);
