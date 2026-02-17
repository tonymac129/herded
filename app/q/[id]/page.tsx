import type { QuizType } from "@/types/Quiz";
import { dbConnect } from "@/lib/db";
import { Quiz } from "@/models/Quiz";
import { notFound } from "next/navigation";
import { voteOption, addComment } from "./actions";
import QuizPage from "./QuizPage";

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  await dbConnect();
  const existingQuiz: QuizType | null = await Quiz.findOne({ id }).lean();
  if (!existingQuiz) notFound();
  const cleanQuiz = JSON.parse(JSON.stringify(existingQuiz));

  return (
    <QuizPage
      existingQuiz={cleanQuiz}
      voteOption={voteOption}
      addComment={addComment}
    />
  );
}

export default Page;
