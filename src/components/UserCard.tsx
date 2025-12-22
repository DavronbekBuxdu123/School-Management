import Image from "next/image";
import React from "react";

function UserCard({ type }: { type: string }) {
  return (
    <div className="min-w-[130px]  odd:bg-slate-400 even:bg-orange-300 rounded-2xl p-4 flex-1 space-y-3">
      <div className="flex items-center justify-between">
        <span className="bg-white px-2 py-1 text-sm rounded-xl text-green-500 ">
          2024/25
        </span>
        <Image src="/more.png" alt="more" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold">1234</h1>
      <h2 className="capitalize  text-sm font-medium text-gray-500">{type}</h2>
    </div>
  );
}

export default UserCard;
