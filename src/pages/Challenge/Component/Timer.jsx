import React, { useState, useEffect } from 'react';
import { Context } from '../../../index';
const Timer = ({ startDate, endDate, setExpired }) => {
  const [remainingTime, setRemainingTime] = useState();
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context)


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
    if (remainingTime <= 0) {
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
    <div className='flex items-center w-full text-center  text-xs'>

      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_171_1894)">
          <path d="M0 6.66667V5.83333C0 3.53583 1.86917 1.66667 4.16667 1.66667H5V0.833333C5 0.373333 5.3725 0 5.83333 0C6.29417 0 6.66667 0.373333 6.66667 0.833333V1.66667H13.3333V0.833333C13.3333 0.373333 13.7058 0 14.1667 0C14.6275 0 15 0.373333 15 0.833333V1.66667H15.8333C18.1308 1.66667 20 3.53583 20 5.83333V6.66667H0ZM20 8.33333V15.8333C20 18.1308 18.1308 20 15.8333 20H4.16667C1.86917 20 0 18.1308 0 15.8333V8.33333H20ZM14.86 10.96C14.54 10.6292 14.0133 10.6192 13.6817 10.9383L9.72 14.7567C9.40667 15.07 8.88083 15.0933 8.52083 14.735L6.6225 12.9708C6.28667 12.6583 5.76 12.6758 5.445 13.0142C5.13167 13.3508 5.15083 13.8783 5.48833 14.1917L7.365 15.935C7.83667 16.4075 8.465 16.6675 9.1325 16.6675C9.8 16.6675 10.4292 16.4075 10.8892 15.9458L14.8392 12.1392C15.17 11.82 15.18 11.2908 14.86 10.96Z" fill="#1D1E21" />
        </g>
        <defs>
          <clipPath id="clip0_171_1894">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {remainingTime > 0 ? (
        <p className='ml-2'>
          {days} {
            getTranslation(
              `Days,`,  // -----> Englais
              `Jours,`, //  -----> Francais
              //   ``,  //  -----> Turkey
              //   `` ,  //  -----> Allemagne
            )

          }  {hours}  {
            getTranslation(
              `Hours,`,  // -----> Englais
              `Heures,`, //  -----> Francais
              //   ``,  //  -----> Turkey
              //   `` ,  //  -----> Allemagne
            )

          }  {minutes} {
            getTranslation(
              `Minutes left`,  // -----> Englais
              `Minutes restant`, //  -----> Francais
              //   ``,  //  -----> Turkey
              //   `` ,  //  -----> Allemagne
            )

          }
        </p>
      ) : (
        <p> {
          getTranslation(
            `Challenge completed `,  // -----> Englais
            `Challenge terminé`, //  -----> Francais
            //   ``,  //  -----> Turkey
            //   `` ,  //  -----> Allemagne
          )

        } </p>
      )}
    </div>

  );
};

export default Timer;