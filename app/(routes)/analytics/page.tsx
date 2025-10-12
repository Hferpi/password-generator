import { countPasswords } from "@/lib/countPasswords";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RepeatedPasswordsChart } from "./components/RepeatedPasswordsChart";
import { ViewAnalyticsCharts } from "./components/ViewAnalyticsCharts";
import { countWhereSitesPasswordsAre } from "@/lib/counWhereSitesPasswordsAre";


export default async function AnalyticsPage() {
    const session = await getServerSession()
    if (!session || !session.user?.email) {
        redirect('/')
    }

    const user = await db.user.findUnique({
        where: {
            email: session.user?.email
        },
        include:{
            elements:{
                orderBy:{
                    createdAt: "desc",
                },
            },
        },
    })
    if (!user) {
        redirect('/')
    }
    const {unique, repeated} =countPasswords(user.elements)
    const {creditCards, work, shopping, entreteniment, social} =countWhereSitesPasswordsAre(user.elements)
    return (
        <div>
            <h1 className="text-xl md:text-3xl font-semibold">Analytics</h1>
            <div className="grid md:grid-cols-2 gap-5 mt-6 mb-4">
                <RepeatedPasswordsChart unique={unique} repeated={repeated}/>
                <ViewAnalyticsCharts creditCards={creditCards} work={work} shopping={shopping} entreteniment={entreteniment} social={social}/>
            </div>
        </div>
    )
}