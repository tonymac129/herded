import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SigninBtn from "./SigninBtn";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/profile");
  }

  return <SigninBtn />;
}

export default Page;
