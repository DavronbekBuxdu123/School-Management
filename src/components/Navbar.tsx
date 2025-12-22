import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <div className="flex items-center justify-end lg:justify-between px-4">
      {/* SEARCH BAR */}
      <div className="hidden lg:flex ring-1 ring-gray-400 rounded-full px-2 py-1 items-center justify-center">
        <Image src="/search.png" alt="search" width={20} height={20} />
        <input
          className="px-2 outline-none bg-transparent"
          type="text"
          placeholder="Search..."
        />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 p-4">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" alt="messages" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image
            src="/announcement.png"
            alt="messages"
            width={30}
            height={30}
          />
          <div className="absolute w-[18px] h-[18px] -top-3 -right-3 bg-purple-500 rounded-full text-white flex items-center justify-center text-xs p-1">
            2
          </div>
        </div>
        <div className="">
          <p className="font-bold text-md line-clamp-1">Dava Dev</p>
          <p className="text-sm text-end">Admin</p>
        </div>
        <div>
          <Image
            className="rounded-full"
            src="/avatar.png"
            alt="avatar"
            width={35}
            height={35}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
