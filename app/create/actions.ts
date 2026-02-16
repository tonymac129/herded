"use server";

import type { QuizType } from "@/types/Quiz";
import type { ActionResponseType } from "@/types/Global";
import { dbConnect } from "@/lib/db";
import { Quiz } from "@/models/Quiz";
import { User } from "@/models/User";

export async function createQuiz(
  id: string,
  quiz: QuizType,
  email: string,
): Promise<ActionResponseType> {
  try {
    await dbConnect();
    const existingQuiz = await Quiz.findOne({ id });
    if (!existingQuiz) {
      await Quiz.create(quiz);
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const newQuizzes = [...existingUser.quizzes, quiz.id];
        const newUser = await User.findOneAndUpdate(
          { email },
          { quizzes: newQuizzes },
          { new: true },
        );
        console.log(newUser);
      }
      return { success: true, message: "Quiz created successfully" };
    }
    return {
      success: false,
      error: 'Quiz with ID "' + id + '" already exists',
    };
  } catch (err) {
    console.error("Error: " + err);
    return {
      success: false,
      error: "Failed to create quiz, please try again later",
    };
  }
}
