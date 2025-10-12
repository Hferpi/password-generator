import { Logo } from "../Logo";
import { SidebarRoutes } from "@/components/Shared/SidebarRoutes";

export function Sidebar() {
    return <>
    <div className="py-6">
        <Logo />
    </div>
    <SidebarRoutes />
    </>
}