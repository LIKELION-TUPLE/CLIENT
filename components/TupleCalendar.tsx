import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import * as moment from 'moment';

// import 'react-calendar/dist/Calendar.css'; // css import

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const TupleCalendar = () => {
  const [date, setDate] = useState<Value>(new Date());

  useEffect(() => {
    console.log(date);
  }, []);
  return (
    <div>
      <Calendar
        locale="ko"
        onChange={setDate}
        formatDay={(locale, date) => moment(date).format('DD')}
        navigationLabel={null}
        showNeighboringMonth={false}
        value={date}
      />
    </div>
  );
};

export default TupleCalendar;
