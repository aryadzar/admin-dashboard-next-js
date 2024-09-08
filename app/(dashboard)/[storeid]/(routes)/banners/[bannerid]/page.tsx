import db from "@/lib/db";
import { BannerForm } from "./components/banner-form";

const BannerPage = async({
    params
} : {
    params: {bannerid : string}
}) => {

    const banner = await db.banner.findUnique({
        where: {
            id: params.bannerid
        }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BannerForm initialData={banner}/>
            </div>
        </div>
     );
}
 
export default BannerPage;