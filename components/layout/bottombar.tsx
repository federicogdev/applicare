"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, Home, List, Plus } from "lucide-react";

import React from "react";

const links = [
  { icon: <Home />, route: "/", label: "Home" },
  { icon: <Plus />, route: "/create", label: "Create" },
  { icon: <List />, route: "/jobs", label: "All Jobs" },
];

export const Bottombar = () => {
  const pathname = usePathname();
  return (
    <section className="fixed bottom-0 z-10 w-full rounded-t-3xl p-4  xs:px-7 md:hidden">
      <div className="flex items-center justify-around gap-3 xs:gap-5">
        {links.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex flex-col items-center gap-2 rounded-lg p-2 ${
                isActive && "bg-sky-500"
              }`}
            >
              {link.icon}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
