import DashboardCard from "../DashboardCard";
import Link from "next/link";
import Image from "next/image";

export default async function TiktokWidget() {
  return (
    <DashboardCard>
      <Link
        href="/tiktok"
        className="sm:w-60 w-32 hover:scale-125 transition-all duration-300 ease-in-out"
      >
        <Image src="/icons/tiktok.png" alt="Tiktok" width={400} height={400} />
      </Link>
    </DashboardCard>
  );
}
