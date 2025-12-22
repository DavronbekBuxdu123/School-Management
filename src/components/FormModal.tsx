"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// import TeacherFrom from "./forms/TeacherFrom";
// import StudentForm from "./forms/StudentForm";
const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherFrom type={type} />,
  student: (type, data) => <StudentForm type={type} />,
};
const TeacherFrom = dynamic(() => import("./forms/TeacherFrom"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

function FormModal({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcements";
  type: "create" | "delete" | "update";
  data?: any;
  id?: number;
}) {
  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <div>
        {type === "delete" ? (
          <MdDelete
            onClick={() => setOpen(true)}
            className="text-red-500 cursor-pointer"
            size={20}
          />
        ) : type === "create" ? (
          <Image
            className="cursor-pointer"
            onClick={() => setOpen(true)}
            src="/plus.png"
            alt="filter"
            width={14}
            height={14}
          />
        ) : type === "update" ? (
          <FaRegEdit
            onClick={() => setOpen(true)}
            className="text-yellow-500 cursor-pointer"
            size={20}
          />
        ) : (
          ""
        )}
      </div>
      {open && (
        <div className="bg-black  top-0 left-0 container max-w-full fixed inset-0 overflow-y-auto bg-opacity-60 z-50 flex items-start lg:items-center  pt-5 pb-5 justify-center ">
          <div className="bg-white p-4 rounded-md relative   w-[90%] md:w-[50%]">
            <Form />
            <Image
              onClick={() => setOpen(false)}
              className="absolute top-3 right-2 cursor-pointer"
              src="/close.png"
              alt="close"
              width={14}
              height={14}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default FormModal;
