import { IComment } from "@/types";
import { CommentCard } from "./cards/comment-card";

type CommentsProps = {
  comments: IComment[];
};

export const Comments = ({ comments }: CommentsProps) => {
  return (
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <CommentCard key={index} comment={comment} />
      ))}
    </div>
  );
};
