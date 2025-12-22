"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { calendarEvents } from "@/lib/data";

const localizer = momentLocalizer(moment);

function BigCalendar() {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      style={{
        height: "98%",
        borderRadius: "10px",
      }}
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      view={view}
      views={["work_week", "day"]}
      onView={handleOnChangeView}
      defaultDate={new Date(2025, 10, 10)}
    />
  );
}

export default BigCalendar;
