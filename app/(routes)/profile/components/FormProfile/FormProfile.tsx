"use client"

import { FormProfileProps } from "./FormProfile.types";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./FormProfile.form";
import Image from "next/image";
import { useState } from "react";
import { UploadButton } from "@/lib/uploadThing";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";



export function FormProfile(props: FormProfileProps) {

    const { user } = props;
    const [showUploadPhoto, setShowUploadPhoto] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const [photoUploaded, setPhotoUploaded] = useState(false)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user.username || "",
            name: user.name || "",
            email: user.email || "",
            profileImage: user.profileImage || "",
            id: user.id,
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
       try {
        await axios.patch(`/api/profile`, values)
        toast.success("Perfil actualizado correctamente")
       
        router.refresh()
    setShowUploadPhoto(false)
    setPhotoUploaded(false)
       } catch (error) {
        toast.error("Error al actualizar el perfil")
       }
    }

    return (
        <div className="max-w-lg mt-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="profileImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile Image</FormLabel>
                                <FormControl>
                                    <div>
                                        <div className="flex gap-2 items-center">
                                            <Image src={user.profileImage ? user.profileImage : "/images/default-profile.webp"} alt="Profile Image" width={80} height={80} className="m-2 rounded-full" />
                                            <div className="w-[150px]">
                                            {showUploadPhoto ? (
                                                <UploadButton 
                                                className="rounded-md text-slate-800 bg-slate-200 mt-3 p-3"
                                                    {...field} 
                                                    endpoint="profileImage"
                                                    onClientUploadComplete={(res: any) => {  
                                                        form.setValue("profileImage", res?.[0].url)
                                                        setPhotoUploaded(true)
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        alert(`ERROR! ${error.message}`);
                                                    }}
                                                />
                                            ) : (
                                                <Button onClick={() => setShowUploadPhoto((prev) => !prev)}>

                                                   <Upload className="mr-2 w-4 h-4" /> Change Photo
                                                </Button>
                                            )}
                                            </div>
                                        </div>
                                        {photoUploaded && (
                                            <div className="mt-3">
                                                <p className="text-green-500 text-sm">Foto subida correctamente</p>
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input disabled {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="@john_doe" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Save</Button>
            </form>
        </Form>
        </div >);
}