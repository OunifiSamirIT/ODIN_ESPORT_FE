import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Config } from '../config';
import Placeholder from '../assets/placeholder.jpg';

function Friends() {
  // const [friendRequests, setFriendRequests] = useState(null);
  const [userpf, setUserpf] = useState(null);
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const [FriendRequest, setFriendRequest] = useState([])
  
  const acceptInvitation = async (id) => {
    console.log(`${Config.LOCAL_URL}/api/user/${id}/acceptFriend/${storedUserData.id}`)
    const response = await fetch(`${Config.LOCAL_URL}/api/user/${storedUserData.id}/acceptFriend/${id}`, {
      method: "PUT",
    });
    if (response.status === 200) { window.location.reload() }
  }
  const deleteInviation = async (id) => {
    const response = await fetch(`${Config.LOCAL_URL}/api/user/${storedUserData.id}/delete/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) { window.location.reload() }
  }
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


    const fetchFriendRequest = async () => {
      const response = await fetch(`${Config.LOCAL_URL}/api/user/${storedUserData.id}/getPendingFriends`);
      const result = await response.json()
      setFriendRequest(result.exists)
      console.log('ffffffffffffffffffffffffffffer',result)
    }
    
    fetchFriendRequest();
  }, []);

  // const pendingFriendRequests = friendRequests?.receiver || [];

  return (
    <div className="card w-100 shadow-xss rounded-md border-0 mb-3">
      <div className="card-body d-flex align-items-center p-4">
        <h4 className=" mb-0 font-bold text-lg text-grey-900 mr-2">Demandes</h4>
        {/* <span className='ml-2 font-bold text-red-500 bg-slate-300 rounded-full h-8 w-6'><p className='ml-2'>{pendingFriendRequests?.length}</p> </span> */}
        <a href="/friends" className=" ms-auto text-sm font-medium text-blue-600">Voir Tout</a>

      </div> 

      {FriendRequest.map((item) => (
        <div className="wrap" key={item.receiver.id}>
          <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0 bor-0">
            <Link to={`/profile/${item.receiver.id}`}>
              <figure className="avatar mb-1 me-3"><img src={item.receiver?.image ? item?.receiver.image : Placeholder} alt="avater" className="shadow-sm rounded-circle w-16 h-16" /></figure>
            </Link>
            <div>
              <Link to={`/profile/${item.receiver.id}`}>
                <h4 className="fw-700 text-grey-900 mb-1 font-xssss mt-4">{item?.receiver?.nom} {item?.receiver?.prenom}</h4>
              </Link>
              <h3 className="fw-700 text-grey-500 mb-1 font-xssss mt-2">{item?.receiver?.profil} </h3>
            </div>
          </div>

          <div className="card-body d-flex align-items-center pt-0 ps-4 mt-2 pe-4 pb-4">
            <button  onClick={() => acceptInvitation(item.receiver.id)} className="grow justify-center px-6 py-2 mr-3 text-white text-center bg-blue-600 rounded-[30px] max-md:px-5">Accepter</button>
            <button onClick={() => deleteInviation(item.receiver.id)} className="grow justify-center px-6 text-white py-2 text-center bg-orange-500 rounded-[30px] max-md:px-5">Supprimer</button>
          </div>
        </div>


      ))}


    </div>
  );

}

export default Friends;