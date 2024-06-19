import React  from "react"
import { Context } from "../../../index";



const ParticipantCard = ({item , index ,openModel , expired , getTranslation , isOwner}) => {

    return ( <div key={index} className="relative">
    <div onClick={() => openModel(item)} className="max-md:flex-col max-md:gap-0 relative">
        <div className="flex flex-col  max-md:ml-0 max-md:w-full rounded-[10px] overflow-hidden">
            <div className="relative flex flex-col  justify-center text-base text-white">
                <div className="flex  relative flex-col h-full w-full aspect-[0.78]">
                    <video preload="metadata" className="h-full object-cover absolute inset-0 size-full" src={`${item.video}#t=0.2`}></video>
                </div>
            </div>
            <div className={`${isOwner(item.userId) && !expired ? '' : 'hidden'} border-3 border-orange-new rounded-[10px]  absolute top-0 bg-gradient-to-t from-orange-new from-0%  to-transparent to-30% w-full h-full`}></div>
            <div className={`${expired && index < 3 ? '' : 'hidden'} border-3 border-blue-500 rounded-[10px]  absolute top-0 bg-gradient-to-t from-blue-500 from-0%  to-transparent to-30% w-full h-full`}></div>
            <div className="absolute bottom-0 p-4 max-sm:flex-col items-center gap-2 flex w-full justify-between">
                {isOwner(item.userId) && <div className="text-white">{getTranslation(`My video`, `Ma vidéo `)}</div>}
                <div className="flex items-center gap-2">
                    <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5 11H21V4.5C21 2.57 19.43 1 17.5 1H8.5C6.57 1 5 2.57 5 4.5V11H4.5C2.57 11 1 12.57 1 14.5V17.5C1 19.43 2.57 21 4.5 21H21.5C23.43 21 25 19.43 25 17.5V14.5C25 12.57 23.43 11 21.5 11ZM6 4.5C6 3.12 7.12 2 8.5 2H17.5C18.88 2 20 3.12 20 4.5V16H6V4.5ZM24 17.5C24 18.88 22.88 20 21.5 20H4.5C3.12 20 2 18.88 2 17.5V14.5C2 13.12 3.12 12 4.5 12H5V16.5C5 16.78 5.22 17 5.5 17H20.5C20.78 17 21 16.78 21 16.5V12H21.5C22.88 12 24 13.12 24 14.5V17.5ZM9.2 9.8C9 9.6 9 9.29 9.2 9.09C9.4 8.89 9.71 8.89 9.91 9.09L11.53 10.71C11.92 11.1 12.56 11.1 12.94 10.71L16.57 7.08C16.77 6.88 17.08 6.88 17.28 7.08C17.48 7.28 17.48 7.59 17.28 7.79L13.65 11.42C13.27 11.8 12.77 12.01 12.24 12.01C11.71 12.01 11.2 11.8 10.83 11.42L9.21 9.8H9.2Z" fill="white" stroke="white" stroke-width="0.4" />
                    </svg>
                    <div className="text-white">{item.votes > 0 ? item.votes : 0} {getTranslation(`Votes`, `Votes `)}</div>
                </div>
            </div>
        </div>
    </div>
</div>)
}
export default ParticipantCard