import { getJobApplicationById } from "@/actions/job-applications";
import { Comments } from "@/components/comments";
import { CommentForm } from "@/components/forms/comment-form";
import { currentUser } from "@clerk/nextjs";

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
        <h1 className="font-bold text-xl">{JSON.stringify(jobApplication)}</h1>
        <CommentForm jobApplicationId={jobApplication.id} />
        <Comments comments={jobApplication.comments} />
      </div>
    </>
  );
};

export default JobApplicationDetailsPage;
