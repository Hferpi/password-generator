import { Logo } from "../Logo";
import { SidebarRoutes } from "@/components/Shared/SidebarRoutes";

export function Sidebar(props: {username: string}) {
    const {username} = props
    return <>
    <div className="py-6">
        <Logo username={username} />
    </div>
    <SidebarRoutes />
    </>
}