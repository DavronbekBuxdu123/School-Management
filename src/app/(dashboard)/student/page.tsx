import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import NewsComponent from "@/components/NewsComponent";
import React from "react";

function StudentPage() {
  return (
    <div className="p-4 flex flex-col gap-4 lg:flex-row">
      <div className="w-full lg:w-2/3 bg-white rounded-lg p-4">
        <div>
          <h1 className="text-lg font-semibold">Class (9A)</h1>
        </div>
        <div>
          <BigCalendarContainer id="studentId" type="classId" />
        </div>
      </div>
      <div className="w-full lg:w-1/3 bg-white flex flex-col gap-8 ">
        <div className="">
          <EventCalendar />
          <NewsComponent />
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
