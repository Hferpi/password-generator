'use client'
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
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye } from "lucide-react"
import { toast } from "sonner"

const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
})

export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                email: values.email,
                password: values.password,
                username: values.username,
            }),
        })

        if (response?.ok) {
            router.push("/")
            toast("Registro realizado con éxito")
        } else {
            toast("Error al registrar")
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-2 space-y-3 text-black ">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email@email.com" {...field} />
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
                                <Input placeholder="username" {...field} />
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input placeholder="password" type={showPassword ? "text" : "password"} {...field} />
                                    <Eye className={`${showPassword ? "text-blue-600" : "text-gray-400"} absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer`} onClick={() => setShowPassword(!showPassword)} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full cursor-pointer hover:bg-blue-600 duration-300 transition-all">Register</Button>
            </form>
        </Form>
    )
}