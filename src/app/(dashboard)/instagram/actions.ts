"use server";

import uploadFileToStorage from "@/utils/functions/uploadFileToStorage";

async function updateInstagramPostAction({
  data,
  id,
  createdAt,
}: {
  data: FormData;
  id: string;
  createdAt: string;
}) {
  const { firebaseServerApp } = require("@/lib/firebase/server");
  const { getFirestore } = require("firebase-admin/firestore");
  const { getStorage } = require("firebase-admin/storage");
  const db = getFirestore(firebaseServerApp);
  const storage = getStorage(firebaseServerApp);
  const imageFile = data.get("image") as File;
  const url = data.get("url") as string;
  let imageUrl = data.get("imageUrl") as string | null;

  const docRef = db.collection("instagram").doc();

  if (imageFile) {
    const bucket = storage.bucket("gs://perspectiva-7a032.appspot.com");
    const downloadURL = await uploadFileToStorage(imageFile, bucket, docRef.id);
    imageUrl = downloadURL;
  }

  await db
    .collection("instagram")
    .doc(id)
    .update({
      createdAt,
      id,
      imageUrl: imageUrl ?? null,
      url: url ?? null,
    });
}

async function createInstagramPostAction({ data }: { data: FormData }) {
  const { getFirestore } = require("firebase-admin/firestore");
  const { getStorage } = require("firebase-admin/storage");
  const { firebaseServerApp } = require("@/lib/firebase/server");
  const db = getFirestore(firebaseServerApp);
  const storage = getStorage(firebaseServerApp);
  const docRef = db.collection("instagram").doc();

  const imageFile = data.get("image") as File;
  const url = data.get("url") as string;

  let imageUrl = null;

  if (imageFile) {
    const bucket = storage.bucket("gs://perspectiva-7a032.appspot.com");
    const downloadURL = await uploadFileToStorage(imageFile, bucket, docRef.id);
    imageUrl = downloadURL;
  }

  await docRef.set({
    imageUrl: imageUrl ?? null,
    url: url ?? null,
    createdAt: new Date().toISOString(),
    id: docRef.id,
  });
}

async function deleteInstagramPostAction({ id }: { id: string }) {
  const { getFirestore } = require("firebase-admin/firestore");
  const { firebaseServerApp } = require("@/lib/firebase/server");
  const db = getFirestore(firebaseServerApp);
  await db.collection("instagram").doc(id).delete();
}

export {
  updateInstagramPostAction,
  deleteInstagramPostAction,
  createInstagramPostAction,
};