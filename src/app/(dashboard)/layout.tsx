"use client";

import React from "react";
import {
  Avatar,
  Button,
  ScrollShadow,
  Spacer,
  Tooltip,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "usehooks-ts";

import { sectionItems } from "@/components/shared/sidebar/sidebar-items";
import { cn } from "@/components/shared/sidebar/cn";

import Sidebar from "@/components/shared/sidebar/sidebar";
import Image from "next/image";
import { firebaseAuth } from "@/lib/firebase/client";
import { signOutAction } from "../(authentication)/authentication/actions";
import { useRouter } from "next/navigation";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const isCompact = isCollapsed || isMobile;

  const onToggle = React.useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const signOut = async () => {
    await firebaseAuth.signOut();
    await signOutAction();
    router.replace("/");
  };

  return (
    <div className="flex h-full w-full">
      <div
        className={cn(
          "relative sm:flex hidden h-screen w-72 flex-col !border-r-small border-divider p-6 transition-width",
          {
            "w-16 items-center px-2 py-6": isCompact,
          }
        )}
      >
        <div
          className={cn("flex items-center gap-3 px-3", {
            "justify-center gap-0": isCompact,
          })}
        >
          <div className="flex sm:h-14 sm:w-14 h-8 w-8 items-center justify-center rounded-full bg-foreground">
            <Image
              className="text-background"
              src="/logo.png"
              alt="logo"
              width={270}
              height={270}
              priority
            />
          </div>
          <span
            className={cn("text-lg font-bold uppercase opacity-100", {
              "w-0 opacity-0": isCompact,
            })}
          >
            Dashboard
          </span>
        </div>

        <ScrollShadow className="-mr-6 max-h-full pr-6">
          <Sidebar
            defaultSelectedKey="home"
            isCompact={isCompact}
            items={sectionItems}
          />
        </ScrollShadow>
        <div
          className={cn("mt-auto flex flex-col", {
            "items-center": isCompact,
          })}
        >
          <Tooltip content="Log Out" isDisabled={!isCompact} placement="right">
            <Button
              className={cn(
                "justify-start text-default-500 data-[hover=true]:text-foreground",
                {
                  "justify-center": isCompact,
                }
              )}
              isIconOnly={isCompact}
              startContent={
                isCompact ? null : (
                  <Icon
                    className="flex-none rotate-180 text-default-500"
                    icon="solar:minus-circle-line-duotone"
                    width={24}
                  />
                )
              }
              variant="light"
              onClick={() => signOut()}
            >
              {isCompact ? (
                <Icon
                  className="rotate-180 text-default-500"
                  icon="solar:minus-circle-line-duotone"
                  width={24}
                />
              ) : (
                "Log Out"
              )}
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="w-full flex-1 flex-col p-4">
        <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
          <Button isIconOnly size="sm" variant="light" onPress={onToggle}>
            <Icon
              className="text-default-500"
              height={24}
              icon="solar:sidebar-minimalistic-outline"
              width={24}
            />
          </Button>
          <h2 className="text-medium font-medium text-default-700">Overview</h2>
        </header>
        <main className="mt-4 h-[90%] w-full overflow-visible">
          <div className="flex h-full w-full flex-col gap-4 rounded-medium border-small border-divider">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
