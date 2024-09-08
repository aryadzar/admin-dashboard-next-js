"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BannerColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionProps {
    data: BannerColumn
}

export const CellAction : React.FC<CellActionProps> = ({
    data
}) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const params = useParams()
    const [open,setOpen] = useState(false)

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("ID berhasil di copy")
    }
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeid}/banners/${data.id}`)
            router.refresh()
            router.push(`/${params.storeid}/banners`)
            toast.success("Banner Berhasil Dihapus")
        } catch (error) {
            toast.error('Cek kembali data dan koneksi mu')
        }finally {
            setLoading(false);
            setOpen(false);
        }
    }
    return (
        <>
        <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <span className=" sr-only">Open Menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onCopy(data.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/${params.storeid}/banners/${data.id}`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
    )
}