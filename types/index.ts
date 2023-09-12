import { JobPriority, JobStatus, JobType } from "@prisma/client";

export interface IJobMonthly {
  declinedJobsCurrentMonth: number;
  declinedJobsPastMonth: number;
  pendingJobsPastMonth: number;
  pendingJobsCurrentMonth: number;
  interviewJobsCurrentMonth: number;
  interviewJobsPastMonth: number;
  totalJobsCurrentMonth: number;
  totalJobsPastMonth: number;
}

export interface IJobsByDay {
  [day: string]: {
    pending: number;
    declined: number;
    interview: number;
  };
}

export interface IJobsWeekly {
  date: string;
  pending: number;
  declined: number;
  interview: number;
}

export interface IComment {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
}
export interface IJobApplication {
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
  comments: IComment[];
}
