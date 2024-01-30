import React, { useState , useEffect } from "react";

import AdminHeader from './Components/AdminHeader';
import Appfooter from '../../components/Appfooter';
import Popupchat from '../../components/Popupchat';
import Pagetitle from '../../components/Pagetitle';


const Event = () => {
    const [event, setEvent] = useState([]);
    const storedUserData = JSON.parse(localStorage.getItem("user"));

    const hanleEventApplication = async (userID , eventID) => {

        const url = "http://localhost:8088/api/event/apply/" + userID +"/" + eventID
        const response = await fetch(url , {
            method: 'POST',
          });
          const result = await response.json();
          console.log(result)
    }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:8088/api/event");
                const result = await response.json();

                setEvent(result.data);

            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents()
    }, [])
    return (
        <>
            <AdminHeader />
            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <a href="/admin/events/create" className="font-xsssss fw-700 ps-3 pe-3 lh-32 float-right mt-4 mb-4 text-uppercase rounded-3 ls-2 bg-info d-inline-block text-white me-1">Create New Event</a>
                            </div>
                            <div className="row">
                                <Pagetitle title="Events" />
                                {event.map((value, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 pe-2 ps-2 mt-2">
                                        <div className="card p-3 h-100 bg-white w-100 hover-card border-0 shadow-xss  rounded-xxl border-0 mb-3 overflow-hidden ">
                                            <div className="card-image object-cover cover h150">
                                                <img src={value.ImageEvents[0].image_url} alt="event" className="rounded-3 card-body position-relative " />
                                            </div>
                                            <div className="card-body d-flex ps-0 pe-0 pb-0">
                                                <div className="bg-greylight me-3 p-3 border-light-md rounded-xxl theme-dark-bg d-flex justify-items-center align-items-center text-center"><h4 className="fw-700 font-lg ls-3 text-grey-900 mb-0"><span className="ls-3 d-block font-xsss text-grey-500 fw-500">january</span>28</h4></div>
                                                <h2 className="fw-700 lh-3 font-xss">{value.event_name}
                                                    <span className="d-flex font-xssss fw-500 mt-2 lh-3 text-grey-500"> <i className="ti-location-pin me-1"></i>{value.address} </span>
                                                </h2>
                                            </div>
                                            
                                            <div className="card-body p-0">
                                                {/* <ul className="memberlist mt-4 mb-2 ms-0 d-inline-block">
                                                    <li><a href="/defaultevent"><img src="/assets/images/user-1.png" alt="user" className="w30 d-inline-block" /></a></li>
                                                    <li><a href="/defaultevent"><img src="/assets/images/user-1.png" alt="user" className="w30 d-inline-block" /></a></li>
                                                    <li><a href="/defaultevent"><img src="/assets/images/user-1.png" alt="user" className="w30 d-inline-block" /></a></li>
                                                    <li><a href="/defaultevent"><img src="/assets/images/user-1.png" alt="user" className="w30 d-inline-block" /></a></li>
                                                    <li className="last-member"><a href="/defaultevent" className="bg-greylight fw-600 text-grey-500 font-xssss ls-3 text-center">+2</a></li>
                                                </ul> */}
                                                <button onClick={()=> {hanleEventApplication(value.id , storedUserData.id)}} className="font-xsssss fw-700 ps-3 pe-3 lh-32 float-right mt-4 text-uppercase rounded-3 ls-2 bg-success d-inline-block text-white me-1">APPLY</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Event;