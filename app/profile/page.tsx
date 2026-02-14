import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignoutBtn from "./SignoutBtn";
import Image from "next/image";

async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="my-10 flex gap-x-10">
      <div className="rounded-lg border-2 border-gray-800 text-gray-800 flex flex-col flex-1 px-10 py-5 gap-y-5">
        <Image
          src={session.user.image!}
          alt="Avatar"
          width={130}
          height={130}
          className="rounded-full border-2 border-gray-800"
        />
        <h2 className="text-black text-2xl font-bold">{session.user.name}</h2>
        <div>Add a little about yourself...</div>
        <div>Joined {new Date().toLocaleDateString()}</div>
        <SignoutBtn />
      </div>
      <div className="rounded-lg border-2 border-gray-800 flex flex-col flex-3 px-10 py-5">
        Quizzes you&apos;ve created will show up here
      </div>
    </div>
  );
}

export default Page;
