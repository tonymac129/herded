"use client";

import type { CommentType, QuizType } from "@/types/Quiz";
import { useMemo, useState, useEffect } from "react";
import Btn from "@/components/ui/Btn";
import Option from "@/components/quiz/Option";
import Comment from "@/components/quiz/Comment";
import CommentSection from "@/components/quiz/CommentSection";
import Link from "next/link";

const defaultComment: CommentType = {
  id: crypto.randomUUID(),
  user: "",
  trait: "black sheep",
  text: "",
  createdAt: new Date().toISOString().slice(0, 10),
};

type QuizPageProps = {
  existingQuiz: QuizType;
  voteOption: (id: string, index: number, option: number) => Promise<void>;
  addComment: (id: string, comment: CommentType) => Promise<void>;
};

type TraitType = {
  text: "white sheep" | "gray sheep" | "black sheep";
  description: string;
};

function QuizPage({ existingQuiz, voteOption, addComment }: QuizPageProps) {
  const [quiz, setQuiz] = useState(existingQuiz);
  const [index, setIndex] = useState<number>(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [majority, setMajority] = useState<boolean[]>([]);
  const [comment, setComment] = useState<CommentType>(defaultComment);
  const herdedness = useMemo<number>(
    () =>
      Math.round(
        (majority.reduce((acc, q) => {
          if (q) {
            acc++;
          }
          return acc;
        }, 0) /
          majority.length) *
          100,
      ),
    [majority],
  );
  const trait = useMemo<TraitType>(() => {
    let traitObject: TraitType;
    if (herdedness > 67) {
      traitObject = {
        text: "white sheep",
        description:
          "Let's face it, you are a slave to the algorithm. You side with whatever's most socially acceptable without thinking.",
      };
    } else if (herdedness > 33) {
      traitObject = {
        text: "gray sheep",
        description:
          "You are a glitch in the collective internet mind. You're kinda boring, but at least you have your own opinions.",
      };
    } else {
      traitObject = {
        text: "black sheep",
        description:
          "While other people are obsessing over TikTok trends, you're out here trying too hard to be unique for no reason.",
      };
    }
    setComment((prev) => {
      return { ...prev, trait: traitObject.text };
    });
    return traitObject;
  }, [herdedness]);

  useEffect(() => {
    setQuiz(existingQuiz);
  }, [existingQuiz]);

  async function handleChoose(option: number) {
    if (selected[index - 1] % 1 !== 0) {
      const newSelected = [...selected];
      newSelected[index - 1] = option;
      setSelected(newSelected);
      const newQuestions = [...quiz.questions];
      const newMajority = [...majority];
      newMajority[index - 1] =
        newQuestions[index - 1].options[option].votes + 1 >
        newQuestions[index - 1].options[(option + 1) % 2].votes;
      setMajority(newMajority);
      await voteOption(quiz.id, index - 1, option);
    }
  }

  async function handleComment() {
    await addComment(quiz.id, comment);
    setComment({
      ...defaultComment,
      trait: trait.text,
      id: crypto.randomUUID(),
    });
  }

  return (
    <>
      <div className="mt-10 px-5 py-10 w-150 m-auto flex flex-col items-center text-gray-800 text-center gap-y-5 rounded-lg border-2 border-gray-800">
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
        {index === quiz.questions.length + 1 && (
          <div className="flex flex-col gap-y-3 w-full items-center">
            <h2 className="text-black font-bold text-2xl">
              Your trait: {trait.text}
            </h2>
            <h2 className="text-black font-bold text-2xl">
              Herdedness: {herdedness}%
            </h2>
            <div>
              You sided with the majority on {herdedness}% of the questions.
            </div>
            <div>{trait.description}</div>
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
      {index === quiz.questions.length + 1 && (
        <>
          <CommentSection
            comment={comment}
            setComment={setComment}
            handleComment={handleComment}
          />
          <div className="mt-5 mb-10 w-150 m-auto flex flex-col gap-y-5">
            <h2 className="text-black font-bold text-xl">
              Comment{quiz.comments.length === 1 ? "" : "s"} (
              {quiz.comments.length})
            </h2>
            {quiz.comments?.length > 0 ? (
              <div className="flex flex-col gap-y-3">
                {quiz.comments
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
                  )
                  .map((comment) => {
                    return <Comment key={comment.id} comment={comment} />;
                  })}
              </div>
            ) : (
              <div>No comments on this quiz yet. Start the conversation!</div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default QuizPage;
