const { getFirestore } = require("firebase-admin/firestore");
import { firebaseServerApp } from "@/lib/firebase/server";
import DashboardCard from "../DashboardCard";
import Link from "next/link";
import Image from "next/image";

export default async function YoutubeWidget() {
  return (
    <DashboardCard>
      <Link
        href="/youtube"
        className="sm:w-60 w-32 hover:scale-125 transition-all duration-300 ease-in-out"
      >
        <Image
          src="/icons/youtube.png"
          alt="Youtube"
          width={400}
          height={400}
        />
      </Link>
    </DashboardCard>
  );
}
