import { Logo } from "@/components/Shared/Logo";
import { Sidebar } from "@/components/Shared/Logo/Sidebar";
import { SidebareMobile } from "@/components/Shared/SidebarModible";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function LayoutRoutes({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await getServerSession()
    if (!session || !session.user?.email) {
        return redirect("/")
    }
    const user = await db.user.findUnique({
        where: {
            email: session?.user?.email
        }
    })
    console.log(user)
    return (
        <main className="h-full">
            <div className="flex justify-between lg:hidden px-6 py-3 items-center bg-blue-500">
                <div className="py-1 text-white" >
                    <Logo username={user?.username || "..."} />
                </div>
                <SidebareMobile />
            </div>
            <div className="flex h-full">
                <div className="max-w-lg hidden lg:flex h-full w-72 flex-col fixed bg-blue-500 px-4 text-white ">
                    <Sidebar username={user?.username || "..."} />
                </div>
                <div className="w-full lg:pl-72">
                    <div className="p-6">{children}</div>
                </div>
            </div>
        </main>
    )
}