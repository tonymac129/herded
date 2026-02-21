"use client";

import type { QuizType } from "@/types/Quiz";
import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";

type SubmitProps = {
  quiz: QuizType;
  setQuiz: React.Dispatch<React.SetStateAction<QuizType>>;
  error: string | null;
};

function Submit({ quiz, setQuiz, error }: SubmitProps) {
  const [copied, setCopied] = useState<boolean>(false);

  function handleCopy() {
    navigator?.clipboard.writeText(`https://herded.vercel.app/q/${quiz.id}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <div className="py-10 w-[95%] md:w-[80%] m-auto flex flex-col gap-y-5">
      <h2 className="text-2xl font-bold text-center mb-3">
        3. Publish and share your quiz
      </h2>
      <div className="border-2 border-gray-800 rounded-lg flex flex-col gap-y-3 p-5">
        <label className="flex flex-col gap-y-1 font-bold text-xl">
          Quiz ID
          <input
            placeholder="CoolQuiz123"
            value={quiz.id}
            onChange={(e) => {
              const newID = e.target.value.replace(/[^a-zA-Z0-9-_]/g, "");
              setQuiz({ ...quiz, id: newID });
            }}
            className="border-2 border-gray-800 bg-gray-300 rounded-lg px-4 py-2 text-base font-normal"
          />
        </label>
        <div className="text-gray-800 text-sm font-normal">
          (only letters, numbers, dash, and underscore accepted)
        </div>
        <div className="text-gray-800 text-sm font-normal flex items-center gap-x-3">
          https://herded.vercel.app/q/{quiz.id}
          {copied ? (
            <FaCheck size={15} title="URL copied" />
          ) : (
            <FaCopy
              size={15}
              className="inline cursor-pointer"
              title="Copy URL address"
              onClick={handleCopy}
            />
          )}
        </div>
        <label
          className="flex gap-x-3 items-center cursor-pointer w-fit"
          title="Public quizzes are browsable and displayed in the Quizzes tab publicly."
        >
          <div className="has-checked:bg-gray-800 group bg-transparent border-2 border-gray-800 rounded w-5 h-5 transition-colors duration-300 flex items-center justify-center">
            <input
              type="checkbox"
              className="hidden"
              checked={quiz.public}
              onChange={(e) => setQuiz({ ...quiz, public: e.target.checked })}
            />
            <FaCheck
              size={25}
              className="opacity-0 group-has-checked:opacity-100 transition-opacity duration-300 text-white"
            />
          </div>
          Public
        </label>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}

export default Submit;
