import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username 3 belgidan kam bo'lmasligi kerak!" })
    .max(20, { message: "Username 20 ta belgidan kam bo'lmasligi kerak!" }),
  email: z.string().email({ message: "Email xato kiritildi!" }),
  password: z
    .string()
    .min(8, { message: "Parol 8 ta belgidan kam bo'lmasligi kerak!" }),
  firstname: z
    .string()
    .min(1, { message: "First Name talablarga javob bermaydi!" }),
  lastname: z
    .string()
    .min(1, { message: "Last Name talablarga javob bermaydi!" }),
  phone: z.string().min(1, { message: "Phone talablarga javob bermaydi!" }),
  address: z.string().min(1, { message: "Address talablarga javob bermaydi!" }),
  BloodType: z
    .string()
    .min(1, { message: "BloodType talablarga javob bermaydi!" }),
  birthday: z.date({ message: "Birthday talablarga javob bermaydi!" }),
  AAA: z.enum(["male", "female"], { message: "AAA talablarga javob bermaydi" }),
  img: z.instanceof(File, { message: "Img talablarga javob bermaydi!" }),
});
type Inputs = z.infer<typeof schema>;

function StudentForm({ type }: { type: string }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div>
      <form className="flex flex-col gap-8 " onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-semibold">Create a New Student</h1>
        <span className="text-gray-400 text-md">
          Authentification Information
        </span>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4  p-1">
          <div className="flex flex-col  space-y-2 flex-1">
            <label className="text-gray-400 text-md">Username</label>
            <input
              type="text"
              className="ring-[1.5px] rounded-md py-1 px-2"
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
              className="ring-[1.5px] rounded-md py-1 px-2"
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
              className="ring-[1.5px] rounded-md py-1 px-2"
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
                className="ring-[1.5px] rounded-md py-1 px-2"
                {...register("firstname")}
              />
              {errors.firstname?.message && (
                <span className="text-red-500 text-sm">
                  {errors.firstname.message.toString()}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2 flex-1">
              <label className="text-gray-400 text-md">LastName</label>
              <input
                type="text"
                className="ring-[1.5px] rounded-md py-1 px-2"
                {...register("lastname")}
              />
              {errors.lastname?.message && (
                <span className="text-red-500 text-sm">
                  {errors.lastname.message.toString()}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2 flex-1">
              <label className="text-gray-400 text-md">Phone</label>
              <input
                type="password"
                className="ring-[1.5px] rounded-md py-1 px-2"
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
                className="ring-[1.5px] rounded-md py-1 px-2"
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
                className="ring-[1.5px] rounded-md py-1 px-2"
                {...register("BloodType")}
              />
              {errors.BloodType?.message && (
                <span className="text-red-500 text-sm">
                  {errors.BloodType.message.toString()}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2 flex-1">
              <label className="text-gray-400 text-md">Data of birth</label>
              <input
                type="password"
                className="ring-[1.5px] rounded-md py-1 px-2"
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
              <div className="space-y-2">
                <label className="text-xs text-gray-500">AAA</label>
                <select
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                  {...register("AAA")}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.AAA?.message && (
                  <p className="text-xs text-red-400">
                    {errors.AAA.message.toString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-1/4 justify-center">
              <div>
                {" "}
                <label
                  className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                  htmlFor="img"
                >
                  <Image src="/upload.png" alt="" width={28} height={28} />
                  <span>Upload a photo</span>
                </label>
                <input
                  type="file"
                  id="img"
                  {...register("img")}
                  className="hidden"
                />
                {errors.img?.message && (
                  <p className="text-xs text-red-400">
                    {errors.img.message.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button className=" bg-green-500 rounded-md mt-4 text-white px-3 py-2">
          {type === "update" ? <span>Update</span> : <span>Create</span>}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
