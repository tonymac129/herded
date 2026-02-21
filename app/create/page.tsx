import type { Metadata } from "next";
import { createQuiz } from "./actions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Create from "./Create";

export const metadata: Metadata = {
  title: "Create a Quiz on Herded",
  description:
    "Herded is a would you rather quiz platform where you can create custom interactive would you rather quizzes or take fun public quizzes other people created!",
  authors: [{ name: "TonyMac129", url: "https://tonymac.net" }],
  openGraph: {
    title: "Create | Herded",
    description:
      "Herded is a would you rather quiz platform where you can create custom interactive would you rather quizzes or take fun public quizzes other people created!",
    url: "https://herded.vercel.app/create",
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
  if (!session?.user) redirect("/signin");

  return (
    <div>
      <Create createQuiz={createQuiz} user={session.user} />
    </div>
  );
}

export default Page;
