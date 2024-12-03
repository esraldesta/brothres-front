import Link from "next/link";
import DisplayContent from "./post/DisplayContent";
import { CiEdit } from "react-icons/ci";
import { BioEditor } from "@/app/profile/[id]/_components/edit-bio";
import { Session, getSession } from "@/lib/session";
import { Button } from "@/components/ui/button";

export default async function Bio({
  content = "",
  userId,
}: {
  content: string;
  userId: string;
}) {
  const session = await getSession();

  if (!session) {
    <section className="bg-button border-none w-full h-auto max-sm:px-5 sm:px-10 py-6 ">
      <DisplayContent content={content} />
    </section>;
  }

  const { user } = session as Session;
  const canEdit = user.id == userId;
  return (
    <section className="bg-button border-none w-full h-auto max-sm:px-5 sm:px-10 py-6 ">
      {/* {!content ? (
        <div className="flex w-full justify-center">
          <Button variant={"outline"} className=" flex items-center gap-2">
            <CiEdit className="w-5 h-5 text-navy" />
            <Link href="/edit-profile">Say something about Yourself</Link>
          </Button>
        </div>
      ) : (
        <DisplayContent content={content} />
      )} */}
      <div>
        <DisplayContent content={content} />
        {canEdit ? (
          <div className="flex justify-end mt-24">
            <Link href={`/profile/${user.id}/edit-bio`}>
              <Button className="bg-orangeRed">Edit bio</Button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* {content ? <DisplayContent content={content} /> : ""} */}
    </section>
  );
}
