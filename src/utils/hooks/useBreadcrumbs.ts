import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Breadcrumb = {
  path: string;
  label: string;
};

const dictionary: Record<string, string> = {
  "/": "Perspectiva Dashboard",
  "/admins": "Administratori",
  "/notifications": "Notificari",
  "/doctors": "Doctori",
  "/pharmacies": "Farmacii",
  "/agents": "Agenti",
  "/managers": "Manageri",
  "/objectives": "Obiective",
  "/offers": "Produsele lunii",
};

function useBreadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    const pathParts = pathname.split("/").filter((part) => part !== "");
    const breadcrumbs: Breadcrumb[] = [];

    pathParts.forEach((part, index) => {
      const path = `/${pathParts.slice(0, index + 1).join("/")}`;

      const label =
        dictionary[path] || part.charAt(0).toUpperCase() + part.slice(1);
      breadcrumbs.push({ path, label });
    });

    setBreadcrumbs(breadcrumbs);
  }, [pathname]);

  return breadcrumbs;
}

export default useBreadcrumbs;
