import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    {params} : {params : {storeid: string}}
){
    try {
        const {userId} = auth()
        const body = await req.json();

        const {label, imageUrl} = body

        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }
        if(!label){
            return new NextResponse("Harus Menginput Nama Banner", {status: 400})
        }
        if(!imageUrl) {
            return new NextResponse("image Banner Perlu di Upload", {status: 400})
        }

        if(!params.storeid){
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
        const store = await db.banner.create({
            data: {
                label,
                imageUrl,
                storeId : params.storeid
            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log("[STORE_PATCH]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function GET(
    {params} : {params : {storeid: string}}
){
    try {

        if(!params.storeid){
            return new NextResponse("Store id Dibutuhkan", {status: 400})
        }

        const store = await db.banner.findMany({
            where: {
                storeId: params.storeid
            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log("[BANNERS GET]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}