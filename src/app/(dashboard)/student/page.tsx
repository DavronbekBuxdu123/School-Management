import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import NewsComponent from "@/components/NewsComponent";
import { getUserRole } from "@/lib/utils";
import { redirect } from "next/navigation";
import React from "react";

const StudentPage = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { userId } = await getUserRole();
  if (!userId) redirect("/sign-in");
  return (
    <div className="p-4 flex flex-col gap-4 lg:flex-row">
      <div className="w-full lg:w-2/3 bg-white rounded-lg p-4">
        <div>
          <h1 className="text-lg font-semibold">Class (9A)</h1>
        </div>
        <div>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </div>
      <div className="w-full lg:w-1/3 bg-white flex flex-col gap-8 ">
        <div className="">
          <EventCalendarContainer searchParams={searchParams} />
          <NewsComponent />
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
