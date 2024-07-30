"use client";

import { Input } from "@nextui-org/input";
import { resetPasswordAction } from "../actions";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PrimaryFormButton from "@/components/shared/PrimaryFormButton";

export default function Page() {
  const router = useRouter();

  async function signIn(formData: FormData) {
    const email = formData.get("email") as string;
    if (!email) {
      toast.error("Te rugam sa introduci o adresa de email valida.");
      return;
    }

    try {
      await resetPasswordAction(email);
      router.replace("/authentication");
      toast.success(
        "Am trimis un email cu instructiuni pentru resetarea parolei."
      );
    } catch (e: any) {
      toast.error(
        "Am intampinat o eroare in procesul de resetare. Te rugam sa incerci mai tarziu."
      );
    }
  }

  return (
    <div className="h-screen max-w-2xl mx-auto flex justify-center items-center animate-appearance-in">
      <Card
        radius="lg"
        shadow="lg"
        className="w-full px-10 sm:px-20 flex items-center h-screen sm:h-auto"
      >
        <Image src="/logo.png" alt="logo" width={270} height={270} priority />
        <h3 className="mt-10 text-xl font-medium">Reseteaza parola</h3>
        <form
          action={signIn}
          className="flex flex-col gap-4 mt-10 mb-10 sm:mb-20 h-full w-full justify-center"
        >
          <Input
            name="email"
            type="email"
            label="Email"
            required
            size="md"
            radius="sm"
          />
          <PrimaryFormButton />
        </form>
      </Card>
    </div>
  );
}
