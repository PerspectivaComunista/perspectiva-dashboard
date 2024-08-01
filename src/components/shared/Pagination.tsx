"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SetStateAction, useState } from "react";

const PaginationControls = ({
  hasNextPage,
  hasPrevPage,
  length,
  url,
}: {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  length: number;
  url: string;
}) => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("per_page") ?? "12";
  const totalPages = Math.ceil(length / Number(perPage));
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      {hasPrevPage && (
        <Link href={`${url}?page=${Number(page) - 1}&per_page=${perPage}`}>
          <ChevronLeftIcon className="w-8 h-8 text-black" />
        </Link>
      )}

      {/* <div>
        {page} / {Math.ceil(length / Number(perPage))}
      </div> */}
      {[...Array(totalPages)].map((_, i) => (
        <Link
          href={`${url}?page=${
            i + 1 === Number(page) ? i + 1 : i + 1
          }&per_page=${perPage}`}
          key={i} // Adaugă `key` aici
        >
          <button
            className={
              "px-4 py-1 transition-all rounded-md duration-300 ease-in-out text-xl " +
              (i + 1 === Number(page)
                ? " border border-black text-white bg-red"
                : "text-black border border-black hover-bg-red hover:text-white")
            }
          >
            {i + 1}
          </button>
        </Link>
      ))}

      {hasNextPage && (
        <Link href={`${url}?page=${Number(page) + 1}&per_page=${perPage}`}>
          <ChevronRightIcon className="w-8 h-8 text-black" />
        </Link>
      )}
    </div>
  );
};

export default PaginationControls;
