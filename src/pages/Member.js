import React,{Component, useEffect, useState, Fragment} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';



function  Member  () {


    const [friendRequests, setFriendRequests] = useState(null);
    const [userpf, setUserpf] = useState(null);

    useEffect(() => {
        // Get user ID from local storage
        const userId = JSON.parse(localStorage.getItem("user"))?.id;
        console.log("User Profile Data:", userpf);
    
        // Fetch user info using user ID
        if (userId) {
          fetch(`https://odine-sport.com/api/user/${userId}`)
            .then((response) => {
              console.log("Response from the server:", response);
              return response.json();
            })
            .then((data) => {
              console.log("Data received qqqqqq:", data);
              setUserpf(data);
            })
            .catch((error) => console.error("Error fetching user info:", error));
        }
       
    
        const fetchFriendRequests = async () => {
          try {
            const response = await fetch(
              `https://odine-sport.com/api/user/${userId}/friend-requests`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            setFriendRequests(data);
          } catch (err) {
            console.error("Error fetching friend requests:", err);
            
          }
        };
    
        fetchFriendRequests();
      }, []);

      const pendingFriendRequests = friendRequests?.receiver || [];
        return (
            <Fragment> 
                <Header />
                <Leftnav />
             

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">
                            <div className="row">
                                <div className="col-xl-12">
                                    <Pagetitle title="Demandes"/>

                                    <div className="row ps-2 pe-2">

                                        {pendingFriendRequests.map((value , index) => (
                                        <div key={index} className="col-md-3 col-sm-4 pe-2 ps-2">
                                            <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                                                <div className="card-body d-block w-100 ps-3 pe-3 pb-2 text-center">
                                                    <figure className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1"><img src={value?.image} alt="avater" className="float-right w-30 p-0 bg-white rounded-full  shadow-xss" /></figure>
                                                    <div className="clearfix w-100"></div>
                                                    <h4 className="fw-700 font-xsss mt-3 mb-0">{value?.nom} </h4>
                                                    <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">{value?.profil}</p>
                                                </div>
                                                <div className="card-body d-flex align-items-center pt-0 ps-4  pe-4 pb-4">
                   <a href="/defaultmember" className="grow justify-center  py-2 mr-3 text-white text-center bg-blue-600 rounded-[30px] max-md:px-3">Accepter</a>
                   <a href="/defaultmember" className="grow justify-center  text-white py-2 text-center bg-orange-500 rounded-[30px] max-md:px-3">Supprimer</a>
               </div>
                                            </div>
                                            
                                        </div> 
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Popupchat />
                <Appfooter /> 

            </Fragment>
        );
    
}

export default Member;