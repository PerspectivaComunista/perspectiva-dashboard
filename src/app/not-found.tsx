import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pagina nu a fos gasita...",
};

const Logo = require("@/assets/logo-round.png");

export default function NotFound() {
  return (
    <main className="isolate min-h-full my-8">
      <div className="mx-auto max-w-7xl px-6 py-28 text-center lg:px-8">
        <div className="mx-auto w-fit -mt-20">
          <Image src={Logo} alt="Logo" width={200} height={200} />
        </div>
        <p className="text-6xl py-10 text-red font-black leading-8">404</p>
        <h1 className="text-3xl font-bold tracking-tight text-black sm:text-5xl">
          Pagina nu a fost gasita
        </h1>
        <div className="mt-10 flex justify-center">
          <Link href="/" className="text-xl font-semibold leading-7 text-black">
            <span aria-hidden="true">&larr;</span> Acasa
          </Link>
        </div>
      </div>
    </main>
  );
}
