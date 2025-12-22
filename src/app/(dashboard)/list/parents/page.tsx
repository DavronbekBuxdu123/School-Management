import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { parentsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { IoEye } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";

type Parent = {
  id: number;
  name: string;
  email?: string;
  students: string[];
  phone: string;
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student Names",
    accessor: "students",
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

const ParentListPage = () => {
  const renderRow = (item: Parent) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.students.join(",")}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/parents/${item.id}`}>
            <div className="w-7 h-7 flex items-center justify-center rounded-full ">
              {/* <MdEdit className="text-blue-950" size={20} /> */}
              {role == "admin" && (
                <FormModal type="update" data={item} table="parent" />
              )}
            </div>
          </Link>

          <div className="w-7 h-7 flex items-center justify-center rounded-full ">
            {/* <MdDelete className="text-red-500" size={20} /> */}
            {role == "admin" && (
              <FormModal type="delete" id={item.id} table="parent" />
            )}
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
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
                {role === "admin" && <FormModal type="create" table="parent" />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={parentsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ParentListPage;
