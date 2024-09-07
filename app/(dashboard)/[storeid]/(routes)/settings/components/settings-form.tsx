'use client'

import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

interface SettingsFormProps{
    initialData: Store
}

export const SettingsForm : React.FC<SettingsFormProps> = ({
    initialData
}) =>{

    const params = useParams()
    const router = useRouter()

    const formSchema = z.object({
        name: z.string().min(1)
    })

    const [open,setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    type SettingFormValues = z.infer<typeof formSchema>

    const form = useForm<SettingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })


    const onSubmit = async (data: SettingFormValues) =>{
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeid}`, data)
            router.refresh()
            toast.success("Toko Berhasil Diupdate")
        } catch (error) {
            toast.error("Cek Kembali data yang diinput")
        }finally{
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeid}`)
            router.refresh()
            router.push('/')
            toast.success("Toko Berhasil Dihapus")
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
            <div className="flex items-center justify-between">
                <Heading
                    title = "Settings"
                    description = "Atur Toko"
                />
                <Button
                disabled = {loading}
                variant="destructive"
                size="sm"
                onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4"/>
                </Button>
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full" >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nama Toko" disabled={loading} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                    <Button
                    disabled={loading}
                    type="submit"
                    >
                        Save
                    </Button>
                </form>
            </Form>
        </>
    )
}