import React from "react";
import Link from "next/link";
import Image from "next/image";

import Instagram from "@/assets/instagram.png";
import Tiktok from "@/assets/tiktok.png";
import Youtube from "@/assets/youtube.png";

export default function page() {
  return (
    <main className="max-w-screen-xl mx-auto p-3 mb-10">
      <div className="text-center my-10">
        <h2 className="font-black text-8xl">Media</h2>
        <p className="font-normal text-2xl text-gray-600">
          Postări de pe alte platforme
        </p>

        <div className="m-auto flex sm:flex-row flex-col items-center justify-between my-20 gap-10">
          <Link
            href="/media/instagram"
            className="sm:w-60 w-32 hover:scale-125 transition-all duration-300 ease-in-out"
          >
            <Image src={Instagram} alt="Instagram" width={400} height={400} />
          </Link>

          <Link
            href="/media/tiktok"
            className="sm:w-60 w-32 hover:scale-125 transition-all duration-300 ease-in-out"
          >
            <Image src={Tiktok} alt="Facebook" width={400} height={400} />
          </Link>

          <Link
            href="/media/youtube"
            className="sm:w-60 w-32 hover:scale-125 transition-all duration-300 ease-in-out"
          >
            <Image src={Youtube} alt="Facebook" width={400} height={400} />
          </Link>
        </div>
      </div>
    </main>
  );
}
