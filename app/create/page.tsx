"use client";

import type { QuizType } from "@/types/Quiz";
import { useState } from "react";
import Btn from "@/components/ui/Btn";
import Info from "./Info";
import Quiz from "./Quiz";
import Submit from "./Submit";

const defaultQuiz: QuizType = {
  id: crypto.randomUUID(),
  name: "",
  description: "",
  questions: [{ id: crypto.randomUUID(), question: "", options: ["", ""] }],
  createdBy: "",
  createdAt: new Date().toISOString().slice(0, 10),
};

function Page() {
  const [index, setIndex] = useState<number>(0);
  const [quiz, setQuiz] = useState<QuizType>(defaultQuiz);
  const showNextBtn =
    (index === 0 && quiz.name && quiz.description) ||
    (index === 1 &&
      quiz.questions.length > 0 &&
      quiz.questions.every(
        (question) =>
          question.question.trim().length > 0 &&
          question.options.every((option) => option.trim().length > 0),
      ));

  function handleSubmit() {
    console.log(quiz);
    //TODO: implement backend logic
  }

  return (
    <div className="pb-10">
      {index === 0 && <Info quiz={quiz} setQuiz={setQuiz} />}
      {index === 1 && <Quiz quiz={quiz} setQuiz={setQuiz} />}
      {index === 2 && <Submit quiz={quiz} setQuiz={setQuiz} />}
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

export default Page;
