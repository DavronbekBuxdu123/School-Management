import Image from "next/image";
import Link from "next/link";
import NewsComponent from "@/components/NewsComponent";
import Performance from "@/components/Performance";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { Teacher } from "@prisma/client";
import FormContainer from "@/components/FormContainer";

const SingleTeacherPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });

  if (!teacher) {
    return notFound();
  }
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-[#52a1f0]  py-6 px-6 rounded-md flex-1 flex gap-4 text-white">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>

            <div className="w-2/3 flex flex-col  gap-4">
              <div className="flex items-center space-x-5">
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-semibold">{teacher.name}</h1>
                </div>
                <div>
                  <FormContainer table="teacher" type="update" data={teacher} />
                </div>
              </div>
              <p className="text-sm line-clamp-3">
                Tajribali va mas’uliyatli o‘qituvchi. O‘quvchilarning bilim
                darajasini oshirish va ularning qiziqishini rivojlantirishga
                yo‘naltirilgan zamonaviy ta’lim usullaridan foydalanadi.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{teacher.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  {new Intl.DateTimeFormat("en-GB").format(teacher.birthday)}
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{teacher.email}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{teacher.phone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[45%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Davomat</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[45%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher._count.subjects}
                </h1>
                <span className="text-sm text-gray-400">Fanlari</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[45%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher._count.lessons}
                </h1>
                <span className="text-sm text-gray-400">Darslari</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[45%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher._count.classes}
                </h1>
                <span className="text-sm text-gray-400">Sinflari</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>O’qituvchining dars jadvali</h1>
          <BigCalendarContainer type="teacherId" id={"teacher1"} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Bo’limlar</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/classes?supervisorId=${"teacher2"}`}
            >
              O’qituvchining sinflari
            </Link>
            <Link
              className="p-3 rounded-md bg-purple-200"
              href={`/list/students?teacherId=${"teacher2"}`}
            >
              O’qituvchining o’quvchilari
            </Link>
            <Link
              className="p-3 rounded-md bg-purple-200"
              href={`/list/lessons?teacherId=${"teacher2"}`}
            >
              O’qituvchining darslari
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/exams?teacherId=${"teacher2"}`}
            >
              O’qituvchining imtihonlari
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-200"
              href={`/list/assignments?teacherId=${"teacher2"}`}
            >
              O’qituvchining vazifalari
            </Link>
          </div>
        </div>
        <Performance />
        <NewsComponent />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
