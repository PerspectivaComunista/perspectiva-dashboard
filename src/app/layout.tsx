import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import "../assets/globals.css";
import { Toaster } from "sonner";

const inter = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Perspectiva Comunista",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light text-foreground bg-gray-100">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster expand richColors />
      </body>
    </html>
  );
}
