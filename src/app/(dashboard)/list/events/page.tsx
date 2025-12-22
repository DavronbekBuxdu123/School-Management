import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";

import { eventsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";

type Event = {
  id: number;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const EventListPage = () => {
  const renderRow = (item: Event) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td className="hidden md:table-cell">{item.startTime}</td>
      <td className="hidden md:table-cell">{item.endTime}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <div className="w-7 h-7 flex items-center justify-center rounded-full ">
              {/* <MdEdit className="text-blue-950" size={20} /> */}
              {role === "admin" && (
                <FormModal type="update" table="event" data={item} />
              )}
            </div>
          </Link>

          <div className="w-7 h-7 flex items-center justify-center rounded-full ">
            {/* <MdDelete className="text-red-500" size={20} /> */}
            {role === "admin" && (
              <FormModal type="delete" table="event" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
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
                {role === "admin" && <FormModal type="create" table="event" />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={eventsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default EventListPage;
