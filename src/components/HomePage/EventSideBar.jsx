import React, { useEffect, useRef, useState } from "react";
import Friends from "../Friends";
import { Context } from "../../index";
import Events from "../Events";
import EventSideBarItem from "./EventSideBarItem";
import { Config } from "../../config";
import CampSideBarItem from "./CampSideBarItem";

const EventSideBar = () => {


    const { _currentLang, _setLang, getTranslation } = React.useContext(Context);
    const [events, setEvents] = useState([]);
    const [camps, setCamps] = useState([]);


    const fetchAlbums = async () => {
        try {
            const response = await fetch(`${Config.LOCAL_URL}/api/albumc`);
            const result = await response.json();
            const response1 = await fetch(`${Config.LOCAL_URL}/api/albumevent`);
            const result1 = await response1.json();
            console.log(events, 'hejlfsdlflksdfksdlkfjsdlkfjsdk')
            setEvents(result1.data)
            setCamps(result.data);
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    };

    useEffect(() => {

        fetchAlbums();
    }, []);

    return (
        <>
                    <div className="w-100 rounded-md border-0 mb-3">
                <div className="d-flex align-items-center py-4">
                    <h4 className=" mb-0 pr-9 font-bold text-lg text-grey-900 ">
                        {getTranslation(
                            `Requests`, // -----> Englais
                            `Odin Events qui pourraient vous intéresser` //  -----> Francais
                        )}
                    </h4>
                    {/* <span className='ml-2 font-bold text-red-500 bg-slate-300 rounded-full h-8 w-6'><p className='ml-2'>{pendingFriendRequests?.length}</p> </span> */}
                    <a
                        href="/defaultgroupevent"
                        className="text-nowrap ms-auto text-sm font-medium text-blue-600"
                    >
                        {getTranslation(
                            `See All`, // -----> Englais
                            `Voir Tout` //  -----> Francais
                        )}
                    </a>
                </div>
                <div className="flex flex-col gap-y-3">
                    {events.slice(0, 2).reverse().map((item, index) => {
                        return (
                            <><EventSideBarItem item={item} /> </>
                        )
                    })}
                </div>



            </div>
            <div className="w-100 rounded-md border-0 mb-3">
                <div className="d-flex align-items-center py-4">
                    <h4 className=" mb-0 pr-9 font-bold text-lg text-grey-900 ">
                        {getTranslation(
                            `Requests`, // -----> Englais
                            `Camps qui pourraient vous intéresser` //  -----> Francais
                        )}
                    </h4>
                    {/* <span className='ml-2 font-bold text-red-500 bg-slate-300 rounded-full h-8 w-6'><p className='ml-2'>{pendingFriendRequests?.length}</p> </span> */}
                    <a
                        href="/defaultgroup"
                        className="text-nowrap ms-auto text-sm font-medium text-blue-600"
                    >
                        {getTranslation(
                            `See All`, // -----> Englais
                            `Voir Tout` //  -----> Francais
                        )}
                    </a>
                </div>
                <div className="flex flex-col gap-y-3">
                    {camps.slice(0, 2).map((item, index) => {
                        return (
                            <><CampSideBarItem item={item} /> </>

                        )
                    })}

                </div>
            </div>

        </>
    )


}
export default EventSideBar