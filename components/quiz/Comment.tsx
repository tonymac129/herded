import type { CommentType } from "@/types/Quiz";
import { FaUserCircle } from "react-icons/fa";

function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="border-2 border-gray-800 rounded-lg px-5 py-3 flex flex-col gap-y-3">
      <div className="text-lg font-bold text-black flex items-center gap-x-3">
        <FaUserCircle size={25} />
        {comment.user}
        <span className="text-gray-800 rounded-lg bg-green-400 text-sm px-1 py-0.5 border-2 border-gray-800">
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
