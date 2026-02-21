import type { QuizType } from "@/types/Quiz";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Quiz } from "@/models/Quiz";
import { User } from "@/models/User";
import { deleteQuiz, deleteAccount } from "./actions";
import SignoutBtn from "./SignoutBtn";
import DeleteBtn from "./DeleteBtn";
import QuizCard from "@/components/ui/QuizCard";
import Btn from "@/components/ui/Btn";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Herded User Profile",
  description:
    "This is your private personal profile on Herded where you can see and manage your own quizzes",
  authors: [{ name: "TonyMac129", url: "https://tonymac.net" }],
  openGraph: {
    title: "Profile | Herded",
    description:
      "This is your private personal profile on Herded where you can see and manage your own quizzes",
    url: "https://herded.vercel.app/profile",
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
  if (!session?.user) {
    redirect("/signin");
  }
  await dbConnect();
  const fetchedQuizzes = await Quiz.find({ createdBy: session.user.email });
  const existingQuizzes: QuizType[] = JSON.parse(
    JSON.stringify(fetchedQuizzes),
  );
  const existingUser = await User.findOne({ email: session.user.email });

  return (
    <div className="my-10 flex flex-col md:flex-row gap-10">
      <div className="rounded-lg border-2 border-gray-800 text-gray-800 flex flex-col flex-1 px-10 py-5 gap-y-5">
        <Image
          src={session.user.image!}
          alt="Avatar"
          width={130}
          height={130}
          className="rounded-full border-2 border-gray-800"
        />
        <h2 className="text-black text-2xl font-bold">{session.user.name}</h2>
        <div className="leading-5">
          This is your private personal profile where you can see and manage
          your own quizzes
        </div>
        <div>
          Joined {new Date(existingUser.createdAt).toLocaleDateString()}
        </div>
        <SignoutBtn />
        <DeleteBtn deleteAccount={deleteAccount} email={session.user.email!} />
      </div>
      <div className="rounded-lg border-2 border-gray-800 flex flex-col flex-4 px-5 py-5">
        <h2 className="text-black text-2xl font-bold mb-5">Your quizzes</h2>
        {existingQuizzes.length > 0 ? (
          <div className="flex gap-5 flex-wrap">
            {existingQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} deleteQuiz={deleteQuiz} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-y-5 items-center h-full justify-center">
            Quizzes you&apos;ve created will show up here
            <Btn text="Create quiz" link="/create" primary />
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
