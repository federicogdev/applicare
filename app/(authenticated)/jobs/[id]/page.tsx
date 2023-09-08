import { getJobApplicationById } from "@/actions/job-applications";
import { CommentForm } from "@/components/forms/comment-form";
import { currentUser } from "@clerk/nextjs";
import React from "react";

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
      <div className="">
        <h1 className="font-bold text-xl">{JSON.stringify(jobApplication)}</h1>
        <CommentForm jobApplicationId={jobApplication.id} />
      </div>
    </>
  );
};

export default JobApplicationDetailsPage;
