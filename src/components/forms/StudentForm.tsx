"use client";
import React, { Dispatch, SetStateAction, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createStudent, updateStudent } from "@/lib/actions";
import { toast } from "react-toastify";
export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  parentId: z.string().min(1, { message: "Parent Id is required!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

function StudentForm({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: string;
  data?: Partial<StudentSchema>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      id: data?.id ? String(data.id) : undefined,
      username: data?.username || "",
      name: data?.name || "",
      surname: data?.surname || "",
      email: data?.email || "",
      phone: data?.phone || "",
      address: data?.address || "",
      bloodType: data?.bloodType || "",
      birthday: data?.birthday ? new Date(data.birthday) : undefined,
      sex: data?.sex || "MALE",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<StudentSchema> = (formData) => {
    startTransition(async () => {
      const res =
        type === "update"
          ? await updateStudent(formData)
          : await createStudent(formData);

      if (res.success) {
        toast.success(
          type === "update" ? "Student yangilandi!" : "Student yaratildi!"
        );
        setOpen(false);
        router.refresh();
      } else {
        toast.error("Xatolik yuz berdi");
      }
    });
  };

  const { grades, classes } = relatedData;

  return (
    <div>
      <form className="flex flex-col gap-8 " onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create a new student" : "Update the student"}
        </h1>
        <span className="text-xs text-gray-400 font-medium">
          Authentication Information
        </span>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4  p-1">
          <div className="flex flex-col  space-y-2 flex-1">
            <label className="text-gray-400 text-md">Username</label>
            <input
              type="text"
              className="ring-[1.5px] rounded-md py-1 px-2 text-black"
              {...register("username")}
            />
            {errors.username?.message && (
              <span className="text-red-500 text-sm">
                {errors.username.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2 flex-1">
            <label className="text-gray-400 text-md">Email</label>
            <input
              type="text"
              className="ring-[1.5px] rounded-md py-1 px-2 text-black"
              {...register("email")}
            />
            {errors.email?.message && (
              <span className="text-red-500 text-sm">
                {errors.email.message.toString()}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2 flex-1">
            <label className="text-gray-400 text-md">Password</label>
            <input
              type="password"
              className="ring-[1.5px] rounded-md py-1 px-2 text-black"
              {...register("password")}
            />
            {errors.password?.message && (
              <span className="text-red-500 text-sm">
                {errors.password.message.toString()}
              </span>
            )}
          </div>
        </div>
        <div>
          <span className="text-gray-400 text-md">Personal Information</span>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3  gap-4 mt-4 p-1 ">
            <div className="flex flex-col  space-y-2 flex-1">
              <label className="text-gray-400 text-md">FirstName</label>
              <input
                type="text"
                className="ring-[1.5px] rounded-md py-1 px-2 text-black"
                {...register("name")}
              />
              {errors.name?.message && (
                <span className="text-red-500 text-sm">
                  {errors.name.message.toString()}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2 flex-1">
              <label className="text-gray-400 text-md">LastName</label>
              <input
                type="text"
                className="ring-[1.5px] rounded-md py-1 px-2 text-black"
                {...register("surname")}
              />
              {errors.surname?.message && (
                <span className="text-red-500 text-sm">
                  {errors.surname.message.toString()}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2 flex-1">
              <label className="text-gray-400 text-md">Phone</label>
              <input
                type="text"
                className="ring-[1.5px] rounded-md py-1 px-2 text-black"
                {...register("phone")}
              />
              {errors.phone?.message && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message.toString()}
                </span>
              )}
            </div>
          </div>
          <div className="  mt-4 grid grid-cols-1 md:grid-cols-1 gap-4 lg:grid-cols-3  p-1">
            <div className="flex flex-col  space-y-2 flex-1">
              <label className="text-gray-400 text-md">Address</label>
              <input
                type="text"
                className="ring-[1.5px] rounded-md py-1 px-2 text-black"
                {...register("address")}
              />
              {errors.address?.message && (
                <span className="text-red-500 text-sm">
                  {errors.address.message.toString()}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2 flex-1">
              <label className="text-gray-400 text-md">BloodType</label>
              <input
                type="text"
                className="ring-[1.5px] rounded-md py-1 px-2 text-black"
                {...register("bloodType")}
              />
              {errors.bloodType?.message && (
                <span className="text-red-500 text-sm">
                  {errors.bloodType.message.toString()}
                </span>
              )}
            </div>
            <input type="hidden" {...register("id")} />
            <div className="flex flex-col space-y-2 flex-1">
              <label className="text-gray-400 text-md">Data of birth</label>
              <input
                type="date"
                className="ring-[1.5px] rounded-md py-1 px-2 text-black"
                {...register("birthday")}
              />
              {errors.birthday?.message && (
                <span className="text-red-500 text-sm">
                  {errors.birthday.message.toString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 p-1">
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Sex</label>
              <select
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                {...register("sex")}
                defaultValue={data?.sex}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              {errors.sex?.message && (
                <p className="text-xs text-red-400">
                  {errors.sex.message.toString()}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Grade</label>
              <select
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                {...register("gradeId")}
                defaultValue={data?.gradeId}
              >
                {grades.map((grade: { id: number; level: number }) => (
                  <option value={grade.id} key={grade.id}>
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
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Class</label>
              <select
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                {...register("classId")}
                defaultValue={data?.classId}
              >
                {classes.map(
                  (classItem: {
                    id: number;
                    name: string;
                    capacity: number;
                    _count: { students: number };
                  }) => (
                    <option value={classItem.id} key={classItem.id}>
                      ({classItem.name} -{" "}
                      {classItem._count.students + "/" + classItem.capacity}{" "}
                      Capacity)
                    </option>
                  )
                )}
              </select>
              {errors.classId?.message && (
                <p className="text-xs text-red-400">
                  {errors.classId.message.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className=" bg-green-500 rounded-md mt-4 text-white px-3 py-2"
        >
          {type === "update" ? <span>Update</span> : <span>Create</span>}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
