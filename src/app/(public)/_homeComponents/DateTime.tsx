import React from 'react';
import { format, parseISO } from 'date-fns';

export const DateTimeComponent = ({ dateTime }: { dateTime: string }) => {
  const date = parseISO(dateTime);
  const formattedDate = format(date, "EEE, MMM do 'at' h:mma");

  return (
    <div>
      <span className=" text-lg text-orange-500 font-semibold">{formattedDate}</span>
    </div>
  );
};
