"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { LoginForm } from "../LoginForm"
import { RegisterForm } from "../RegisterForm"
import { useState } from "react"

export function TabsForms() {
 const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")

    return (
        <Tabs  value={activeTab} onValueChange={(value) => setActiveTab(value as "signin" | "signup")} className="w-[350px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin" className="cursor-pointer hover:underline">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="cursor-pointer hover:underline">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
                <Card>
                    <CardContent className="space-y-2">
                     <LoginForm />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="signup">
                <Card>
                    <CardContent className="space-y-2">
                        <RegisterForm onSuccess={() => setActiveTab("signin")}/>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}