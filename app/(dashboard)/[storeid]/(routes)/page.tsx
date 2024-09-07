import db from "@/lib/db";

interface DashboardPageProps{
    params: {storeid: string}
}


const DashboardPage = async ({params} : DashboardPageProps) => {
    
    const store = await db.store.findFirst({
        where: {
            id: params.storeid
        }
    })
    return ( 
    <>
       Active Store: {store?.name}
    </> 
    );
}
 

export default DashboardPage;