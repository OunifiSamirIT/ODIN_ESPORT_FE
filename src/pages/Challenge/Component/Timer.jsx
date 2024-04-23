import React, { useState, useEffect } from 'react';

const Timer = ({ startDate, endDate , setExpired }) => {
  const [remainingTime, setRemainingTime] = useState();
  // Calculate the remaining time between the current time and the end date
  function calculateRemainingTime() {
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    const start = new Date(startDate).getTime();
    let distance;
    if (now < start) {
      // If current time is before the start date, calculate remaining time until start date
      distance = start - now;
    } else if (now > end) {
      // If current time is after the end date, return 0
      return 0;
    } else {
      // If current time is between start and end date, calculate remaining time until end date
      distance = end - now;
    }

    return distance;
  }

  // Update the remaining time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);
    if(remainingTime <= 0 ) {
        setExpired(true)
    }
    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [calculateRemainingTime]);

  // Convert milliseconds to days, hours, and minutes
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className='text-wrap'>
      {remainingTime > 0 ? (
        <p>
          {days} Jours {hours} Heures {minutes} Minutes restant
        </p>
      ) : (
        <p>Challenge terminer 🥳</p>
      )}
    </div>
  );
};

export default Timer;