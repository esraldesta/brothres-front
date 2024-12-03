"use client";

import Image from "next/image";
import Logo from "../../../public/logo.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { Languages, QUERY_PARAMS } from "@/constants";
import { TfiWorld } from "react-icons/tfi";
import { memo, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { RiMenuLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedVal } from "@/hooks/use-debounce";
import { Loader2, Loader2Icon } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import Link from "next/link";

const getSearchResult = async (query: string) => {
  return await apiClient.get(`/blogs/search?query=${query}`);
};
function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const { isAuthenticated, isLoading, data } = useSelector(
    (state: RootState) => state.user
  );
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const queryString = searchParams.get(QUERY_PARAMS.search);
  const dval = useDebouncedVal(searchValue);

  const {
    data: blogs,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["search", dval],
    queryFn: () => getSearchResult(dval),
    enabled: dval.trim()?.length > 2,
  });

  useEffect(() => {
    // If the user cleared what they searched, we need to remove the search query in the URI to refelct the current state
    // if (queryString && !searchValue) {
    //   replace(`${pathname}`);
    //   return;
    // }
    //!upddate url and avoid dval from stacking history
    if (dval) {
      const param = new URLSearchParams();
      param.append(QUERY_PARAMS.search, dval);
      replace(`${pathname}?${param.toString()}`);
    }
  }, [dval]);

  return (
    <div className="relative group">
      {/* Input field with focus-within behavior */}
      <div className="flex justify-between items-center bg-button h-10 px-2 rounded-lg">
        <input
          type="text"
          placeholder="Type to Search..."
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-transparent max-w-[130px] ml-2 text-xs sm:text-sm focus-visible:outline-none"
        />
        {isPending && dval.trim()?.length > 2 ? (
          <Loader2Icon className="animate-spin w-5 h-5 mr-2" />
        ) : (
          <CiSearch className="w-5 h-5 mr-2" />
        )}
      </div>

      {/* Dropdown container with hover and focus control */}
      <div className="absolute w-full bg-white top-12 z-40 rounded-md shadow-lg opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        {isPending ? (
          dval.trim()?.length > 2 ? (
            <div className="flex items-cent justify-center py-4">
              <Loader2Icon className="animate-spin w-5 h-5 mr-2" />
            </div>
          ) : (
            ""
          )
        ) : isError ? (
          <div className="flex items-cent justify-center py-4">
            <p>Something went wrong!</p>
          </div>
        ) : (
          <div className="flex flex-col p-2 ">
            {!blogs.data.length ? (
              <div className="flex items-cent justify-center py-4">
                <p className="text-center">No result found!</p>
              </div>
            ) : (
              blogs.data.map((blog:any) => (
                <Link
                  href={"/blogs/" + blog.id}
                  className="flex flex-col p-2 hover:bg-bluish-light rounded-md"
                  key={blog.id}
                >
                  <h3 className="leading-none line-clamp-1">{blog.title}</h3>
                  <span className="text-[12px] text-muted">
                    By {blog.author.firstName}
                  </span>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

//   return (
//     <div className="relative">
//       <div className="flex justify-between items-center bg-button h-9 px-5 py-2 rounded-md">
//         <input
//           type="text"
//           placeholder="Type to Search..."
//           onChange={(e) => setSearchValue(e.target.value)}
//           className="bg-transparent max-sm:w-[120px] sm:w-[260px] md:w-[300px]  max-sm:text-xs sm:text-sm focus-visible:outline-none"
//         />
//         {isPending && dval.trim()?.length > 2 ? (
//           <Loader2Icon className="animate-spin w-5 h-5 mr-2" />
//         ) : (
//           <CiSearch className="w-5 h-5 mr-2" />
//         )}
//       </div>

//       <div className="absolute  w-full bg-white top-12 z-40 rounded-md shadow-lg data-show">
//         {isPending ? (
//           dval.trim()?.length > 2 ? (
//             <div className="flex items-cent justify-center py-4">
//               <Loader2Icon className="animate-spin w-5 h-5 mr-2" />
//             </div>
//           ) : (
//             ""
//           )
//         ) : isError ? (
//           <div className="flex items-cent justify-center py-4">
//             <p>Something went wrong!</p>
//           </div>
//         ) : (
//           <div className="flex flex-col p-2 ">
//             {!blogs.data.length ? (
//               <div className="flex items-cent justify-center py-4">
//                 <p className="text-center">No result found!</p>
//               </div>
//             ) : (
//               blogs.data.map((blog) => (
//                 <Link
//                   href={"/blogs/" + blog.id}
//                   className="flex flex-col p-2 hover:bg-bluish-light rounded-md"
//                   key={blog.id}
//                 >
//                   <h3 className="leading-none">{blog.title}</h3>
//                   <span className="text-[12px]  text-muted">
//                     By {blog.author.firstName}
//                   </span>
//                 </Link>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

export default memo(SearchBar);
