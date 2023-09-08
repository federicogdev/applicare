import { getJobApplicationById } from "@/actions/job-applications";
import { Comments } from "@/components/comments";
import { DeleteButton } from "@/components/delete-button";
import { CommentForm } from "@/components/forms/comment-form";
import { EditForm } from "@/components/forms/edit-form";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs";
import { TrashIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

const JobApplicationDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const user = await currentUser();
  if (!user) return null;

  const jobApplication = await getJobApplicationById(params.id);

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl">
              Here's your job application with iID {params.id}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300">
              Last updated:{" "}
              {format(jobApplication.updatedAt, "dd MMM yyyy, HH:MM:SS")}
            </p>
          </div>

          <DeleteButton jobApplicationid={jobApplication.id} />
        </div>
        <EditForm jobApplication={jobApplication} />
        <CommentForm jobApplicationId={jobApplication.id} />
        <Comments comments={jobApplication.comments} />
      </div>
    </>
  );
};

export default JobApplicationDetailsPage;
