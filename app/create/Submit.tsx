"use client";

import type { QuizType } from "@/types/Quiz";
import { FaCopy } from "react-icons/fa";

type SubmitProps = {
  quiz: QuizType;
  setQuiz: React.Dispatch<React.SetStateAction<QuizType>>;
};

function Submit({ quiz, setQuiz }: SubmitProps) {
  return (
    <div className="py-10 w-150 m-auto flex flex-col gap-y-5">
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
          <div className="text-gray-800 text-sm font-normal">
            (only letters, numbers, dash, and underscore accepted)
            <br />
            https://herded.vercel.app/q/{quiz.id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <FaCopy
              size={15}
              className="inline cursor-pointer"
              title="Copy URL address"
              onClick={() =>
                navigator?.clipboard.writeText(
                  `https://herded.vercel.app/q/${quiz.id}`,
                )
              }
            />
          </div>
        </label>
      </div>
    </div>
  );
}

export default Submit;
