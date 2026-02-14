import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Signout from "./Signout";

async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div>
      {session.user.name}
      <Signout />
    </div>
  );
}

export default Page;
