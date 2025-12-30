"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function TableSearch() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex ring-1 ring-gray-400 rounded-full px-2 py-1 items-center justify-center"
    >
      <Image src="/search.png" alt="search" width={20} height={20} />
      <input
        className="px-2 outline-none bg-transparent"
        type="text"
        placeholder="Qidirish..."
      />
    </form>
  );
}

export default TableSearch;
