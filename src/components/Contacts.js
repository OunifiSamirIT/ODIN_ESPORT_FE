import React,{Component, useEffect, useState} from 'react';



function Contacts () {
    const [userpf, setUserpf] = useState(null);
    const [suggestedFriends, setSuggestedFriends] = useState([]);



    const storedUserData = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        // Get user ID from local storage
        const userId = JSON.parse(localStorage.getItem("user"))?.id;
        console.log("User Profile Data:", userpf);
        console.log("suggestedFriends:", suggestedFriends);
    
        // Fetch user info using user ID
        if (userId) {
          fetch(`http://localhost:8088/api/user/${userId}`)
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
        const fetchSuggestedFriends = async () => {
          try {
            const userId = storedUserData.id; 
            const response = await fetch(
              `http://localhost:8088/api/user/${userId}/suggest/random`
            );
            const data = await response.json();
            setSuggestedFriends(data);
          } catch (error) {
            console.error("Error fetching suggested friends:", error);
          }
        };
    
        fetchSuggestedFriends();
    
        // const fetchFriendRequests = async () => {
        //   try {
        //     const response = await fetch(
        //       `http://localhost:8088/api/user/${userId}/friend-requests`
        //     );
        //     if (!response.ok) {
        //       throw new Error(`HTTP error! Status: ${response.status}`);
        //     }
    
        //     const data = await response.json();
        //     setFriendRequests(data);
        //   } catch (err) {
        //     console.error("Error fetching friend requests:", err);
        //     setError("Error fetching friend requests.");
        //   }
        // };
    
        // fetchFriendRequests();
      }, []);
        return (
            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-flex align-items-center p-4">
                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Confirm Friend</h4>
                    <a href="/defaultmember" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                </div>
                {suggestedFriends?.map((friend) => (

                <div key={friend.id} className="card-body bg-transparent-card d-flex p-3 bg-greylight ms-3 me-3 rounded-3 mb-3">
                    <figure className="avatar me-2 mb-0"><img src={friend.image} alt="avater" className="shadow-sm rounded-circle w-16 h-16" /></figure>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-2">{friend.nom} </h4>
                    <a href="/defaultmember" className="btn-round-sm bg-white ms-auto mt-2"><span className="feather-chevron-right font-xss text-grey-900"></span></a>
                </div>

                ))}

                
            </div>
        );
    
}

export default Contacts;