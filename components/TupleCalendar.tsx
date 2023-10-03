import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import

const TupleCalendar = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <div>
      <Calendar onChange={() => setDate} value={date} />
    </div>
  );
};

export default TupleCalendar;
