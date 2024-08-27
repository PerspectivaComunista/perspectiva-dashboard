"use client";

import { Input } from "@nextui-org/input";
import { signInAction } from "./actions";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/client";
import PrimaryFormButton from "../../../components/shared/PrimaryFormButton";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const reset = () => {
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
  };

  async function signIn(formData: FormData) {
    reset();

    const email = formData.get("email") as string;
    if (!email) {
      setEmailErrorMessage("Adresa de email nu este validă.");
      return;
    }

    const password = formData.get("password") as string;
    if (!password) {
      setPasswordErrorMessage("Parola nu este validă.");
      return;
    }

    try {
      const credential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const token = await credential.user.getIdToken();
      if (!token) {
        await firebaseAuth.signOut();
        toast.error(
          "Am intampinat o eroare la procesul de autentificare. Te rugam sa incerci mai tarziu."
        );
      } else {
        const response = await signInAction(token);

        if (response.status !== 200) {
          await firebaseAuth.signOut();
          toast.error(response.message);
        }

        router.replace("/");
      }
    } catch (e: any) {
      console.log(e);
      if (
        e.code === "auth/user-not-found" ||
        e.code === "auth/wrong-password"
      ) {
        toast.error(
          "Nu am putut să te autentificăm cu datele introduse. Parola poate fi incorectă sau utilizatorul nu există."
        );
      } else if (e.code === "auth/too-many-requests") {
        toast.error(
          "Ai incercat sa te autentifici fara succes de prea multe ori. Te rugam sa incerci mai tarziu."
        );
      } else {
        toast.error(
          "Am intampinat o eroare la procesul de autentificare. Te rugam sa incerci mai tarziu."
        );
      }
      await firebaseAuth.signOut();
    }
  }

  return (
    <div className="h-screen max-w-2xl mx-auto flex justify-center items-center animate-appearance-in">
      <Card
        radius="lg"
        shadow="lg"
        className="w-full px-10 sm:px-20 pt-10 sm:pt-20 flex items-center h-screen sm:h-auto"
      >
        <Image src="/logo.png" alt="logo" width={270} height={270} priority />
        <form
          action={signIn}
          className="flex flex-col gap-4 mt-10 h-full w-full justify-center"
        >
          <Input
            name="email"
            type="email"
            label="Email"
            required
            size="md"
            radius="sm"
            errorMessage={emailErrorMessage}
            isInvalid={!!emailErrorMessage}
          />
          <Input
            name="password"
            type="password"
            label="Parola"
            required
            size="md"
            radius="sm"
            errorMessage={passwordErrorMessage}
            isInvalid={!!passwordErrorMessage}
          />
          <PrimaryFormButton />
        </form>
      </Card>
    </div>
  );
}
