import { JobApplication } from "@prisma/client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type LatestJobApplicationsPanelProps = {
  latestJobApplications: JobApplication[];
};

export const LatestJobApplicationsPanel = ({
  latestJobApplications,
}: LatestJobApplicationsPanelProps) => {
  return (
    <div>
      <Card className="col-span-1 ">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Job Applications</CardTitle>
          <CardTitle className="text-sky-500 underline">
            <Link href="/jobs">See More</Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {latestJobApplications.map((el) => (
            <h1>Hello</h1>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
