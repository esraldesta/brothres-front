import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface RankingTableProps {
  rankData: {
    id: string;
    createdAt: string;
    country: string;
    firstName: string;
  }[];
}

export default function RankingTable({ rankData }: RankingTableProps) {
  return (
    <section className="rounded shadow-lg mt-20">
      <Table className="">
        <TableBody>
          <TableRow className="text-base font-medium pb-3 bg-bluish  hover:bg-bluish founder-header">
            <TableCell className=" font-bold text-white max-sm:text-sm  pb-3  bg-transparent">
              Name
            </TableCell>
            <TableCell className=" font-bold text-white  max-sm:text-sm pb-3 bg-transparent ">
              Rank
            </TableCell>
            <TableCell className=" font-bold text-white  max-sm:text-sm pb-3 bg-transparent ">
              Date
            </TableCell>
            <TableCell className=" font-bold text-white  max-sm:text-sm pb-3 bg-transparent">
              Country
            </TableCell>
          </TableRow>
          {rankData.map((data, i) => (
            <TableRow
              key={data.id}
              className="mt-6 border-y hover:bg-slate-300/50 group"
            >
              <TableCell className=" ">
                <Button variant="link" className="p-0">
                  <Link
                    href={`/profile/${data.id}`}
                    className="text-muted group-hover:text-black group-hover:font-semiBold"
                  >
                    {data.firstName}
                  </Link>
                </Button>
              </TableCell>
              <TableCell className="text-muted">{i + 1}</TableCell>
              <TableCell className="text-muted">
                {formatDate(data.createdAt)}
              </TableCell>
              <TableCell className="text-muted group-hover:text-black group-hover:font-semiBold">
                {data.country}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
