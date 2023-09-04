import { CreateForm } from "@/components/forms/create-form";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const CreatePage = async () => {
  const user = await currentUser();

  if (!user) return null;
  return (
    <>
      <h1 className="font-bold text-2xl">Create new Job Application</h1>
      <p className="text-muted-foreground">
        Fill out the form below to add a new Job Application to your collection
      </p>
      <CreateForm userId={user.id} />
    </>
  );
};

export default CreatePage;
