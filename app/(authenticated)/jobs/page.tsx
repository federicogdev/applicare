import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const AllApplicationsPage = async () => {
  const user = await currentUser();

  if (!user) return null;

  const jobApplications = await prisma.jobApplication.findMany({
    where: { userId: user.id },
  });

  return (
    <>
      <div className="hidden h-full flex-1 flex-col md:flex space-y-10">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              Here is the list of all your job applications
            </p>
          </div>
        </div>
        <DataTable data={jobApplications} columns={columns} />
      </div>
    </>
  );
};

export default AllApplicationsPage;
