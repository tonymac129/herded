"use client";

import { motion } from "framer-motion";
import { QuizType } from "@/types/Quiz";

type OptionProps = {
  selected: number[];
  index: number;
  handleChoose: (option: number) => void;
  quiz: QuizType;
  option: 0 | 1;
};

function Option({ selected, index, handleChoose, quiz, option }: OptionProps) {
  const votes = quiz.questions[index - 1].options[option].votes;
  const percentage =
    Math.round(
      (votes /
        (quiz.questions[index - 1].options[0].votes +
          quiz.questions[index - 1].options[1].votes) || 0) * 10000,
    ) / 100;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ y: -1, scale: 1.02 }}
      className={
        "flex-1 rounded-lg border-2 border-gray-800 bg-gray-300 cursor-pointer px-4 py-2 text-lg text-bold text-black relative overflow-hidden" +
        (selected[index - 1] === option ? " bg-green-300!" : "bg-transparent")
      }
      onClick={() => handleChoose(option)}
    >
      {selected[index - 1] % 1 === 0 && (
        <>
          <div
            style={{ width: percentage + "%" }}
            className={`h-full top-0 left-0 absolute ${selected[index - 1] === option ? "bg-green-500" : "bg-gray-400"}`}
          />
          <div className="absolute right-1 text-sm h-full flex items-center top-0">
            {votes} {votes === 1 ? "person" : "people"} chose this ({percentage}
            %)
          </div>
        </>
      )}
      <div className="absolute">
        {quiz.questions[index - 1].options[option].text}
      </div>
      <div className="invisible">&nbsp;</div>
    </motion.div>
  );
}

export default Option;
