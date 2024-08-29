"use server";

import createSlug from "@/utils/functions/createSlug";
import uploadFileToStorage from "@/utils/functions/uploadFileToStorage";
import Author from "@/utils/types/author";

async function updateArticlePostAction({
  data,
  id,
  writeText,
  author,
}: {
  data: FormData;
  id: string;
  writeText: string;
  author: string;
}) {
  const { firebaseServerApp } = require("@/lib/firebase/server");
  const { getFirestore } = require("firebase-admin/firestore");
  const { getStorage } = require("firebase-admin/storage");
  const db = getFirestore(firebaseServerApp);
  const storage = getStorage(firebaseServerApp);
  const docRef = db.collection("articles").doc();

  const imageFile = data.get("image") as File;
  let coverUrl = data.get("coverUrl") as string | null;
  const title = data.get("title") as string;

  if (imageFile) {
    const bucket = storage.bucket("gs://ro-wolfdigitalmedia-byzuu.appspot.com");
    const downloadURL = await uploadFileToStorage(imageFile, bucket, docRef.id);
    coverUrl = downloadURL;
  }

  await db
    .collection("articles")
    .doc(id)
    .update({
      coverUrl: coverUrl ?? null,
      title,
      author,
      text: writeText,
      slug: createSlug(title),
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
  const docRef = db.collection("articles").doc();

  const imageFile = data.get("image") as File;
  const title = data.get("title") as string;

  let imageUrl = null;

  if (imageFile) {
    const bucket = storage.bucket("gs://perspectiva-7a032.appspot.com");
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
  await db.collection("articles").doc(id).delete();
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
