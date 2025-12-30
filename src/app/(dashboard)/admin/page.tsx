import AttendanceChart from "@/components/BarChartComp";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceCahrt";
import NewsComponent from "@/components/NewsComponent";
import UserCard from "@/components/UserCard";
import React from "react";

const AdminPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className="p-4 flex flex-col gap-4 md:flex-row ">
      <div className="w-full lg:w-2/3  ">
        <div className="flex gap-4 justify-between flex-wrap ">
          <UserCard type="admin" />
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
        </div>
        <div className=" ">
          <div className="lg:flex gap-4">
            <div className="w-full lg:w-1/3 mt-4 ">
              <CountChartContainer />
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
        <EventCalendarContainer searchParams={searchParams} />
        <NewsComponent />
      </div>
    </div>
  );
};

export default AdminPage;
