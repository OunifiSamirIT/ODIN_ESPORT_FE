import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const CampSideBarItem = ({item}) => {


    console.log(item , 'helllmloooo')
    const formatDate = (dateString) => {
        const dateParts = dateString.split("-");
        if (dateParts.length === 3) {
          const year = dateParts[0];
          const month = dateParts[1].padStart(2, "0");
          const day = dateParts[2].padStart(2, "0");
          return `${day}-${month}-${year}`;
        } else {
          return null;
        }
      };

    return (
        <>
            <Link to={`/defaultgroup/${item.id}`} className={`relative rounded-md  bg-cover text-slate-300 h-[318px] w-[312px] `} style={{ backgroundImage: `url(${item?.ImagesAlbumcamps && item?.ImagesAlbumcamps[0]?.image_url})` ,         backgroundSize: 'cover',
        backgroundPosition: 'center' }}>
                <div className="bg-gradient-to-t from-black to-transparent  hover:bg-gradient-to-t hover:cursor-pointer hover:from-black hover:from-10% hover:to-transparent w-full h-full"></div>
                <div className="absolute bottom-6 px-3">
                    <h4 className="text-slate-300">{item.album_name}</h4>
                    <span className="  flex gap-2 items-center text-[10px]">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_4095_1344)">
                                <path d="M0 4.33333V3.79167C0 2.29829 1.21496 1.08333 2.70833 1.08333H3.25V0.541667C3.25 0.242667 3.49213 0 3.79167 0C4.09121 0 4.33333 0.242667 4.33333 0.541667V1.08333H8.66667V0.541667C8.66667 0.242667 8.90879 0 9.20833 0C9.50788 0 9.75 0.242667 9.75 0.541667V1.08333H10.2917C11.785 1.08333 13 2.29829 13 3.79167V4.33333H0ZM13 5.41667V10.2917C13 11.785 11.785 13 10.2917 13H2.70833C1.21496 13 0 11.785 0 10.2917V5.41667H13ZM9.659 7.124C9.451 6.90896 9.10867 6.90246 8.89308 7.10992L6.318 9.59183C6.11433 9.7955 5.77254 9.81067 5.53854 9.57775L4.30463 8.43104C4.08633 8.22792 3.744 8.23929 3.53925 8.45921C3.33558 8.67804 3.34804 9.02092 3.56742 9.22458L4.78725 10.3577C5.09383 10.6649 5.50225 10.8339 5.93612 10.8339C6.37 10.8339 6.77896 10.6649 7.07796 10.3648L9.64546 7.89046C9.8605 7.683 9.867 7.33904 9.659 7.124Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_4095_1344">
                                    <rect width="13" height="13" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                         <p>{formatDate(item.date_debut)}</p>
                    </span>
                    <p className="text-[10px] leading-3">
                        {item.description.length > 75
                                ? item.description.slice(0, 75) + "..."
                                : item.description}</p>
                </div>
            </Link>
        </>
    )

}

export default CampSideBarItem