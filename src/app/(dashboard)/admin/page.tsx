import AttendanceChart from "@/components/BarChartComp";

import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceCahrt";
import NewsComponent from "@/components/NewsComponent";
import UserCard from "@/components/UserCard";
import React from "react";

function AdminPage() {
  return (
    <div className="p-4 flex flex-col gap-4 md:flex-row ">
      <div className="w-full lg:w-2/3  ">
        <div className="flex gap-4 justify-between flex-wrap ">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>
        <div className=" ">
          <div className="lg:flex gap-4">
            <div className="w-full lg:w-1/3 mt-4 ">
              <CountChart />
            </div>
            <div className="w-full lg:w-2/3 h-[450px]  mt-4">
              <AttendanceChart />
            </div>
          </div>
          <div className="w-full h-[450px] mt-4">
            <FinanceChart />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3 ">
        <EventCalendar />
        <NewsComponent />
      </div>
    </div>
  );
}

export default AdminPage;
