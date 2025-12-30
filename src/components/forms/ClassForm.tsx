"use client";
import { createClass, updateClass } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

function ClassForm({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: string;
  data?: Partial<ClassSchema>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(classSchema),
    defaultValues:
      type === "update"
        ? {
            id: data?.id,
            name: data?.name,
            capacity: data?.capacity,
            gradeId: data?.gradeId,
            supervisorId: data?.supervisorId,
          }
        : {},
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<ClassSchema> = (formData) => {
    setError(false);
    setSuccess(false);

    startTransition(async () => {
      const res =
        type === "update"
          ? await updateClass(formData)
          : await createClass(formData);

      if (res?.success) {
        toast.success(
          type === "update" ? "Sinf yangilandi!" : "Sinf yaratildi!"
        );
        setOpen(false);
        router.refresh();
      } else {
        setError(true);
        toast.error("Xatolik yuz berdi!");
      }
    });
  };
  const { teachers = [], grades = [] } = relatedData ?? {};

  return (
    <div>
      <form className="flex flex-col gap-8 " onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create a new class" : "Update a class"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4  p-1">
          <div className="flex flex-col  space-y-2 flex-1">
            <label className="text-gray-400 text-md">Name</label>
            <input
              type="text"
              className="ring-[1.5px] rounded-md py-1 px-2"
              {...register("name")}
            />
            {errors.name?.message && (
              <span className="text-red-500 text-sm">
                {errors.name.message.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2 flex-1">
            <label className="text-gray-400 text-md">Sig’im</label>
            <input
              type="text"
              className="ring-[1.5px] rounded-md py-1 px-2"
              {...register("capacity")}
            />
            {errors.capacity?.message && (
              <span className="text-red-500 text-sm">
                {errors.capacity.message.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2 flex-1">
            <label className="text-gray-400 text-md hidden">Password</label>
            <input
              hidden
              type="password"
              className="ring-[1.5px] rounded-md py-1 px-2"
              {...register("id")}
            />
            {errors.id?.message && (
              <span className="text-red-500 text-sm">
                {errors.id.message.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full ">
            <label className="text-gray-400 text-md">SuperVisor</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("supervisorId")}
              defaultValue={data?.supervisorId}
            >
              {teachers.map(
                (teacher: { id: string; name: string; surname: string }) => (
                  <option
                    value={teacher.id}
                    key={teacher.id}
                    selected={data && teacher.id === data.supervisorId}
                  >
                    {teacher.name + " " + teacher.surname}
                  </option>
                )
              )}
            </select>
            {errors.supervisorId?.message && (
              <p className="text-xs text-red-400">
                {errors.supervisorId.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full ">
            <label className="text-gray-400 text-md">Grade</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("gradeId")}
              defaultValue={data?.gradeId}
            >
              {grades.map((grade: { id: number; level: number }) => (
                <option
                  value={grade.id}
                  key={grade.id}
                  selected={data && grade.id === data.gradeId}
                >
                  {grade.level}
                </option>
              ))}
            </select>
            {errors.gradeId?.message && (
              <p className="text-xs text-red-400">
                {errors.gradeId.message.toString()}
              </p>
            )}
          </div>
        </div>

        <button className=" bg-green-500 rounded-md mt-4 text-white px-3 py-2">
          {type === "update" ? <span>Update</span> : <span>Create</span>}
        </button>
      </form>
    </div>
  );
}

export default ClassForm;
