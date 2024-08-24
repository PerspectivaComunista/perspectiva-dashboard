"use server";

const { getAuth } = require("firebase-admin/auth");
import { firebaseServerApp } from "@/lib/firebase/server";
import { cookies } from "next/headers";
import { getFirestore } from "firebase-admin/firestore";

export async function signInAction(token: string) {
  const auth = getAuth(firebaseServerApp);
  const firestore = getFirestore(firebaseServerApp);

  try {
    const decodedToken = await auth.verifyIdToken(token);
    let uid = decodedToken.uid;
    const userRef = firestore.collection("users").doc(uid);
    const user = await userRef.get();

    if (!user.exists) {
      return {
        message: "Utilizatorul nu are drepturi administrative.",
        status: 401,
      };
    }

    const sessionCookie = await auth.createSessionCookie(token, {
      expiresIn: 60 * 60 * 24 * 7 * 1000, // 7 days
    });

    cookies().set("__sessionPerspectiva", sessionCookie, {
      path: "/",
    });

    return { status: 200, message: "Sign in success." };
  } catch (error) {
    console.log(error);
    return {
      message: "Am intampinat o problema, va rugam incercati mai tarziu.",
      status: 401,
    };
  }
}

export async function resetPasswordAction(email: string) {
  const auth = getAuth(firebaseServerApp);

  try {
    await auth.sendPasswordResetEmail(email);
  } catch (error) {
    return { message: "Unable to send password reset email", status: 401 };
  }

  return { message: "Reset password success", status: 200 };
}

export async function signOutAction() {
  cookies().delete("__sessionPerspectiva");
  return { message: "Sign outsuccess", status: 200 };
}
