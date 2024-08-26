"use server";
import { FieldValue } from "firebase-admin/firestore";

async function updateUserAction({
  id,
  email,
  name,
  surname,
  phone,
}: {
  id: string;
  email?: string;
  name: string;
  surname: string;
  phone: string;
}) {
  const { firebaseServerApp } = require("@/lib/firebase/server");
  const { getFirestore } = require("firebase-admin/firestore");
  const { getAuth } = require("firebase-admin/auth");
  const db = getFirestore(firebaseServerApp);
  const auth = getAuth(firebaseServerApp);

  await auth.updateUser(id, { email });
  await db.collection("users").doc(id).update({
    id,
    email,
    name,
    surname,
    phone,
  });
}

async function createUserAction({
  email,
  name,
  surname,
  phone,
}: {
  email: string;
  name: string;
  surname: string;
  phone: string;
}) {
  const { getAuth } = require("firebase-admin/auth");
  const { getFirestore } = require("firebase-admin/firestore");
  const { firebaseServerApp } = require("@/lib/firebase/server");
  const auth = getAuth(firebaseServerApp);
  const db = getFirestore(firebaseServerApp);

  const user = await auth.createUser({ email, emailVerified: true });
  await db.collection("users").doc(user.uid).set({
    email,
    name,
    surname,
    phone,
    created_at: FieldValue.serverTimestamp(),
    id: user.uid,
  });
}

async function deleteUserAction({ id }: { id: string }) {
  const { getAuth } = require("firebase-admin/auth");
  const { getFirestore } = require("firebase-admin/firestore");
  const { firebaseServerApp } = require("@/lib/firebase/server");
  const db = getFirestore(firebaseServerApp);
  const auth = getAuth(firebaseServerApp);
  await auth.deleteUser(id);
  await db.collection("users").doc(id).delete();
}

export { updateUserAction, deleteUserAction, createUserAction };
