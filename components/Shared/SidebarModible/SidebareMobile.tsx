"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import {SidebarRoutes} from "../SidebarRoutes"
import { Button } from "@/components/ui/button"
import { useState } from "react"



export function SidebareMobile() {
const [open, setOpen] = useState(false)
    return (
        <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger  className="hover:cursor-pointer" asChild><Button><Menu />
        </Button></SheetTrigger>
        <SheetContent side="left" className=" bg-blue-500 text-white w-[350px]" >
          <SheetHeader className="text-left">
            <SheetTitle className="text-white">🔐 Menu</SheetTitle>
            <SheetDescription className="text-slate-100">
             Create and manage all of yout password
            </SheetDescription>
          </SheetHeader>
          <SidebarRoutes onNavigate={() => setOpen(false)}/>
        </SheetContent>
      </Sheet>
    )
}
