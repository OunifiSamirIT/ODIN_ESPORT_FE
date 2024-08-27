import React , {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout"
import image from "../../assets/Image.png"
import ChallengeLayout from "../../Layout/ChallengeLayout";
import Card from './Component/Card';
import { Config } from "../../config";
import secureLocalStorage from "react-secure-storage";


const Challenges = () => {
    const [challenges, setChallenges] = useState([])
    const storedUserDatad = JSON.parse(
        secureLocalStorage.getItem("cryptedUser")
      );
      const storedUserData = JSON.parse(localStorage.getItem("Secret"));
      const tokenn = storedUserData?.token;
  
    const fetchChallenges = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/challenges` ,{
            credentials: "include",
            headers : {
                Authorization: `Bearer ${tokenn}`,   
            }
        })
        const result = await response.json()
        console.log(result)
        setChallenges(result.challenges)
    }
    useEffect(() => {
        fetchChallenges()
    }, [])

    return (<>
        <HomeLayout >
            <ChallengeLayout>
                {challenges.map((item) => {
                    return(<Card item={item} />)
                })}
            </ChallengeLayout>
        </HomeLayout >
    </>)
}

export default Challenges