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


export function SidebareMobile() {
    return (
        <Sheet>
        <SheetTrigger asChild><Button><Menu />
        </Button></SheetTrigger>
        <SheetContent side="left" className="bg-blue-500 text-white">
          <SheetHeader className="text-left">
            <SheetTitle className="text-white">🔐 Menu</SheetTitle>
            <SheetDescription className="text-slate-100">
             Create and manage all of yout password
            </SheetDescription>
          </SheetHeader>
          <SidebarRoutes />
        </SheetContent>
      </Sheet>
    )
}
