import { SignedIn, UserButton } from "@clerk/nextjs";
import { Blinds } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between px-6 py-3">
      <Link href="/" className="flex items-center gap-4">
        <Blinds size={30} />
        <p className="font-bold text-xl max-xs:hidden">Applicare</p>
      </Link>

      <div className="flex items-center gap-2">
        <SignedIn>
          <UserButton
            appearance={{
              variables: {
                colorPrimary: "#0ea5e9",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};
