
import BigCalendarContainer from "@/components/BigCalendarContainer";

import NewsComponent from "@/components/NewsComponent";
import { getUserRole } from "@/lib/utils";
import React from "react";

const TeacherPage = async () => {
  const { userId } = await getUserRole();

  return (
    <div className="p-4 flex flex-col gap-4 lg:flex-row flex-1">
      <div className="w-full lg:w-2/3 bg-white rounded-lg p-4">
        <div>
          <h1 className="text-lg font-semibold">Class (9A)</h1>
        </div>
        <div>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </div>
      <div className="w-full lg:w-1/3 bg-white flex flex-col gap-8 ">
        <NewsComponent />
      </div>
    </div>
  );
};

export default TeacherPage;
