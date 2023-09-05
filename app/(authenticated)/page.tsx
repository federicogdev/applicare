import { getMonthlyJobApplications } from "@/actions/job-applications";
import { MonthlyJobApplicationCard } from "@/components/cards/monthly-job-application-card";
import { LatestJobApplicationsPanel } from "@/components/latest-job-applications-panel";
import { MonthlyJobApplicationsPanel } from "@/components/monthly-job-applications-panel";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

const HomePage = async () => {
  const user = await currentUser();

  if (!user) return null;

  const latestJobApplications = await prisma.jobApplication.findMany({
    where: { userId: user.id },
    take: 10,
    orderBy: { updatedAt: "desc" },
  });

  const monthlyJobApplications = await getMonthlyJobApplications();

  return (
    <div className="flex-1 space-y-4">
      <MonthlyJobApplicationsPanel
        monthlyApplications={monthlyJobApplications}
      />
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        <LatestJobApplicationsPanel
          latestJobApplications={latestJobApplications}
        />
      </div>
    </div>
  );
};

export default HomePage;
