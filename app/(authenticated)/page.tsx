import { LatestJobApplicationsPanel } from "@/components/latest-job-applications-panel";
import { prisma } from "@/lib/prisma";
import { currentUser, useAuth } from "@clerk/nextjs";
import React from "react";

const HomePage = async () => {
  const user = await currentUser();

  if (!user) return null;

  const latestJobApplications = await prisma.jobApplication.findMany({
    where: { userId: user.id },
    take: 10,
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="flex-1 space-y-4">
      {/* MonthlyCards */}
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        {/* Chart */}
        <LatestJobApplicationsPanel
          latestJobApplications={latestJobApplications}
        />
      </div>
    </div>
  );
};

export default HomePage;
