import React from 'react';

export const DateTimeComponent = ({ dateTime }: { dateTime: string }) => {
  // Split the dateTime string into date and time parts
  const [date, timeWithZone] = dateTime.split('T');
  // Optionally, remove the timezone information if you don't need to display it
  const time = timeWithZone.split('-')[0];

  return (
    <div>
      <div>
        Date: <span className="pl-2 font-semibold">{date}</span>
      </div>
      <div>
        Time: <span className="pl-2 font-semibold">{time}</span>
      </div>
    </div>
  );
};
