import type { QuizType } from "@/types/Quiz";
import type { Metadata } from "next";
import { dbConnect } from "@/lib/db";
import { Quiz } from "@/models/Quiz";
import Hero from "@/components/layout/Hero";
import QuizCard from "@/components/ui/QuizCard";
import QuizSearch from "./QuizSearch";

const quizzesStyles = "flex flex-wrap justify-center py-10 gap-5";

export const metadata: Metadata = {
  title: "Public Quizzes on Herded",
  description:
    "Browse all the most popular fun public quizzes on Herded created by other users. To get your quiz on this page, make it public and share it with other people!",
  authors: [{ name: "TonyMac129", url: "https://tonymac.net" }],
  openGraph: {
    title: "Quizzes | Herded",
    description:
      "Browse all the most popular fun public quizzes on Herded created by other users. To get your quiz on this page, make it public and share it with other people!",
    url: "https://herded.vercel.app/quizzes",
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
  await dbConnect();
  const existingQuizzes = await Quiz.find({ public: true });
  const quizzes: QuizType[] = JSON.parse(JSON.stringify(existingQuizzes));

  return (
    <div>
      <Hero
        title="Quizzes"
        description="Browse all the most popular fun public quizzes on Herded created by other users. To get your quiz on this page, make it public and share it with other people!"
      />
      <QuizSearch quizzes={quizzes} />
      <h2 className="text-2xl font-bold text-black text-center">
        Most popular quizzes
      </h2>
      <div className={quizzesStyles}>
        {quizzes
          .sort((a, b) => b.plays - a.plays)
          .slice(0, 4)
          .map((quiz) => {
            return <QuizCard key={quiz.id} quiz={quiz} showOwner />;
          })}
      </div>
      <h2 className="text-2xl font-bold text-black text-center">
        Most recent quizzes
      </h2>
      <div className={quizzesStyles}>
        {quizzes
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 4)
          .map((quiz) => {
            return <QuizCard key={quiz.id} quiz={quiz} showOwner />;
          })}
      </div>
      <h2 className="text-2xl font-bold text-black text-center">
        All public quizzes
      </h2>
      <div className={quizzesStyles}>
        {quizzes
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((quiz) => {
            return <QuizCard key={quiz.id} quiz={quiz} showOwner />;
          })}
      </div>
    </div>
  );
}

export default Page;
