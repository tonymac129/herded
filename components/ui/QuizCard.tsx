"use client";

import type { QuizType } from "@/types/Quiz";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

type QuizCardProps = {
  quiz: QuizType;
  showOwner?: boolean;
  deleteQuiz?: (id: string) => Promise<void>;
};

function QuizCard({ quiz, showOwner, deleteQuiz }: QuizCardProps) {
  function handleDelete(e: React.MouseEvent<SVGElement>) {
    e.preventDefault();
    if (
      confirm(
        "Are you sure you want to delete this quiz? This action cannot be undone.",
      ) &&
      deleteQuiz
    ) {
      deleteQuiz(quiz.id);
    }
  }

  return (
    <Link href={"/q/" + quiz.id}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 1.03, y: -1 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="border-2 border-gray-800 rounded-lg p-5 flex flex-col items-center text-center text-gray-800 text-sm gap-y-3 w-60 cursor-pointer h-47 relative"
      >
        <h2 className="text-lg font-bold text-black">{quiz.name}</h2>
        {quiz.description && (
          <div title={quiz.description}>
            {quiz.description.slice(0, 60) +
              (quiz.description.length > 60 ? "..." : "")}
          </div>
        )}
        <div className="flex justify-between w-full">
          <div>Total plays: {quiz.plays}</div>
          <div>{new Date(quiz.createdAt).toLocaleDateString()}</div>
        </div>
        {showOwner && (
          <div title={quiz.createdBy}>
            Created by:{" "}
            {quiz.createdBy.slice(0, 14) +
              (quiz.createdBy.length > 14 ? "..." : "")}
          </div>
        )}
        {deleteQuiz && (
          <FaTrash
            size={20}
            title="Delete quiz"
            className="text-red-500 cursor-pointer absolute top-2 right-2"
            onClick={(e) => handleDelete(e)}
          />
        )}
      </motion.div>
    </Link>
  );
}

export default QuizCard;
