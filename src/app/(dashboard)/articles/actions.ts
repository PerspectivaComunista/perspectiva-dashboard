"use server";

import createSlug from "@/utils/functions/createSlug";
import uploadFileToStorage from "@/utils/functions/uploadFileToStorage";
import Author from "@/utils/types/author";

async function updateArticlePostAction({
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

  const docRef = db.collection("article").doc();

  if (imageFile) {
    const bucket = storage.bucket(
      "gs://perspectiva-7a032.appspot.com/articles"
    );
    const downloadURL = await uploadFileToStorage(imageFile, bucket, docRef.id);
    imageUrl = downloadURL;
  }

  await db
    .collection("article")
    .doc(id)
    .update({
      createdAt,
      id,
      imageUrl: imageUrl ?? null,
      url: url ?? null,
    });
}

async function createArticlePostAction({
  data,
  author,
  writeText,
}: {
  data: FormData;
  author: string;
  writeText: string;
}) {
  const { getFirestore } = require("firebase-admin/firestore");
  const { getStorage } = require("firebase-admin/storage");
  const { firebaseServerApp } = require("@/lib/firebase/server");
  const db = getFirestore(firebaseServerApp);
  const storage = getStorage(firebaseServerApp);
  const docRef = db.collection("article").doc();

  const imageFile = data.get("image") as File;
  const title = data.get("title") as string;

  let imageUrl = null;

  if (imageFile) {
    const bucket = storage.bucket(
      "gs://perspectiva-7a032.appspot.com/articles"
    );
    const downloadURL = await uploadFileToStorage(imageFile, bucket, docRef.id);
    imageUrl = downloadURL;
  }

  await docRef.set({
    coverUrl: imageUrl ?? null,
    title,
    author,
    text: writeText,
    createdAt: new Date().toISOString(),
    slug: createSlug(title),
    id: docRef.id,
  });
}

async function deleteArticlePostAction({ id }: { id: string }) {
  const { getFirestore } = require("firebase-admin/firestore");
  const { firebaseServerApp } = require("@/lib/firebase/server");
  const db = getFirestore(firebaseServerApp);
  await db.collection("article").doc(id).delete();
}

const getAuthors = async (): Promise<Author[]> => {
  const { getFirestore } = require("firebase-admin/firestore");
  const { firebaseServerApp } = require("@/lib/firebase/server");
  const db = getFirestore(firebaseServerApp);
  const response = await db.collection("authors").get();
  const instagrams = response.docs.map((doc: any) => doc.data()) as Author[];

  return instagrams;
};

export {
  updateArticlePostAction,
  deleteArticlePostAction,
  createArticlePostAction,
  getAuthors,
};
