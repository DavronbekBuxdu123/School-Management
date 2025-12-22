import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoEye } from "react-icons/io5";

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
function TeacherList() {
  const renderRow = (item: Teacher) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
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
      <td className="hidden md:table-cell">{item.teacherId}</td>
      <td className="hidden md:table-cell">{item.subjects.join(",")}</td>
      <td className="hidden md:table-cell">{item.classes.join(",")}</td>
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
              <FormModal table="teacher" type="delete" id={item.id} />
            )}
          </div>
        </div>
      </td>
    </tr>
  );
  return (
    <div className="bg-white rounded-lg p-4 m-4 mt-0 flex-1">
      {/* TOP */}
      <div className="flex  items-center justify-between">
        <div>
          <span className="text-md font-semibold hidden md:block">
            All Teachers
          </span>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full flex ring-1 ring-gray-400 rounded-full px-2 py-1 items-center justify-center">
            <Image src="/search.png" alt="search" width={20} height={20} />
            <input
              className="px-2 outline-none bg-transparent"
              type="text"
              placeholder="Search..."
            />
          </div>
          <div className="flex items-center gap-6 ">
            <div className="bg-orange-400 rounded-full w-8 h-8 flex items-center justify-center p-1 text-sm ">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </div>
            <div className="bg-orange-400 rounded-full w-8 h-8  flex items-center justify-center p-1 text-sm ">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </div>
            <div className="bg-orange-400 rounded-full w-8 h-8 flex items-center justify-center p-1 text-sm ">
              {/* <Image src="/plus.png" alt="filter" width={14} height={14} /> */}
              {role === "admin" && <FormModal type="create" table="teacher" />}
            </div>
          </div>
        </div>
      </div>
      {/* LIST */}
      <div>
        <Table columns={columns} renderRow={renderRow} data={teachersData} />
        {/* PAGINATION */}
      </div>
      {/* BOTTOM */}
      <div>
        <Pagination />
      </div>
    </div>
  );
}

export default TeacherList;
