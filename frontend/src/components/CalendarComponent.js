import React, { useEffect, useState } from "react";
import { Calendar as RBCalendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
  const [events] = useState([]);
  const [view, setView] = useState(Views.MONTH);

  return (
    <div style={{ height: "90vh" }}>
      <RBCalendar
        localizer={localizer}
        events={events}
        view={view}
        onView={(v) => {
          console.log("onView fired ->", v);
          setView(v);
        }}
        defaultView={Views.MONTH}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
      />
    </div>
  );
}
