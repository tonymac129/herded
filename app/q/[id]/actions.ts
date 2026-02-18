"use server";

import type { CommentType, QuizType } from "@/types/Quiz";
import { dbConnect } from "@/lib/db";
import { Quiz } from "@/models/Quiz";
import { revalidatePath } from "next/cache";

export async function voteOption(id: string, index: number, option: number) {
  try {
    await dbConnect();
    const existingQuiz: QuizType = await Quiz.findOne({ id }).lean();
    if (existingQuiz) {
      const newQuestions = [...existingQuiz.questions];
      newQuestions[index].options[option].votes++;
      await Quiz.findOneAndUpdate({ id }, { questions: newQuestions });
      revalidatePath("/q/" + id);
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}

export async function addComment(id: string, comment: CommentType) {
  try {
    await dbConnect();
    const existingQuiz: QuizType = await Quiz.findOne({ id }).lean();
    if (existingQuiz) {
      const newComments = [...existingQuiz.comments];
      newComments.push(comment);
      await Quiz.findOneAndUpdate(
        { id },
        { comments: newComments },
        { new: true },
      );
      revalidatePath("/q/" + id);
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}

export async function playOnce(id: string) {
  try {
    await dbConnect();
    const existingQuiz: QuizType = await Quiz.findOne({ id }).lean();
    if (existingQuiz) {
      await Quiz.findOneAndUpdate(
        { id },
        { plays: existingQuiz.plays + 1 },
        { new: true },
      );
      revalidatePath("/q/" + id);
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}
