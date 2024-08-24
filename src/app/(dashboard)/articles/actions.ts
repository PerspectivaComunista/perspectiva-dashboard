"use server";

async function updateAgentAction({
  id,
  email,
  firstName,
  lastName,
  role,
}: {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  role: string;
}) {
  const { firebaseServerApp } = require("@/lib/firebase/server");
  const { getFirestore } = require("firebase-admin/firestore");
  const { getAuth } = require("firebase-admin/auth");
  const db = getFirestore(firebaseServerApp);
  const auth = getAuth(firebaseServerApp);

  await auth.updateUser(id, { email });
  await db
    .collection("users")
    .doc(id)
    .update({
      email: email ?? null,
      firstName: firstName ?? null,
      lastName: lastName ?? null,
      role: role ?? null,
    });
}

async function createAgentAction({
  firstName,
  lastName,
  role,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
}) {
  const { getAuth } = require("firebase-admin/auth");
  const { getFirestore } = require("firebase-admin/firestore");
  const { firebaseServerApp } = require("@/lib/firebase/server");
  const auth = getAuth(firebaseServerApp);
  const db = getFirestore(firebaseServerApp);

  const user = await auth.createUser({
    email,
    password,
    emailVerified: true,
    firstName,
    lastName,
    role,
  });
  await db.collection("users").doc(user.uid).set({
    firstName,
    lastName,
    role,
    email,
    createdAt: new Date().toISOString(),
    id: user.uid,
  });
}

async function deleteAgentAction({ id }: { id: string }) {
  const { getAuth } = require("firebase-admin/auth");
  const { getFirestore } = require("firebase-admin/firestore");
  const { firebaseServerApp } = require("@/lib/firebase/server");
  const db = getFirestore(firebaseServerApp);
  const auth = getAuth(firebaseServerApp);
  await auth.deleteUser(id);
  await db.collection("users").doc(id).delete();
}

export { updateAgentAction, deleteAgentAction };
