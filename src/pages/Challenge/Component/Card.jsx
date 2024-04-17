import React, { useState } from "react";
import {useParams } from "react-router-dom";


const Card = ({ item }) => {

    return (
        <div className="cursor-pointer flex flex-col flex-wrap grow content-start p-6 mx-auto w-full bg-red-500 font-light bg-white rounded-[10px] text-zinc-900">
            <div class="aspect-w-16 aspect-h-9">
                <video class="object-cover"
                    controls
                    src={`${item.video}`}
                   >
                </video>
            </div>
            <a href={`/challenges/details/${item.id}`}>
                <div className="mt-4 text-base font-semibold">{item.name}</div>
                <div className="flex gap-4 mt-1 text-xs">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.7" clip-path="url(#clip0_173_40766)">
                            <path d="M0 4.33333V3.79167C0 2.29829 1.21496 1.08333 2.70833 1.08333H3.25V0.541667C3.25 0.242667 3.49213 0 3.79167 0C4.09121 0 4.33333 0.242667 4.33333 0.541667V1.08333H8.66667V0.541667C8.66667 0.242667 8.90879 0 9.20833 0C9.50788 0 9.75 0.242667 9.75 0.541667V1.08333H10.2917C11.785 1.08333 13 2.29829 13 3.79167V4.33333H0ZM13 5.41667V10.2917C13 11.785 11.785 13 10.2917 13H2.70833C1.21496 13 0 11.785 0 10.2917V5.41667H13ZM9.659 7.124C9.451 6.90896 9.10867 6.90246 8.89308 7.10992L6.318 9.59183C6.11433 9.7955 5.77254 9.81067 5.53854 9.57775L4.30463 8.43104C4.08633 8.22792 3.744 8.23929 3.53925 8.45921C3.33558 8.67804 3.34804 9.02092 3.56742 9.22458L4.78725 10.3578C5.09383 10.6649 5.50225 10.8339 5.93613 10.8339C6.37 10.8339 6.77896 10.6649 7.07796 10.3648L9.64546 7.89046C9.8605 7.683 9.867 7.33904 9.659 7.124Z" fill="#1D1E21" />
                        </g>
                        <defs>
                            <clipPath id="clip0_173_40766">
                                <rect width="13" height="13" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    <div>{item.endDate}</div>
                </div>
                <div className="mt-2 text-xs">
                    {item.description}
                </div>
            </a>

        </div>
    )

}

export default Card