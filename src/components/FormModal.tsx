"use client";
import { deleteClass, deleteSubject, deleteTeacher } from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";

// import TeacherFrom from "./forms/TeacherFrom";
// import StudentForm from "./forms/StudentForm";
const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherFrom
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  class: (setOpen, type, data, relatedData) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};

const TeacherFrom = dynamic(() => import("./forms/TeacherFrom"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});

function FormModal({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const Form = () => {
    if (type === "delete" && id) {
      return (
        <div className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            Haqiqatdan ham jadvaldan shu {table} ni o’chirasizmi?
          </span>

          <button
            onClick={() => {
              startTransition(async () => {
                let res: { success: boolean } | undefined;
                switch (table) {
                  case "subject":
                    res = await deleteSubject({ id: Number(id) });
                    break;
                  case "class":
                    res = await deleteClass({ id: Number(id) });
                    break;
                  case "teacher":
                    res = await deleteTeacher({ id: id.toString() });
                    break;
                  case "student":
                    res = await deleteTeacher({ id: id.toString() });
                    break;

                  default:
                    break;
                }
                if (res?.success) {
                  router.refresh();
                  toast.success("Muvaffiqiyatli o’chirildi");
                  setOpen(false);
                } else {
                  toast.error("Xatolik yuz berdi");
                }
              });
            }}
            disabled={isPending}
            className="bg-red-700 text-white py-2 px-4 rounded-md self-center"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      );
    }

    if (type === "create" || type === "update") {
      return forms[table] ? (
        forms[table](setOpen, type, data, relatedData)
      ) : (
        <span>Form not found!</span>
      );
    }

    return <span>Form not found!</span>;
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
