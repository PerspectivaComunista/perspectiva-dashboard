import DashboardCard from "@/components/dashboard/DashboardCard";
import { Suspense } from "react";
import InstagramsWidget from "@/components/dashboard/widgets/InstagramsWidget";
import TiktokWidget from "@/components/dashboard/widgets/TiktokWidget";
import YoutubeWidget from "@/components/dashboard/widgets/YoutubeWidget";
import ArticlesWidget from "@/components/dashboard/widgets/ArticlesWidget";

export default async function Page() {
  return (
    <div className="my-[40px] max-w-[1000px] mx-auto flex flex-wrap gap-[20px] justify-center animate-appearance-in">
      <Suspense fallback={<DashboardCard isLoading />}>
        <InstagramsWidget />
      </Suspense>
      <Suspense fallback={<DashboardCard isLoading />}>
        <TiktokWidget />
      </Suspense>
      <Suspense fallback={<DashboardCard isLoading />}>
        <YoutubeWidget />
      </Suspense>
      <Suspense fallback={<DashboardCard isLoading large />}>
        <ArticlesWidget />
      </Suspense>
    </div>
  );
}
