const { getFirestore } = require("firebase-admin/firestore");
import Image from "next/image";
import { redirect } from "next/navigation";
import { firebaseServerApp } from "@/lib/firebase/server";
import { Article, Author } from "@/utils/types/article";
import Link from "next/link";

const getArticles = async (slug: string): Promise<Article> => {
  const db = getFirestore(firebaseServerApp);
  const response = await db
    .collection("articles")
    .where("slug", "==", slug)
    .get();
  const article = response.docs[0].data();

  return article;
};
const getAuthor = async (): Promise<Author[]> => {
  const db = getFirestore(firebaseServerApp);
  const response = await db.collection("authors").get();
  const authors = response.docs.map((doc: any) => doc.data()) as Author[];

  return authors;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticles(params.slug);
  const authors = await getAuthor();

  if (!article) {
    return redirect("/not-found");
  }

  return {
    title: `${article.title} - Perspectiva Comunistă`,
    description: article.text.slice(0, 160),
    openGraph: { images: article.coverUrl },
    twitter: {
      images: article.coverUrl,
    },
  };
}

export default async function page({ params }: { params: { slug: string } }) {
  const article = await getArticles(params.slug);
  const authors = await getAuthor();

  if (!article) {
    return redirect("/not-found");
  }

  return (
    <main className="max-w-screen-xl mx-auto p-3 mb-10">
      <Image
        src={article.coverUrl}
        alt="Posts"
        className="w-full h-fit mb-10 object-contain"
        width={400}
        height={400}
        priority
      />

      <div className="flex flex-col">
        <div className="flex gap-16">
          <div className="w-full">
            <div className="flex justify-between items-center mt-2 ">
              <h2 className="sm:text-6xl text-4xl font-black inline">
                {article.title}
              </h2>
            </div>
            <div className="mb-5">
              <div className="mt-2 flex items-center gap-x-4 sm:text-xs text-lg">
                <p className="text-gray-600 text-lg font-bold">
                  de {authors.find((e) => e.id === article.author)?.shortName}
                </p>
                <time
                  dateTime={article.createdAt}
                  className="text-gray-600 sm:text-base text-lg"
                >
                  {article.createdAt}
                </time>
                {/* <Link
                  href={"/category/" + article.category}
                  className=" relative z-10 rounded-full bg-red-200 sm:px-3 px-4 py-1.5 font-medium text-gray-700 hover:bg-red-300"
                >
                  {article.category}
                </Link> */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col lg:gap-16">
          <div
            className="article text-lg lg:mb-20 mb-10"
            dangerouslySetInnerHTML={{ __html: article.text }}
          />
        </div>
      </div>
    </main>
  );
}
