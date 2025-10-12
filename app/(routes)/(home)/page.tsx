
import { redirect } from "next/navigation";
import { HeaderMain } from "./components/HeaderMain";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import {  TableData } from "./components/TableData";

export default async function Home() {
  const session = await getServerSession()

  if (!session || !session.user?.email) {
    return redirect("/")
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email
    },
    include: {
      elements: {
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  })
  if (!user || !user.elements) {
    return redirect("/")
  }
  return (
    <div>
      <HeaderMain userId={user?.id} />
      <TableData data={user.elements} />
    </div>
  );
}
