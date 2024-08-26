import { CreateInstagramButton } from "@/components/instagrams/CreateInstagramButton";
import { EditInstagramPostButton } from "@/components/instagrams/EditInstagramButton";
import PaginationControls from "@/components/shared/Pagination";
import { firebaseServerApp } from "@/lib/firebase/server";

interface Instagram {
  imageUrl: string;
  url: string;
  id: string;
  createdAt: string;
}

const getInstagramPosts = async (): Promise<Instagram[]> => {
  const { getFirestore } = require("firebase-admin/firestore");
  const db = getFirestore(firebaseServerApp);
  const response = await db.collection("instagram").get();
  const instagrams = response.docs.map((doc: any) => doc.data()) as Instagram[];
  instagrams.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return instagrams;
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const posts = await getInstagramPosts();

  const page = searchParams["page"] ?? "1";
  const perPage = searchParams["per_page"] ?? "12";

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  const entries = posts.slice(start, end);
  return (
    <main className="max-w-screen-xl mx-auto p-3 mb-10 ">
      <h2 className="text-4xl font-black py-8 text-center">
        Postări Instagram
      </h2>
      <div className="ml-auto text-end pb-4">
        <CreateInstagramButton />
      </div>

      <div className="sm:grid flex flex-col lg:grid-cols-4 md:grid-cols-3 w-full sm:grid-cols-2 gap-4 justify-items-center justify-between items-center mb-20">
        {entries.map((post: Instagram) => (
          <EditInstagramPostButton instagram={post} key={post.id} />
        ))}
      </div>
      {posts.length > 12 && (
        <PaginationControls
          hasNextPage={end < posts.length}
          hasPrevPage={start > 0}
          length={posts.length}
          url="/instagram"
        />
      )}
    </main>
  );
}
