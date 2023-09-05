"use server";

import { prisma } from "@/lib/prisma";
import { JobApplicationValidationType } from "@/lib/validations/job-application.validation";
import { currentUser } from "@clerk/nextjs";
import { startOfMonth, subMonths } from "date-fns";

interface IJobMonthly {
  declinedJobsCurrentMonth: number;
  declinedJobsPastMonth: number;
  pendingJobsPastMonth: number;
  pendingJobsCurrentMonth: number;
  interviewJobsCurrentMonth: number;
  interviewJobsPastMonth: number;
  totalJobsCurrentMonth: number;
  totalJobsPastMonth: number;
}

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

export const getMonthlyJobApplications = async (): Promise<IJobMonthly> => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const currentDate = new Date();

  const currentMonthStartDate = startOfMonth(currentDate);
  const previousMonthStartDate = subMonths(currentMonthStartDate, 1);

  try {
    const declinedJobsCurrentMonth = await prisma.jobApplication.count({
      where: {
        userId: user.id,
        status: "DECLINED",
        createdAt: { gte: currentMonthStartDate, lte: currentDate },
      },
    });

    const declinedJobsPastMonth = await prisma.jobApplication.count({
      where: {
        userId: user.id,
        status: "DECLINED",
        createdAt: { gte: previousMonthStartDate, lte: currentMonthStartDate },
      },
    });

    const pendingJobsCurrentMonth = await prisma.jobApplication.count({
      where: {
        userId: user.id,
        status: "PENDING",
        createdAt: { gte: currentMonthStartDate, lte: currentDate },
      },
    });

    const pendingJobsPastMonth = await prisma.jobApplication.count({
      where: {
        userId: user.id,
        status: "PENDING",
        createdAt: { gte: previousMonthStartDate, lte: currentMonthStartDate },
      },
    });

    const interviewJobsCurrentMonth = await prisma.jobApplication.count({
      where: {
        userId: user.id,
        status: "INTERVIEW",
        createdAt: { gte: currentMonthStartDate, lte: currentDate },
      },
    });

    const interviewJobsPastMonth = await prisma.jobApplication.count({
      where: {
        userId: user.id,
        status: "INTERVIEW",
        createdAt: { gte: previousMonthStartDate, lte: currentMonthStartDate },
      },
    });

    const totalJobsCurrentMonth = await prisma.jobApplication.count({
      where: {
        userId: user.id,
        createdAt: { gte: currentMonthStartDate, lte: currentDate },
      },
    });

    const totalJobsPastMonth = await prisma.jobApplication.count({
      where: {
        userId: user.id,
        createdAt: { gte: previousMonthStartDate, lte: currentMonthStartDate },
      },
    });

    return {
      declinedJobsCurrentMonth,
      declinedJobsPastMonth,
      pendingJobsPastMonth,
      pendingJobsCurrentMonth,
      interviewJobsCurrentMonth,
      interviewJobsPastMonth,
      totalJobsCurrentMonth,
      totalJobsPastMonth,
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch job applications: ${error.message}`);
  }
};
