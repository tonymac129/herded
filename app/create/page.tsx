import { createQuiz } from "./actions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Create from "./Create";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");

  return (
    <div>
      <Create createQuiz={createQuiz} user={session.user} />
    </div>
  );
}

export default Page;
