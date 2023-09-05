import { currentUser } from "@clerk/nextjs";
import React from "react";

const JobApplicationDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const user = await currentUser();
  if (!user) return null;

  return (
    <>
      <div className="flex max-md:flex-col justify-between md:items-center">
        <h1 className="font-bold text-xl">{params.id}</h1>
      </div>
    </>
  );
};

export default JobApplicationDetailsPage;
