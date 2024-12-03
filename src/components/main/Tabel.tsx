import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface TableProbs {
  referals: {
    id: number;
    firstName: string;
    createdAt: string;
    country: string;
  }[];
}

export default function Tabel({ referals }: TableProbs) {
  return (
    <section className="shadow-lg">
      <Table className=" ">
        <TableHeader>
          <TableRow className="text-base font-medium bg-bluish">
            <TableHead className="w-[100px] bg-transparent text-white">
              S/N
            </TableHead>
            <TableHead className="text-center max-sm:text-sm bg-transparent text-white">
              Name
            </TableHead>
            <TableHead className="text-center max-sm:text-sm  bg-transparent text-white">
              Joined Date
            </TableHead>
            <TableHead className="text-center max-sm:text-sm  bg-transparent text-white">
              Country
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {referals.map((referal, i) => {
            return (
              <TableRow
                key={referal.id}
                className="border hover:bg-slate-300/50 group"
              >
                <TableCell className="text-muted"> {i + 1} </TableCell>
                <TableCell className="text-muted text-center">
                  <Button variant="link" className="p-0">
                    <Link
                      href={`/profile/${referal.id}`}
                      className="text-muted group-hover:text-black group-hover:font-semiBold"
                    >
                      {referal.firstName}
                    </Link>
                  </Button>
                </TableCell>
                <TableCell className="text-muted text-center">
                  {formatDate(referal.createdAt)}
                </TableCell>
                <TableCell className="text-muted text-center group-hover:text-black group-hover:font-semiBold">
                  {referal.country}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
