import React, { useState } from "react";
import { Calendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function BigCalendar(props){
    const localizer = momentLocalizer(moment);

    return(
        <div style={{ height: "90vh"}}>
            <Calendar {...props} localizer={localizer} events={[]} />
        </div>
    );
}

export default BigCalendar;