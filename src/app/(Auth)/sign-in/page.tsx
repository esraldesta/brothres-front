import Signinform from "@/components/main/forms/Signinform";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await getSession();
    if(session?.user){
        redirect('/')
    }
    
    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
            <div className="flex justify-center mt-4">
                <Signinform />
            </div>
        </main>
    )
}
