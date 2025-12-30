"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubject, updateSubject } from "@/lib/actions";
import React, { Dispatch, SetStateAction, useTransition } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const Subjectschema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(3, { message: "Fan nomi 3 harfdan kam bo'lmasin!" }),
  teachers: z.array(z.string()),
});
type Inputs = z.infer<typeof Subjectschema>;

function SubjectForm({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: string;
  data?: Partial<Inputs>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(Subjectschema),
    defaultValues: {
      id: data?.id ?? undefined, // optional
      name: data?.name ?? "",
      teachers: data?.teachers ?? [], // string[]
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();
  const teachers = relatedData?.teachers || [];
  console.log(teachers);
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    setError(false);
    setSuccess(false);

    startTransition(async () => {
      const res =
        type === "update"
          ? await updateSubject({
              id: formData.id!,
              name: formData.name,
              teachers: formData.teachers,
            })
          : await createSubject({
              name: formData.name,
              teachers: formData.teachers,
            });

      if (res?.success) {
        toast.success(type === "update" ? "Fan yangilandi!" : "Fan yaratildi!");
        setOpen(false);
        router.refresh();
      } else {
        setError(true);
        toast.error("Xatolik yuz berdi!");
      }
    });
  };
  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-gray-500">Fan nomi</label>
        <input
          type="text"
          className="ring-1 rounded-md p-2"
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <label className="text-gray-500">O'qituvchilar</label>
        <select
          multiple
          {...register("teachers")}
          className="ring-1 p-2 rounded-md"
        >
          {teachers.map((t: any) => (
            <option key={t.id} value={String(t.id)}>
              {t.name} {t.surname}
            </option>
          ))}
        </select>
        {errors.teachers && (
          <p className="text-red-500">{errors.teachers.message}</p>
        )}

        {error && <span className="text-red-500">Something went wrong!</span>}
        <button
          type="submit"
          className="bg-green-500 text-white rounded-md px-3 py-2 mt-3"
        >
          {type === "update" ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default SubjectForm;
