"use client"

import { useForm, type FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Copy, Earth, Eye, Shuffle } from "lucide-react"
import { copyClioboard } from "@/lib/copyClioboard"
import { useState } from "react"
import { genaretePassword } from "@/lib/genaretePassword"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEditElementProps } from "./FormEditeElements.types";
import { formSchema } from "./FormEditElement.form"


export function FormEditElement(props: FormEditElementProps) {
    const { dataElement } = props;
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();
    type FormValues = z.infer<typeof formSchema>
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            typeElement: dataElement.typeElement,
            isFavourite: dataElement.isFavourite,
            name: dataElement?.name || "",
            directory: dataElement?.directory || "",
            password: dataElement?.password || "",
            urlWebsite: dataElement?.urlWebsite || "",
            notes: dataElement?.notes || "",
            username: dataElement?.username || "",
            userId: dataElement.userId,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/items/${dataElement.id}`, values)
            toast("Elemento actualizado")
           
            router.push("/")
        } catch (error) {
            toast.error("Hubo un error al crear el elemento")
        }
    }

   const generateRandomPassword = () => {
        const password = genaretePassword()
        form.setValue("password", password)
    }

    const updateUrl = () => {
        form.setValue("urlWebsite", window.location.href)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols-2 gap-y-2 gap-x-4 grid">
                <FormField
                    control={form.control}
                    name="typeElement"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿Que tipo de elemento necesitas?</FormLabel>
                            <Select onValueChange={field.onChange}

                                defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona donde quieres guardad la clave" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                     <SelectItem value="Inicio de sesión">Inicio de sesión</SelectItem>
                                        <SelectItem value="Tarjeta">Tarjeta de crédito</SelectItem>
                                        <SelectItem value="Identidad">Identidad</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isFavourite"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿Quieres seleccionar esta clave como favorita?</FormLabel>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span>Marcar como favorito</span>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="directory"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Directorio</FormLabel>
                            <Select onValueChange={field.onChange}

                                defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona el directorio" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                      <SelectItem value="Social">Social</SelectItem>
                                        <SelectItem value="Study">Study</SelectItem>
                                        <SelectItem value="Entreteniment">Entreteniment</SelectItem>
                                        <SelectItem value="Shopping">Shopping</SelectItem>
                                        <SelectItem value="Work">Work</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Usuario</FormLabel>
                            <FormControl>
                                <div className="relative">

                                    <Input {...field} />
                                    <Copy className="absolute top-2 right-3 cursor-pointer"
                                        size={18}
                                        onClick={() => copyClioboard(field.value)}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="urlWebsite"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Url Website</FormLabel>
                            <FormControl>
                                <div className="relative">

                                    <Input {...field} />
                                    <Earth className="absolute top-2 right-3"
                                        size={18}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex justify-between">Contraseña</FormLabel>
                            <Shuffle className="cursor-pointer" size={15} onClick={() => generateRandomPassword()} 
                            />
                            <FormControl>
                                <div className="relative">

                                    <Input {...field} type={showPassword ? "text" : "password"} />
                                    <Eye className="absolute top-2 right-10 cursor-pointer"
                                        size={18}
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                    <Copy className="absolute top-2 right-3 cursor-pointer"
                                        size={18}
                                        onClick={() => copyClioboard(field.value)}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div >
                    <div className="text-slate-400 flex items-center justify-between text-sm">
                        Autenticación TOTP
                        <p className="px-3 bg-green-700 text-white rounded-lg text-xs mr-5">Premium</p>
                    </div>
                    <Input disabled placeholder="Autenticación TOTP" />
                </div>
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Notes</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div></div>
                <Button type="submit">Guardar</Button>
            </form>
        </Form>
    )
}