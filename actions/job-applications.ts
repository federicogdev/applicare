"use server";

import { prisma } from "@/lib/prisma";
import { JobApplicationValidationType } from "@/lib/validations/job-application.validation";
import { currentUser } from "@clerk/nextjs";

export const createJobApplication = async (
  formData: JobApplicationValidationType
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  const { company, description, position, priority, status, type, location } =
    formData;

  return prisma.jobApplication.create({
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
