"use client";

import type { QuizType } from "@/types/Quiz";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { defaultOption } from "./Create";
import Btn from "@/components/ui/Btn";

const inputStyles = "border-2 border-gray-800 bg-gray-300 rounded-lg px-4 py-2";

type QuizProps = {
  quiz: QuizType;
  setQuiz: React.Dispatch<React.SetStateAction<QuizType>>;
};

function Quiz({ quiz, setQuiz }: QuizProps) {
  return (
    <div className="py-10 w-150 m-auto flex flex-col gap-y-5">
      <h2 className="text-2xl font-bold text-center mb-3">
        2. Add some fun questions to your quiz
      </h2>
      <div className="flex flex-col gap-y-5">
        {quiz.questions.map((question, index) => {
          return (
            <div
              key={question.id}
              className="border-2 border-gray-800 rounded-lg flex flex-col gap-y-3 p-5"
            >
              <label className="flex flex-col gap-y-1 font-bold text-xl">
                <div className="flex items-center relative">
                  Question #{index + 1}{" "}
                  {quiz.questions.length > 1 && (
                    <motion.div
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 1.1, y: -1 }}
                      className="text-red-500 cursor-pointer absolute right-0"
                      onClick={() => {
                        const newQuestions = [...quiz.questions];
                        setQuiz({
                          ...quiz,
                          questions: newQuestions.filter(
                            (q) => q.id !== question.id,
                          ),
                        });
                      }}
                    >
                      <FaTrash size={20} title="Delete question" />
                    </motion.div>
                  )}
                </div>
                <input
                  placeholder="Would you rather eat a moldy sock or drink toilet water?"
                  value={question.question}
                  onChange={(e) => {
                    const newQuestions = [...quiz.questions];
                    newQuestions.find((q) => q.id === question.id)!.question =
                      e.target.value;
                    setQuiz({ ...quiz, questions: newQuestions });
                  }}
                  className={inputStyles + " text-base font-normal"}
                />
              </label>
              {[0, 1].map((option) => {
                return (
                  <label key={option} className="flex flex-col gap-y-1">
                    Option #{option + 1}
                    <input
                      placeholder={
                        option
                          ? "Inhaling cat fart"
                          : "Stepping on throwup barefoot"
                      }
                      value={question.options[option].text}
                      onChange={(e) => {
                        const newQuestions = [...quiz.questions];
                        newQuestions.find((q) => q.id === question.id)!.options[
                          option
                        ].text = e.target.value;
                        setQuiz({ ...quiz, questions: newQuestions });
                      }}
                      className={inputStyles}
                    />
                  </label>
                );
              })}
            </div>
          );
        })}
      </div>
      <div>
        <Btn
          text="Add question"
          onclick={() => {
            const newQuestions = [...quiz.questions];
            newQuestions.push({
              id: crypto.randomUUID(),
              question: "",
              options: [{ ...defaultOption }, { ...defaultOption }],
            });
            setQuiz({ ...quiz, questions: newQuestions });
          }}
          primary
        />
      </div>
    </div>
  );
}

export default Quiz;
