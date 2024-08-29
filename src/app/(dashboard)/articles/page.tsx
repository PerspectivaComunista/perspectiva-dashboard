const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");
import { firebaseServerApp } from "@/lib/firebase/server";
import DashboardTable from "@/components/dashboard/DashboardTable";
import formatDate from "@/utils/functions/formatIsoString";
import { DeleteArticleButton } from "@/components/articles/DeleteArticleButton";
import { cookies } from "next/headers";
import { Metadata } from "next";
import capitalizeString from "@/utils/functions/capitalizeString";
import Article from "@/utils/types/article";
import { getAuthors } from "./actions";
import { EditArticleButton } from "@/components/articles/EditArticleButton";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Perspectiva Comunista - Articole",
};

const getArticles = async (): Promise<Article[]> => {
  const db = getFirestore(firebaseServerApp);
  const response = await db.collection("articles").get();
  const articles = response.docs.map((doc: any) => doc.data()) as Article[];
  articles.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return articles;
};

export default async function Page() {
  const articles = await getArticles();
  const authors = await getAuthors();

  const rows = articles.map((article) => ({
    key: article.id,
    title: article.title,
    author: authors.find((author) => author.id === article.author)?.fullName,
    createdAt: article.createdAt,
    actions: (
      <div className="flex justify-end gap-2">
        <EditArticleButton article={article} />
        <DeleteArticleButton id={article.id} />
      </div>
    ),
  }));

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "author",
      label: "Author",
    },
    {
      key: "createdAt",
      label: "Created At",
    },
    {
      key: "actions",
      label: "",
    },
  ];
  return (
    <div
      className={
        "animate-appearance-in mx-auto my-[40px] max-w-[1000px] rounded-xl bg-white px-5 py-3 shadow-xl"
      }
    >
      <h3 className="text-md mt-4 font-medium">
        Total: {articles.length}{" "}
        {articles.length === 1 ? "articol" : "articole"}
      </h3>
      <DashboardTable rows={rows} columns={columns} />
    </div>
  );
}
