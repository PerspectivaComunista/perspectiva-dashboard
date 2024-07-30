"use client";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import useBreadcrumbs from "@/utils/hooks/useBreadcrumbs";
import CreateNotificationButton from "../notifications/CreateNotificationButton";
import PrimaryFormButton from "./PrimaryFormButton";
import { signOutAction } from "@/app/(authentication)/authentication/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { firebaseAuth } from "@/lib/firebase/client";
import { CreateAdminButton } from "../admins/CreateAdminButton";
import { CreatePharmacyButton } from "../pharmacies/CreatePharmacyButton";
import { CreateDoctorButton } from "../doctors/CreateDoctorButton";
import { CreateManagerButton } from "../managers/CreateManagerButton";
import { CreateObjectiveButton } from "../objectives/CreateObjectiveButton";
import { CreateOfferButton } from "../offers/CreateOfferButton";

export default function AppbarComponent() {
  const breadcrumbs = useBreadcrumbs();
  const router = useRouter();

  const signOut = async () => {
    await firebaseAuth.signOut();
    await signOutAction();
    router.replace("/");
  };

  return (
    <div>
      <div className="mx-auto w-full bg-white px-2 py-2 shadow-lg md:px-8">
        <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12 ">
          <div className="col-span-4 flex items-center justify-start gap-3">
            {breadcrumbs.some((x) => x.path.length > 1) ? (
              <Link href="/">
                <Image
                  src="/icons/forward.png"
                  alt="back"
                  width={36}
                  height={36}
                  priority
                  className="rotate-180"
                />
              </Link>
            ) : (
              <Image
                src="/icons/forward.png"
                alt="back"
                width={36}
                height={36}
                priority
                className="rotate-180 opacity-0"
              />
            )}
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image
                src="/logo.png"
                alt="logo"
                width={72}
                height={72}
                priority
              />
            </Link>
            <Breadcrumbs size="lg">
              {breadcrumbs.map((x, i) => {
                return (
                  <BreadcrumbItem href={x.path} key={i} className="font-medium">
                    {x.label}
                  </BreadcrumbItem>
                );
              })}
            </Breadcrumbs>
          </div>

          <div className="col-span-8 hidden items-center justify-end gap-2 md:flex">
            {breadcrumbs.some((x) => x.path === "/admins") && (
              <CreateAdminButton />
            )}
            {breadcrumbs.some((x) => x.path === "/pharmacies") && (
              <CreatePharmacyButton />
            )}
            {breadcrumbs.some((x) => x.path === "/doctors") && (
              <CreateDoctorButton />
            )}
            {breadcrumbs.some((x) => x.path === "/notifications") && (
              <CreateNotificationButton />
            )}
            {breadcrumbs.some((x) => x.path === "/managers") && (
              <CreateManagerButton />
            )}
            {breadcrumbs.some((x) => x.path === "/objectives") && (
              <CreateObjectiveButton />
            )}
            {breadcrumbs.some((x) => x.path === "/offers") && (
              <CreateOfferButton />
            )}

            <form action={signOut}>
              <PrimaryFormButton
                label="Deconecteaza-te"
                color="danger"
                size="md"
              />
            </form>
            <div className="w-[36px]" />
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-x-scroll md:hidden flex gap-2 pl-2">
        {breadcrumbs.some((x) => x.path === "/notifications") && (
          <CreateNotificationButton />
        )}

        <form action={signOut}>
          <PrimaryFormButton label="Deconecteaza-te" color="danger" size="md" />
        </form>
      </div>
    </div>
  );
}
