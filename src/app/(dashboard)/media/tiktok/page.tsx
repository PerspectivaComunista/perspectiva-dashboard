import Pagination from "@/components/shared/Pagination";
import { firebaseServerApp } from "@/lib/firebase/server";
import { CreateTiktokButton } from "@/components/dashboard/tiktok/CreateTiktokButton";
import { EditTiktokButton } from "@/components/dashboard/tiktok/EditTiktokButton";
import Post from "@/utils/types/post";

const getTiktoks = async (): Promise<Post[]> => {
  const { getFirestore } = require("firebase-admin/firestore");
  const db = getFirestore(firebaseServerApp);
  const response = await db.collection("tiktok").get();
  const objectives = response.docs.map((doc: any) => doc.data()) as Post[];
  objectives.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return objectives;
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const posts = await getTiktoks();

  const page = searchParams["page"] ?? "1";
  const perPage = searchParams["per_page"] ?? "12";

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  const entries = posts.slice(start, end);
  return (
    <main className="max-w-screen-xl mx-auto p-3 mb-10 ">
      <h2 className="text-4xl font-black py-8 text-center">Postări Tiktok</h2>
      <div className="ml-auto text-end pb-4">
        <CreateTiktokButton />
      </div>

      <div className="sm:grid flex flex-col lg:grid-cols-4 md:grid-cols-3 w-full sm:grid-cols-2 gap-4 justify-items-center justify-between items-center mb-20">
        {entries.map((post: Post) => (
          <EditTiktokButton tiktok={post} key={post.id} />
        ))}
      </div>
      {posts.length > 12 && (
        <Pagination
          hasNextPage={end < posts.length}
          hasPrevPage={start > 0}
          length={posts.length}
          url="/media/tiktok"
        />
      )}
    </main>
  );
}
