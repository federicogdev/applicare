import React from "react";
import { MonthlyJobApplicationCard } from "@/components/cards/monthly-job-application-card";
import { AlignJustify, CalendarCheck, CircleOff, Clock1 } from "lucide-react";

interface IMonthlyApplications {
  declinedJobsCurrentMonth: number;
  declinedJobsPastMonth: number;
  pendingJobsPastMonth: number;
  pendingJobsCurrentMonth: number;
  interviewJobsCurrentMonth: number;
  interviewJobsPastMonth: number;
  totalJobsCurrentMonth: number;
  totalJobsPastMonth: number;
}

interface IMonthlyJobApplicationsPanelProps {
  monthlyApplications: IMonthlyApplications;
}
export const MonthlyJobApplicationsPanel = ({
  monthlyApplications,
}: IMonthlyJobApplicationsPanelProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MonthlyJobApplicationCard
        icon={() => (
          <div className="bg-sky-500 rounded-full p-2">
            <AlignJustify className="text-white" size={22} />
          </div>
        )}
        label="Total Job Applications"
        currentMonthApplication={monthlyApplications.totalJobsCurrentMonth}
        prevMonthApplication={monthlyApplications.totalJobsPastMonth}
      />

      <MonthlyJobApplicationCard
        icon={() => (
          <div className="bg-emerald-500 rounded-full p-2">
            <CalendarCheck className="text-white" size={22} />
          </div>
        )}
        label="Pending Confirmation"
        currentMonthApplication={monthlyApplications.pendingJobsCurrentMonth}
        prevMonthApplication={monthlyApplications.pendingJobsPastMonth}
      />
      <MonthlyJobApplicationCard
        icon={() => (
          <div className="bg-orange-500 rounded-full p-2">
            <Clock1 className="text-white" size={22} />
          </div>
        )}
        label="Scheduled for Interview"
        currentMonthApplication={monthlyApplications.interviewJobsCurrentMonth}
        prevMonthApplication={monthlyApplications.interviewJobsPastMonth}
      />
      <MonthlyJobApplicationCard
        icon={() => (
          <div className="bg-red-500 rounded-full p-2">
            <CircleOff className="text-white" size={22} />
          </div>
        )}
        label="Declined offers"
        currentMonthApplication={monthlyApplications.declinedJobsCurrentMonth}
        prevMonthApplication={monthlyApplications.declinedJobsPastMonth}
      />
    </div>
  );
};
