import type { QuizType } from "@/types/Quiz";
import { dbConnect } from "@/lib/db";
import { Quiz } from "@/models/Quiz";
import { notFound } from "next/navigation";
import { voteOption } from "./actions";
import QuizPage from "./QuizPage";

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  await dbConnect();
  const existingQuiz: QuizType | null = await Quiz.findOne({ id }).lean();
  if (!existingQuiz) notFound();

  return <QuizPage existingQuiz={existingQuiz} voteOption={voteOption} />;
}

export default Page;
