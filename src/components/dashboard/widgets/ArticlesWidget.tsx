const { getFirestore } = require("firebase-admin/firestore");
import { firebaseServerApp } from "@/lib/firebase/server";
import DashboardCard from "../DashboardCard";
import Link from "next/link";
import Image from "next/image";
import DashboardCardTable from "../DashboardCardTable";
import Article from "@/utils/types/article";
import { getAuthors } from "@/app/(dashboard)/articles/actions";

export const revalidate = 0;

const getArticles = async (): Promise<Article[]> => {
  const db = getFirestore(firebaseServerApp);
  const response = await db.collection("articles").get();
  const articles = response.docs.map((doc: any) => doc.data()) as Article[];
  articles.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return articles;
};

export default async function ArticlesWidget() {
  const articles = await getArticles();
  const authors = await getAuthors();

  const rows = articles.slice(0, 5).map((article) => ({
    key: article.id,
    title: article.title,
    author: authors.find((author) => author.id === article.author)?.fullName,
  }));

  const columns = [
    {
      key: "title",
      label: "Titlu",
    },
    {
      key: "author",
      label: "Autor",
    },
  ];
  return (
    <DashboardCard large>
      <Link href="/articles" className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <h3 className="text-md font-medium">Articole</h3>
          <small className="text-xs text-gray-400">
            {articles.length} {articles.length === 1 ? "articol" : "articole"}
          </small>
        </div>
        <Image src="/icons/forward.png" alt="forward" width={36} height={36} />
      </Link>
      <DashboardCardTable rows={rows} columns={columns} />
    </DashboardCard>
  );
}
