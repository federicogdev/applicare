import { IComment } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";

type CommentCardProps = {
  comment: IComment;
};

export const CommentCard = async ({ comment }: CommentCardProps) => {
  const user = await currentUser();

  if (!user) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.imageUrl} alt="Avatar" />
          <AvatarFallback>
            {user.firstName?.charAt(0)} {user.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-md font-bold leading-none">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            {user.emailAddresses[0].emailAddress}
          </p>
        </div>
        <div className="ml-auto font-sm">
          {format(comment.createdAt, "dd MMM yyyy")}
        </div>
      </div>

      <div className="flex items-center">
        <div className="h-10 w-10" />
        <div className="ml-4 space-y-1">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {comment.text}
          </p>
        </div>
      </div>
    </div>
  );
};
