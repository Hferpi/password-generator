import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import {FormProfile} from "./components/FormProfile";
import { getServerSession } from "next-auth";

export default async function Profile() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect('/');
  }

  const userDb = await db.user.findUnique({
    where: { email: session.user?.email },
  });

  if (!userDb) {
    redirect('/');
  }

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-semibold">Account Details 👤</h1>
      <FormProfile user={userDb} />
    </div>
  );
}
