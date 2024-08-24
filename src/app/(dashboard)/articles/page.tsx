import ArticlesTable from "@/components/dashboard/articles/ArticlesTable";
import { firebaseServerApp } from "@/lib/firebase/server";
import { Article } from "@/utils/types/article";
import React from "react";

const getArticles = async (): Promise<Article[]> => {
  const { getFirestore } = require("firebase-admin/firestore");
  const db = getFirestore(firebaseServerApp);
  const response = await db.collection("articles").get();
  const articles = response.docs.map((doc: any) => doc.data()) as Article[];
  articles.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return articles;
};

const getAuthors = async (): Promise<Author[]> => {
  const { getFirestore } = require("firebase-admin/firestore");
  const db = getFirestore(firebaseServerApp);
  const response = await db.collection("authors").get();
  const authors = response.docs.map((doc: any) => doc.data()) as Author[];

  return authors;
};

export default async function page() {
  const articles = await getArticles();
  const authors = await getAuthors();

  return (
    <div>
      <ArticlesTable articles={articles} authors={authors} />
    </div>
  );
}
