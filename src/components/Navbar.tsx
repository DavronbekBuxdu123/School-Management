import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const user = await currentUser();
  console.log(user);
  const role = user?.publicMetadata.role as string;
  return (
    <div className="flex items-center justify-end lg:justify-between px-4">
      {/* SEARCH BAR */}
      <div className=""></div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 p-4">
        <Link href="/list/announcements">
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
        </Link>
        <div className="">
          <p className="font-bold text-md line-clamp-1">{role}</p>
          <p className="text-sm text-end">{role}</p>
        </div>
        <div>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
