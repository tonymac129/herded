"use client";

import type { QuizType } from "@/types/Quiz";

const inputStyles =
  "border-2 border-gray-800 bg-gray-300 rounded-lg px-4 py-2 text-base font-normal";

type InfoProps = {
  quiz: QuizType;
  setQuiz: React.Dispatch<React.SetStateAction<QuizType>>;
};

function Info({ quiz, setQuiz }: InfoProps) {
  return (
    <div className="py-10 w-150 m-auto flex flex-col gap-y-5">
      <h2 className="text-2xl font-bold text-center mb-3">
        1. Tell us a bit about your quiz
      </h2>
      <div className="border-2 border-gray-800 rounded-lg flex flex-col gap-y-3 p-5">
        <label className="flex flex-col gap-y-1 font-bold text-xl">
          Name
          <input
            placeholder="Super interesting cool quiz"
            value={quiz.name}
            onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
            className={inputStyles}
          />
        </label>
        <label className="flex flex-col gap-y-1 font-bold text-xl">
          Description
          <input
            placeholder="This quiz is super interesting and cool"
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            className={inputStyles}
          />
        </label>
      </div>
    </div>
  );
}

export default Info;
