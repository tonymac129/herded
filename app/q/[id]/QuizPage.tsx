"use client";

import type { QuizType } from "@/types/Quiz";
import { useState } from "react";
import Btn from "@/components/ui/Btn";
import Link from "next/link";
import Option from "./Option";

type QuizPageProps = {
  existingQuiz: QuizType;
  voteOption: (id: string, index: number, option: number) => Promise<void>;
};

function QuizPage({ existingQuiz, voteOption }: QuizPageProps) {
  const [quiz, setQuiz] = useState(existingQuiz);
  const [index, setIndex] = useState<number>(0);
  const [selected, setSelected] = useState<number[]>([]);

  async function handleChoose(option: number) {
    if (selected[index - 1] % 1 !== 0) {
      const newSelected = [...selected];
      newSelected[index - 1] = option;
      setSelected(newSelected);
      const newQuestions = [...quiz.questions];
      newQuestions[index - 1].options[option].votes++;
      await voteOption(quiz.id, index - 1, option);
      setQuiz({ ...quiz, questions: newQuestions });
    }
  }

  return (
    <div className="my-10 px-5 py-10 w-150 m-auto flex flex-col items-center text-gray-800 text-center gap-y-5 rounded-lg border-2 border-gray-800">
      {index === 0 && (
        <>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-black font-bold text-2xl">{quiz.name}</h2>
            <div className="text-sm">Created by: {quiz.createdBy}</div>
            {quiz.description && <div>{quiz.description}</div>}
          </div>
          <div>
            Do you have herd mentality? Click the button below to start the
            quiz!
          </div>
          <Btn
            text="Start quiz"
            onclick={() => setIndex((prev) => prev + 1)}
            primary
          />
        </>
      )}
      {index !== 0 && index !== quiz.questions.length + 1 && (
        <div className="flex flex-col gap-y-5 w-full text-left">
          <h2 className="text-black font-bold text-lg">
            Question #{index}: {quiz.questions[index - 1].question}
          </h2>
          <div className="flex gap-x-5 mb-10">
            <Option
              selected={selected}
              index={index}
              handleChoose={handleChoose}
              quiz={quiz}
              option={0}
            />
            <Option
              selected={selected}
              index={index}
              handleChoose={handleChoose}
              quiz={quiz}
              option={1}
            />
          </div>
          <div className="flex gap-x-5 justify-center">
            <Btn text="Back" onclick={() => setIndex((prev) => prev - 1)} />
            {selected[index - 1] % 1 === 0 && (
              <Btn
                text={index === quiz.questions.length ? "Finish" : "Next"}
                onclick={() => setIndex((prev) => prev + 1)}
                primary
              />
            )}
          </div>
        </div>
      )}
      {index !== 0 && index === quiz.questions.length + 1 && (
        <div className="flex flex-col gap-y-5 w-full items-center">
          <h2 className="text-black font-bold text-2xl">
            Your trait: white sheep
          </h2>
          <h2 className="text-black font-bold text-2xl">Herdedness: 67%</h2>
          <div>You sided with the majority on 67% of the questions.</div>
          <div className="text-sm">
            Liked the quiz?{" "}
            <Link href="/create" className="underline">
              Create your own one here.
            </Link>
          </div>
          <div className="flex gap-x-5 justify-center">
            <Btn text="Back" onclick={() => setIndex((prev) => prev - 1)} />
            <Btn text="Go home" link="/" primary />
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
