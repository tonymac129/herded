"use server";

import type { QuizType } from "@/types/Quiz";
import { dbConnect } from "@/lib/db";
import { Quiz } from "@/models/Quiz";

export async function voteOption(id: string, index: number, option: number) {
  try {
    await dbConnect();
    const existingQuiz: QuizType = await Quiz.findOne({ id }).lean();
    if (existingQuiz) {
      const newQuestions = [...existingQuiz.questions];
      newQuestions[index].options[option].votes++;
      await Quiz.findOneAndUpdate({ id }, { questions: newQuestions });
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}
