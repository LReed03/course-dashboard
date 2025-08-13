import React, { useState } from "react";
import { Calendar as RBCalendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
  const [events] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());   

  return (
    <div style={{ height: "90vh" }}>
      <RBCalendar
        localizer={localizer}
        events={events}
        view={view}
        onView={setView}
        date={date}                                
        onNavigate={(newDate ) => {
          setDate(newDate);                        
        }}
        defaultView={Views.MONTH}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        toolbar={true}
      />
    </div>
  );
}
