"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Banner } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BannerColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface BannerClientProps {
    data: BannerColumn[]
}

export const BannerClient : React.FC<BannerClientProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Banner (${data.length})`}
                    description="Atur Banner untuk toko"
                />
                <Button onClick={() => router.push(`/${params.storeid}/banners/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>

            <Separator/>

            <DataTable data={data} searchKey="label" columns={columns} />
            <Heading
                title="API"
                description="API untuk banners"
            />
            
            <Separator/>

            <ApiList namaIndikator="banners" idIndikator="bannerid" />

        </>
    )
}