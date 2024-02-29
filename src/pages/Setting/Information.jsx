import React , {useEffect , useState} from "react";
import Player from './Player';


const Information = () => {
    const [userInfo , setUserInfo] = useState([])
    const [formData , setFormData] = useState([])
    const [player , setPlayer] = useState([])
    const [scout , setScout] = useState([])
    const [manager , setManager] = useState([])
    const [coach , setCoach] = useState([])
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const id = storedUserData.id
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`https://odine-sport.com/api/user/${storedUserData.id}`);
                const data = await response.json();
                setUserInfo(data);
                if(data.profil === 'player') {
                    const resp1 = await fetch(`https://odine-sport.com/api/player/${storedUserData.id}`);
                    const  p = await resp1.json(); 
                    setPlayer(p)
                }                
                console.log("eeeeeeeeeeeeeee", userInfo);
                setFormData({
                    // Additional fields for player
                    height: "",
                    weight: "",
                    club: "FC bayern",
                    strongSkill: "",
                    positionPlay: "",
                    positionSecond: "",
                    skillsInProfile: "",
                });
            } catch (error) {
                console.error("Error fetching user information:", error);
            }
        };
        fetchUserInfo();
    }, [id]);


    return(
       <>
       {userInfo.profil == 'player' && <Player/>}
       </>
    )






}


export default Information 