import React from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { CalendarCheck, Clock1, CircleOff, AlignJustify } from "lucide-react";
import { JobApplication, JobStatus } from "@prisma/client";

type LatestJobApplicationsCardProps = {
  jobApplication: JobApplication;
};

export const renderIcon = (status: JobStatus) => {
  switch (status) {
    case "PENDING":
      return (
        <div className="bg-emerald-500 rounded-full p-2">
          <CalendarCheck className="text-white" size={22} />
        </div>
      );

    case "INTERVIEW":
      return (
        <div className="bg-orange-500 rounded-full p-2">
          <Clock1 className="text-white" size={22} />
        </div>
      );

    case "DECLINED":
      return (
        <div className="bg-red-500 rounded-full p-2">
          <CircleOff className="text-white" size={22} />
        </div>
      );

    default:
      return (
        <div className="bg-sky-500 rounded-full p-2">
          <AlignJustify className="text-white" size={22} />
        </div>
      );
  }
};

export const LatestJobApplicationsCard = ({
  jobApplication,
}: LatestJobApplicationsCardProps) => {
  return (
    <div className="grid grid-cols-12 items-center">
      <div className=" col-span-8 flex overflow-hidden">
        {renderIcon(jobApplication.status)}
        <div className="ml-4 space-y-1 overflow-hidden">
          <p className="text-sm font-medium leading-none truncate">
            {jobApplication.position}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 truncate">
            {jobApplication.company}
          </p>
        </div>
      </div>
      <div className="flex-1 margin-auto col-span-4 font-medium text-sm text-neutral-600 dark:text-neutral-300 text-right">
        <p>
          {formatDistanceToNowStrict(new Date(jobApplication.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};
