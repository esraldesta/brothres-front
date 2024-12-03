import VideoBlog from "@/components/main/forms/VideoBlog";
import TopPageHeader from "@/components/smallPieces/TopPageHeader";

export default function page() {
  return (
    <main className='max-md:px-5 md:px-7 xl:px-20 mb-28'>

      <div className="mt-20 sm:mx-20">
        <h3 className="text-black text-xl font-bold"> Create Video Blog </h3>
        <p className="font-light text-sm">Share something amazing with the international community</p>
        <VideoBlog />
      </div>

    </main>
  );
}
