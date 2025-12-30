import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getUserRole } from "@/lib/utils";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoEye } from "react-icons/io5";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const { role, userId: currentUserId } = await getUserRole();
  const query: Prisma.TeacherWhereInput = {};
  const columns = [
    {
      header: "FIO",
      accessor: "info",
    },
    {
      header: "O’qituvchi ID",
      accessor: "teacherId",
      className: "hidden md:table-cell",
    },
    {
      header: "Fanlar",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },
    {
      header: "Sinflar",
      accessor: "classes",
      className: "hidden md:table-cell",
    },
    {
      header: "Telefoni",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Manzil",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Admin",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: TeacherList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={"/avatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">
        {item.subjects.map((item) => item.name).join(",")}
      </td>
      <td className="hidden md:table-cell">
        {item.classes.map((classItem) => classItem.name).join(",")}
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <div className="w-7 h-7 flex items-center justify-center rounded-full ">
              <IoEye className="text-blue-950" size={20} />
            </div>
          </Link>

          <div className="w-7 h-7 flex items-center justify-center rounded-full ">
            {/* <MdDelete className="text-red-500" size={20} /> */}
            {role === "admin" && (
              <FormContainer table="teacher" type="delete" id={item.id} />
            )}
          </div>
        </div>
      </td>
    </tr>
  );
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lessons = {
              some: {
                classId: parseInt(value),
              },
            };
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;

          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count({ where: query }),
  ]);

  return (
    <div className="bg-white rounded-lg p-4 m-4 mt-0 flex-1">
      {/* TOP */}
      <div className="flex  items-center justify-between">
        <div>
          <span className="text-md font-semibold hidden md:block">
            Barcha O’qituvchilar
          </span>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-8 items-center">
          <TableSearch />
          <div className="flex items-center gap-6 ">
            <div className="bg-orange-400 rounded-full w-8 h-8 flex items-center justify-center p-1 text-sm ">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </div>
            <div className="bg-orange-400 rounded-full w-8 h-8  flex items-center justify-center p-1 text-sm ">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </div>
            <div className="bg-orange-400 rounded-full w-8 h-8 flex items-center justify-center p-1 text-sm ">
              {/* <Image src="/plus.png" alt="filter" width={14} height={14} /> */}
              {role === "admin" && (
                <FormContainer type="create" table="teacher" />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* LIST */}
      <div>
        <Table columns={columns} renderRow={renderRow} data={data} />
        {/* PAGINATION */}
      </div>
      {/* BOTTOM */}
      <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default TeacherListPage;
