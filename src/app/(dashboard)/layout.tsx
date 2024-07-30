import type { Metadata } from "next";
import AppbarComponent from "@/components/shared/AppbarComponent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      <AppbarComponent />
      {children}
    </div>
  );
}
