import { JobApplication } from "@prisma/client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LatestJobApplicationsCard } from "./cards/latest-job-application-card";

type LatestJobApplicationsPanelProps = {
  latestJobApplications: JobApplication[];
};

export const LatestJobApplicationsPanel = ({
  latestJobApplications,
}: LatestJobApplicationsPanelProps) => {
  return (
    <Card className="col-span-1 lg:overflow-scroll lg:h-[65vh]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Job Applications</CardTitle>
        <CardTitle className="text-sky-500 underline">
          <Link href="/jobs">See More</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {latestJobApplications.map((jobApplication) => (
          <LatestJobApplicationsCard jobApplication={jobApplication} />
        ))}
      </CardContent>
    </Card>
  );
};
