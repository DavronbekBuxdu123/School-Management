import prisma from "@/lib/prisma";
import Image from "next/image";
import React from "react";
type UserType = "admin" | "teacher" | "student" | "parent";
const UserCard = async ({ type }: { type: UserType }) => {
  const modelMap: Record<UserType, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };
  console.log(modelMap[type]);
  const data = await modelMap[type].count();
  return (
    <div className="min-w-[130px]  odd:bg-[#3f9cfb] even:bg-green-500 rounded-2xl p-4 flex-1 space-y-3">
      <div className="flex items-center justify-between">
        <span className="bg-white px-2 py-1 text-sm rounded-xl text-green-500 ">
          2025/26
        </span>
        <Image src="/more.png" alt="more" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold text-white">{data}</h1>
      <h2 className="capitalize  text-sm font-medium text-white">
        {type === "admin"
          ? "Admin"
          : type === "parent"
          ? "Ota-onalar"
          : type === "student"
          ? "O'quvchilar"
          : type === "teacher"
          ? "O'qituvchilar"
          : ""}
      </h2>
    </div>
  );
};

export default UserCard;
