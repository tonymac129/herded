import type { QuizType } from "@/types/Quiz";
import { dbConnect } from "@/lib/db";
import { Quiz } from "@/models/Quiz";
import { notFound } from "next/navigation";
import { voteOption, addComment, playOnce } from "./actions";
import QuizPage from "./QuizPage";

async function fetchQuiz(id: string): Promise<QuizType> {
  await dbConnect();
  const existingQuiz: QuizType | null = await Quiz.findOne({ id }).lean();
  if (!existingQuiz) notFound();
  return JSON.parse(JSON.stringify(existingQuiz));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const fetchedQuiz = await fetchQuiz(id);

  return {
    title: `${fetchedQuiz.name} | Herded`,
    description: fetchedQuiz.description
      ? fetchedQuiz.description.slice(0, 160)
      : "Herded is a would you rather quiz platform where you can create custom interactive would you rather quizzes or take fun public quizzes other people created!",
    authors: [{ name: "TonyMac129", url: "https://tonymac.net" }],
    openGraph: {
      title: `${fetchedQuiz.name} | Herded`,
      description: fetchedQuiz.description
        ? fetchedQuiz.description
        : "Herded is a would you rather quiz platform where you can create custom interactive would you rather quizzes or take fun public quizzes other people created!",
      url: "https://herded.vercel.app/q/" + fetchedQuiz.id,
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
}

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  await dbConnect();
  const cleanQuiz = await fetchQuiz(id);

  return (
    <QuizPage
      existingQuiz={cleanQuiz}
      voteOption={voteOption}
      addComment={addComment}
      playOnce={playOnce}
    />
  );
}

export default Page;
