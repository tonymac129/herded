import { CommentType } from "@/types/Quiz";
import Btn from "../ui/Btn";

type CommentSectionProps = {
  comment: CommentType;
  setComment: React.Dispatch<React.SetStateAction<CommentType>>;
  handleComment: () => void;
};

function CommentSection({
  comment,
  setComment,
  handleComment,
}: CommentSectionProps) {
  return (
    <div className="my-5 px-5 py-3 w-[95%] md:w-[80%] m-auto flex flex-col text-gray-800 text-center gap-y-3 rounded-lg border-2 border-gray-800">
      <label className="flex flex-col gap-y-1 w-full font-bold text-xl text-left">
        Commenting as
        <input
          placeholder="Black sheep #67"
          value={comment.user}
          onChange={(e) => setComment({ ...comment, user: e.target.value })}
          className="border-2 border-gray-800 bg-gray-300 rounded-lg px-4 py-2 text-base font-normal resize-none"
        />
      </label>
      <label className="flex flex-col gap-y-1 w-full font-bold text-xl text-left">
        <textarea
          placeholder="Yo, who made this quiz, why is it so peak? Bro imagine not being a black sheep"
          value={comment.text}
          onChange={(e) => setComment({ ...comment, text: e.target.value })}
          className="border-2 border-gray-800 bg-gray-300 rounded-lg px-4 py-2 text-base font-normal resize-none"
        />
      </label>
      {comment.user.trim().length > 0 && comment.text.trim().length > 0 && (
        <Btn text="Comment" onclick={handleComment} primary />
      )}
    </div>
  );
}

export default CommentSection;
