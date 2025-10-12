import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { FormEditElement } from "@/components/Shared/FormEditElement";

type PageProps = {
  params: Promise<{
    elementId: string;
  }>;
};

export default async function ElementPage({ params }: PageProps) {
  const { elementId } = await params; 
  
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    redirect("/");
  }

  const element = await db.element.findUnique({
    where: { id: elementId },
  });

  if (!element) {
    redirect("/");
  }

  return (
    <div>
      <h1>Element page</h1>
      <div>
        <FormEditElement dataElement={element} />
      </div>
    </div>
  );
}
