"use client";

import type { QuizType } from "@/types/Quiz";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import QuizCard from "@/components/ui/QuizCard";

function QuizSearch({ quizzes }: { quizzes: QuizType[] }) {
  const [search, setSearch] = useState<string>("");
  const [displayed, setDisplayed] = useState<QuizType[]>([]);

  useEffect(() => {
    if (search.trim().length == 0) {
      setDisplayed([]);
    }
  }, [search]);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = search.trim().toLowerCase();
    if (query.length > 0) {
      setDisplayed(
        quizzes.filter(
          (quiz) =>
            quiz.name.toLowerCase().includes(query) ||
            quiz.description?.toLowerCase().includes(query),
        ),
      );
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col gap-y-1 font-bold text-xl w-[80%] md:w-[30%] m-auto">
          <div className="flex items-center relative">Search quizzes</div>
          <div className="relative flex items-center w-full font-normal">
            <input
              type="text"
              value={search}
              placeholder="Quiz name"
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-2 border-gray-800 bg-gray-300 rounded-lg px-4 py-2"
            />
            {search.length > 0 && (
              <MdClose
                size={25}
                className="text-gray-800 absolute right-4 cursor-pointer hover:scale-120 transition-transform"
                title="Clear search"
                onClick={() => setSearch("")}
              />
            )}
          </div>
        </label>
        <button type="submit" className="hidden" />
      </form>
      <div className="flex flex-wrap justify-center py-10 gap-5">
        {displayed.length > 0 &&
          displayed.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}
      </div>
    </div>
  );
}

export default QuizSearch;
