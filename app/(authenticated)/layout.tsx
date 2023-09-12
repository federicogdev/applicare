import { Sidebar } from "@/components/layout/sidebar";
import { TwIndicator } from "@/components/tw-indicator";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/navbar";
import { theme } from "@/lib/clerk-theme";
import { Separator } from "@/components/ui/separator";
import { Bottombar } from "@/components/layout/bottombar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Applicare",
    template: "%s | Applicare",
  },
  description: "The Job Application Tracker",

  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#0ea5e9" },
        elements: theme,
      }}
    >
      <html
        lang="en"
        className={cn(inter.className, "dark")}
        style={{ colorScheme: "dark" }}
      >
        <body className={`${inter.className} min-h-screen`}>
          <ThemeProvider>
            <Navbar />

            <main className="flex flex-row">
              <Sidebar />
              <section className="flex min-h-screen flex-1 flex-col items-center px-6 pb-10 pt-24 max-md:pb-32 sm:px-10">
                <div className="w-full">{children}</div>
              </section>
            </main>

            <Bottombar />
            <TwIndicator />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
