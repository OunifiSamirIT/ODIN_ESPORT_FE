import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Card = ({ item }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(null);

    const captureThumbnail = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL('image/jpeg');
        setThumbnailUrl(thumbnail);
    };
    const [isPlaying, setIsPlaying] = useState(false)
    const playVideo = () => {
        if (isPlaying) {
            video.current.pause();
        } else {
            video.current.play();
        }
        setIsPlaying(!isPlaying);

    }
    const video = useRef()

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        // Format the date object into the desired format
        return dateObject.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    return (
        <Link to={`/challenges/details/${item.id}`}  className="cursor-pointer flex flex-col flex-wrap content-start p-6 mx-auto w-full font-light bg-white rounded-[10px] text-zinc-900">
            <Link to={`/challenges/details/${item.id}`} class="relative">
                <video ref={video} onClick={playVideo} class="object-cover w-full aspect-[16/9] rounded-[7px] h-[110px]"
                    src={`${item.video}`}
                    onLoaded={captureThumbnail}>
                    {thumbnailUrl && <img src={thumbnailUrl} alt="Video Thumbnail" />}
                </video>
                {!isPlaying && <svg onClick={playVideo} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-[40px]  flex  cursor-pointer" width="79" height="78" viewBox="0 0 79 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.1241 55.8515H28.154C28.0849 55.8261 28.0145 55.8045 27.9432 55.7867C26.2758 55.4558 25.0525 54.0157 25.0516 52.331C25.0453 43.6342 25.0453 34.9373 25.0516 26.2405C25.0553 25.678 25.1978 25.1252 25.4663 24.631C26.3302 22.9895 28.5453 22.117 30.5367 23.2824C34.4485 25.5727 38.3828 27.8215 42.3085 30.0875C45.7953 32.1034 49.2824 34.1163 52.7698 36.1264C54.3179 37.0223 55.0065 38.6317 54.5443 40.2732C54.2635 41.2702 53.6259 41.9734 52.7343 42.4874C46.2143 46.2438 39.7055 50.02 33.1777 53.7634C31.8585 54.5202 30.63 55.4575 29.1241 55.8515Z" fill="white" />
                    <circle cx="39.3922" cy="39.3004" r="38.1207" stroke="white" />
                </svg>}
            </Link>
            <div className="mt-4 text-base font-semibold">{item.name}</div>
            <div className="flex gap-2 mt-1 text-xs">
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

                <div>{formatDate(item.endDate)}</div>
            </div>
            <Link to={`/challenges/details/${item.id}`} className="mt-2 text-xs">
                {item.description.length > 100 ?
                    item.description.slice(0, 100) + '...' :
                    item.description
                }
            </Link>
        </Link>
    )

}

export default Card