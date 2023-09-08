"use server";

import { prisma } from "@/lib/prisma";
import { JobApplicationValidationType } from "@/lib/validations/job-application.validation";
import { currentUser } from "@clerk/nextjs";
import {
  JobApplication,
  JobPriority,
  JobStatus,
  JobType,
} from "@prisma/client";
import {
  eachDayOfInterval,
  format,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import { revalidatePath } from "next/cache";

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

interface IJobsByDay {
  [day: string]: {
    pending: number;
    declined: number;
    interview: number;
  };
}

interface IJobsWeekly {
  date: string;
  pending: number;
  declined: number;
  interview: number;
}

interface IJobApplication {
  id: string;
  userId: string;
  company: string;
  location: string;
  position: string;
  status: JobStatus;
  type: JobType;
  priority: JobPriority;
  description: string;
  createdAt: Date;
  updatedAt: Date;
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
      priority,
      status,
      type,
    },
  });

  revalidatePath("/");
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

export const getWeeklyJobApplications = async (): Promise<IJobsWeekly[]> => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }
  const today = startOfDay(new Date());
  const oneWeekAgo = subDays(today, 6);
  const dates = eachDayOfInterval({ start: oneWeekAgo, end: today });

  try {
    const jobs = await prisma.jobApplication.findMany({
      where: {
        userId: user.id,
      },

      orderBy: { createdAt: "desc" },
    });

    const jobsByDay: IJobsByDay = {};
    for (const job of jobs) {
      const day = format(job.createdAt, "dd MMM yyyy");

      if (!jobsByDay[day]) {
        jobsByDay[day] = { pending: 0, declined: 0, interview: 0 };
      }

      switch (job.status) {
        case "PENDING":
          jobsByDay[day].pending += 1;
          break;
        case "DECLINED":
          jobsByDay[day].declined += 1;
          break;
        case "INTERVIEW":
          jobsByDay[day].interview += 1;
          break;
      }
    }

    const jobsByDays: IJobsWeekly[] = dates.map((date) => {
      const day = format(date, "dd MMM yyyy");
      const jobCounts = jobsByDay[day] || {
        pending: 0,
        declined: 0,
        interview: 0,
      };
      return {
        date: day,
        pending: jobCounts.pending || 0,
        declined: jobCounts.declined || 0,
        interview: jobCounts.interview || 0,
      };
    });

    return jobsByDays;
  } catch (error: any) {
    throw new Error(`Failed to fetch job applications: ${error.message}`);
  }
};

export const getJobApplicationById = async (
  id: string
): Promise<JobApplication> => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const jobApplication = await prisma.jobApplication.findUnique({
      where: { id, userId: user.id },
      include: { comments: { select: { text: true, createdAt: true } } },
    });

    if (user.id !== jobApplication?.userId) {
      throw new Error(`Failed to fetch ${id} application`);
    }

    return jobApplication;
  } catch (error: any) {
    throw new Error(
      `Failed to fetch ${id} Job application with: ${error.message}`
    );
  }
};

export const editJobApplication = async (
  id: string,
  formData: JobApplicationValidationType
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { company, description, position, priority, status, type, location } =
    formData;

  await prisma.jobApplication.update({
    where: { id: id, userId: user.id },
    data: {
      company,
      description,
      position,
      location,
      priority,
      status,
      type,
    },
  });

  // revalidatePath("/");
};

export const createComment = async (jobApplicationId: string, text: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const jobApplication = await prisma.jobApplication.findUnique({
    where: { id: jobApplicationId },
  });

  if (!jobApplication) {
    throw new Error("Job application not found");
  }

  // Create the comment
  const comment = await prisma.comment.create({
    data: {
      userId: user.id,
      jobApplicationId,
      text,
    },
  });
};
