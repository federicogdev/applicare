"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import { LogOut, Home, List, Plus } from "lucide-react";
import Link from "next/link";

const links = [
  { icon: <Home />, route: "/", label: "Home" },
  { icon: <Plus />, route: "/create", label: "Create" },
  { icon: <List />, route: "/jobs", label: "All Jobs" },
];

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();
  return (
    <section className="custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto pb-5 pt-28 max-md:hidden ">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {links.map((link) => {
          const activeLink =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                activeLink && "bg-sky-400"
              }`}
            >
              {link.icon}
              <p className="max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4 text-red-500">
              <LogOut />
              <p className="max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};
