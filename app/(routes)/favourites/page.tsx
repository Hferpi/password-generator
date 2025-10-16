import { DataTableItems } from "@/components/Shared/DataTableItems/DataTableItems";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



export default async function Favourites() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    redirect("/");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      elements: {
        where: {
          isFavourite: true,
        },
        orderBy: { createdAt: "desc" }
      }
    },
  });
  if (!user || !user.elements) {
    redirect("/");
  }

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-semibold">Your Favourites ⭐</h1>
      <DataTableItems elements={user.elements} />
    </div>
  );
}
