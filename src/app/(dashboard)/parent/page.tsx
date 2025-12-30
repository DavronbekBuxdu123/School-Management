import BigCalendarContainer from "@/components/BigCalendarContainer";

import NewsComponent from "@/components/NewsComponent";
import { getUserRole } from "@/lib/utils";
import React from "react";

const ParentPage = async () => {
  const { userId } = await getUserRole();
  return (
    <div className="p-4 flex flex-col gap-4 lg:flex-row flex-1">
      <div className="w-full lg:w-2/3 bg-white rounded-lg p-4">
        <div>
          <h1 className="text-lg font-semibold">Class (John Doe)</h1>
        </div>
        <div>
          <BigCalendarContainer id={userId!} type="classId" />
        </div>
      </div>
      <div className="w-full lg:w-1/3 bg-white flex flex-col gap-8 ">
        <NewsComponent />
      </div>
    </div>
  );
};

export default ParentPage;
