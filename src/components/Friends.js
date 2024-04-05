import React,{Component, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Config } from '../config';
const friendList = [
    {
        imageUrl: 'user.png',
        name: 'Anthony Daugloi',
        friend: '12',
    },
    {
        imageUrl: 'user.png',
        name: 'Mohannad Zitoun',
        friend: '18',
    },
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        friend: '28',
    },
]

function Friends () {
    const [friendRequests, setFriendRequests] = useState(null);
    const [userpf, setUserpf] = useState(null);

    useEffect(() => {
        // Get user ID from local storage
        const userId = JSON.parse(localStorage.getItem("user"))?.id;
        console.log("User Profile Data:", userpf);
    
        // Fetch user info using user ID
        if (userId) {
          fetch(`${Config.LOCAL_URL}/api/user/${userId}`)
            .then((response) => {
              console.log("Response from the server friendsssss:", response);
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
              `${Config.LOCAL_URL}/api/user/${userId}/friend-requests`
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
            <div className="card w-100 shadow-xss rounded-md border-0 mb-3">
                <div className="card-body d-flex align-items-center p-4">
                    <h4 className=" mb-0 font-bold text-lg text-grey-900 mr-2">Demandes</h4>
                    {/* <span className='ml-2 font-bold text-red-500 bg-slate-300 rounded-full h-8 w-6'><p className='ml-2'>{pendingFriendRequests?.length}</p> </span> */}
                    <a href="/friends" className="fw-600 ms-auto font-xssss te text-primary">Voir Tout</a>
                   
                </div> <hr className="mb-2 mx-3 bg-black" />
                {pendingFriendRequests.map((request) => (
               <div className="wrap" key={request.id}>
               <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0 bor-0">
               <Link to={`/profile/${request.id}`}>
               <figure className="avatar mb-1 me-3"><img src={request.image} alt="avater" className="shadow-sm rounded-circle w-16 h-16" /></figure>
            </Link>
                   <div>
                   <Link to={`/profile/${request.id}`}>
                 <h4 className="fw-700 text-grey-900 mb-1 font-xssss mt-4"> {request?.nom} {request?.prenom}</h4>
              </Link>
                       <h3 className="fw-700 text-grey-500 mb-1 font-xssss mt-2"> {request?.profil} </h3>
                   </div>
               </div>
               
               <div className="card-body d-flex align-items-center pt-0 ps-4 mt-2 pe-4 pb-4">
                   <a href="/defaultmember" className="grow justify-center px-6 py-2 mr-3 text-white text-center bg-blue-600 rounded-[30px] max-md:px-5">Accepter</a>
                   <a href="/defaultmember" className="grow justify-center px-6 text-white py-2 text-center bg-orange-500 rounded-[30px] max-md:px-5">Supprimer</a>
               </div>
           </div>
           

                ))}

                
            </div>
        );
    
}

export default Friends;