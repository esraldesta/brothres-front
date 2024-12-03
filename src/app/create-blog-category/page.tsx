import CreateBlogCatagoryForm from "@/components/main/forms/CreateBlogCatagoryForm";
import TopPageHeader from "@/components/smallPieces/TopPageHeader";


export default function page() {
    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
            <TopPageHeader pageCode="PG32" pageName="Create Blog Catagory Page" pageDescription="New catagory creation page" />
            <CreateBlogCatagoryForm />
        </main>
    )
}
