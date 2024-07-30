import PharmaciesWidget from "@/components/dashboard/widgets/PharmaciesWidget";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Suspense } from "react";
import NotificationsWidget from "@/components/dashboard/widgets/NotificationsWidget";
import ObjectivesWidget from "@/components/dashboard/widgets/ObjectivesWidget";
import OffersWidget from "@/components/dashboard/widgets/OffersWidget";
import MyAccountWidget from "@/components/dashboard/widgets/MyAccountWidget";
import AgentsWidget from "@/components/dashboard/widgets/AgentsWidget";
import AdminsWidget from "@/components/dashboard/widgets/AdminsWidget";
import DoctorsWidget from "@/components/dashboard/widgets/DoctorsWidget";
import ManagersWidget from "@/components/dashboard/widgets/ManagersWidget";

export default async function Page() {
  return (
    <div className="my-[40px] max-w-[1000px] mx-auto flex flex-wrap gap-[20px] justify-center animate-appearance-in">
      <Suspense fallback={<DashboardCard isLoading />}>
        <MyAccountWidget />
      </Suspense>
    </div>
  );
}
