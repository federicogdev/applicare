"use server";

import { prisma } from "@/lib/prisma";
import { JobApplicationValidationType } from "@/lib/validations/job-application.validation";
import { currentUser } from "@clerk/nextjs";
import { JobApplication } from "@prisma/client";

export const createJobApplication = async (
  formData: JobApplicationValidationType
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { company, description, position, priority, status, type, location } =
    formData;

  await prisma.jobApplication.create({
    data: {
      userId: user.id,
      company,
      description,
      position,
      location,
      priority: priority,
      status: status,
      type: type,
    },
  });
};

export const deleteJobApplication = async (id: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.jobApplication.delete({ where: { id, userId: user.id } });
};
