import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    req : Request,
    {params} : {params : {bannerid: string}}
){
    try {

        if(!params.bannerid){
            return new NextResponse("Store id Dibutuhkan", {status: 400})
        }

        const banner = await db.banner.deleteMany({
            where: {
                id: params.bannerid            
            }
        })

        return NextResponse.json(banner)
    } catch (error) {
        console.log("[BANNER_GET]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}


export async function PATCH(
    req : Request,
    {params} : {params : {storeid: string, bannerid: string}}
){
    try {
        const {userId} = auth()
        const body = await req.json();

        const {label, imageUrl} = body

        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }
        if(!label){
            return new NextResponse("Harus Menginput Label", {status: 400})
        }
        if(!imageUrl){
            return new NextResponse("Harus Menginput Label", {status: 400})
        }

        if(!params.bannerid){
            return new NextResponse("Banner id Dibutuhkan", {status: 400})
        }

        const banner = await db.banner.updateMany({
            where: {
                id: params.bannerid,
                
            },
            data : {
                label,
                imageUrl
            }
        })

        return NextResponse.json(banner)
    } catch (error) {
        console.log("[BANNER_PATCH]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function DELETE(
    req : Request,
    {params} : {params : {storeid: string, bannerid: string}}
){
    try {
        const {userId} = auth()


        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if(!params.bannerid){
            return new NextResponse("Store id Dibutuhkan", {status: 400})
        }

        const storeUserId = db.store.findFirst({
            where: {
                id: params.storeid,
                userId
            }
        })

        if(!storeUserId){
            return new NextResponse("Unauthorized", {status: 403})
        }
        const banner = await db.banner.deleteMany({
            where: {
                id: params.bannerid            
            }
        })

        return NextResponse.json(banner)
    } catch (error) {
        console.log("[BANNER_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}