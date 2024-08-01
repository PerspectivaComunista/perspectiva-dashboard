import { Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { type SidebarItem } from "./sidebar";

/**
 * Please check the https://nextui.org/docs/guide/routing to have a seamless router integration
 */

export const sectionItems: SidebarItem[] = [
  {
    key: "overview",
    title: "Overview",
    items: [
      {
        key: "home",
        href: "/",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "articles",
        href: "/articles",
        icon: "bx:bx-book-open",
        title: "Articole",
      },
      {
        key: "media",
        href: "/media",
        icon: "bx:bx-movie",
        title: "Media",
      },
    ],
  },
];
