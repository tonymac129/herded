"use client";

import type { OptionType, QuizType } from "@/types/Quiz";
import type { ActionResponseType } from "@/types/Global";
import type { Session } from "next-auth";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Btn from "@/components/ui/Btn";
import Info from "./Info";
import Quiz from "./Quiz";
import Submit from "./Submit";

export const defaultOption: OptionType = { text: "", votes: 0 };

const defaultQuiz = (email: string): QuizType => {
  return {
    id: crypto.randomUUID(),
    name: "",
    description: "",
    questions: [
      {
        id: crypto.randomUUID(),
        question: "",
        options: [{ ...defaultOption }, { ...defaultOption }],
      },
    ],
    createdBy: email,
    createdAt: new Date().toISOString().slice(0, 10),
    public: true,
    comments: [],
    plays: 0,
  };
};

type CreateProps = {
  createQuiz: (
    id: string,
    quiz: QuizType,
    email: string,
  ) => Promise<ActionResponseType>;
  user: Session["user"];
};

function Create({ createQuiz, user }: CreateProps) {
  const [index, setIndex] = useState<number>(0);
  const [quiz, setQuiz] = useState<QuizType>(defaultQuiz(user!.email!));
  const [error, setError] = useState<string | null>(null);
  const showNextBtn =
    (index === 0 && quiz.name.trim().length > 0) ||
    (index === 1 &&
      quiz.questions.length > 0 &&
      quiz.questions.every(
        (question) =>
          question.question.trim().length > 0 &&
          question.options.every((option) => option.text.trim().length > 0),
      ));

  useEffect(() => {
    setQuiz(defaultQuiz(user!.email!));
  }, [user]);

  async function handleSubmit() {
    const response = await createQuiz(quiz.id, quiz, quiz.createdBy);
    if (!response.error) {
      redirect("/q/" + quiz.id);
    } else {
      setError(response.error);
    }
  }

  return (
    <div className="pb-10">
      {index === 0 && <Info quiz={quiz} setQuiz={setQuiz} />}
      {index === 1 && <Quiz quiz={quiz} setQuiz={setQuiz} />}
      {index === 2 && <Submit quiz={quiz} setQuiz={setQuiz} error={error} />}
      <div className="w-150 m-auto flex gap-x-5 justify-center">
        {index !== 0 && (
          <Btn text="Back" onclick={() => setIndex((prev) => prev - 1)} />
        )}
        {showNextBtn && (
          <Btn
            text="Next"
            onclick={() => setIndex((prev) => prev + 1)}
            primary
          />
        )}
        {index === 2 && quiz.id.trim().length > 0 && (
          <Btn text="Submit" onclick={handleSubmit} primary />
        )}
      </div>
    </div>
  );
}

export default Create;
