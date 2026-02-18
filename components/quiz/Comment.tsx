import type { CommentType } from "@/types/Quiz";
import { FaUserCircle } from "react-icons/fa";

const explanations = [
  {
    text: "black sheep",
    description: "Trying too hard to be unique for no reason.",
  },
  {
    text: "gray sheep",
    description: "Kinda boring, but at least has their own opinions.",
  },
  {
    text: "white sheep",
    description: "Slave to the algorithm and the collective internet mind.",
  },
];

function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="border-2 border-gray-800 rounded-lg px-5 py-3 flex flex-col gap-y-3">
      <div className="text-lg font-bold text-black flex items-center gap-x-3">
        <FaUserCircle size={25} />
        {comment.user}
        <span
          className="text-gray-800 rounded-lg bg-green-400 text-sm px-1 py-0.5 border-2 border-gray-800"
          title={
            explanations.find((e) => e.text === comment.trait)!.description
          }
        >
          {comment.trait}
        </span>
        <span className="text-sm text-gray-800 font-normal">
          {comment.createdAt}
        </span>
      </div>
      {comment.text}
    </div>
  );
}

export default Comment;
