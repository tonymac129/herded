import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SigninBtn from "./SigninBtn";
import { redirect } from "next/navigation";
import { MdWavingHand } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Sign in to Herded",
  description:
    "Herded is a would you rather quiz platform where you can create custom interactive would you rather quizzes or take fun public quizzes other people created!",
  authors: [{ name: "TonyMac129", url: "https://tonymac.net" }],
  openGraph: {
    title: "Sign in | Herded",
    description:
      "Herded is a would you rather quiz platform where you can create custom interactive would you rather quizzes or take fun public quizzes other people created!",
    url: "https://herded.vercel.app/signin",
    siteName: "Herded",
    images: [
      {
        url: "/logo.png",
        width: 150,
        height: 150,
      },
    ],
    type: "website",
  },
};

async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/profile");
  }

  return (
    <div className="flex flex-col items-center gap-y-3 text-gray-800 justify-center w-90 m-auto rounded-lg my-10 px-5 py-10 border-2 border-gray-800">
      <MdWavingHand size={40} />
      <h2 className="text-2xl font-bold text-black">Welcome back</h2>
      <p className="mb-5 text-center">
        Sign in to Herded with one of these options
      </p>
      <SigninBtn provider="Google">
        <FcGoogle size={30} />
      </SigninBtn>
      <SigninBtn provider="GitHub">
        <FaGithub size={30} />
      </SigninBtn>
    </div>
  );
}

export default Page;
