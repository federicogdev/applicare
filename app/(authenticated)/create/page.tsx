import { CreateForm } from "@/components/forms/create-form";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const CreatePage = async () => {
  const user = await currentUser();

  if (!user) return null;
  return (
    <>
      <h1 className="font-bold text-xl">Create new Job Application</h1>
      <CreateForm userId={user.id} />
    </>
  );
};

export default CreatePage;
