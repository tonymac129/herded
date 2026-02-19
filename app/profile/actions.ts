"use server";

import type { QuizType } from "@/types/Quiz";
import type { UserType } from "@/types/User";
import { dbConnect } from "@/lib/db";
import { Quiz } from "@/models/Quiz";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { User } from "@/models/User";

export async function deleteQuiz(id: string) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const existingQuiz: QuizType | null = await Quiz.findOne({ id });
    if (existingQuiz && session?.user?.email === existingQuiz.createdBy) {
      await Quiz.findOneAndDelete({ id });
      revalidatePath("/profile");
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}

export async function deleteAccount(email: string) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const existingUser: UserType | null = await User.findOne({ email });
    if (existingUser && session?.user?.email === existingUser.email) {
      await User.findOneAndDelete({ email });
      revalidatePath("/profile");
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}
