import React , {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout"
import image from "../../assets/Image.png"
import ChallengeLayout from "../../Layout/ChallengeLayout";
import Card from './Component/Card';
import { Config } from "../../config";


const Challenges = () => {
    const items = [
        {id: 0 , image : image , title : 'Rainbow Flick' , date : '21 Jul 2024' , des : `Un mouvement flashy où le joueur lance le ballon en l'air et au-dessus
        de sa tête avec un pied, puis saute rapidement pour le rattraper de
        l'autre côté.`},
        {id: 1 , image : image , title : 'Rainbow Flick' , date : '21 Jul 2024' , des : `Un mouvement flashy où le joueur lance le ballon en l'air et au-dessus
        de sa tête avec un pied, puis saute rapidement pour le rattraper de
        l'autre côté.`},
        {id: 2 , image : image , title : 'Rainbow Flick' , date : '21 Jul 2024' , des : `Un mouvement flashy où le joueur lance le ballon en l'air et au-dessus
        de sa tête avec un pied, puis saute rapidement pour le rattraper de
        l'autre côté.`},
        {id: 3 , image : image , title : 'Rainbow Flick' , date : '21 Jul 2024' , des : `Un mouvement flashy où le joueur lance le ballon en l'air et au-dessus
        de sa tête avec un pied, puis saute rapidement pour le rattraper de
        l'autre côté.`},
        {id: 4 , image : image , title : 'Rainbow Flick' , date : '21 Jul 2024' , des : `Un mouvement flashy où le joueur lance le ballon en l'air et au-dessus
        de sa tête avec un pied, puis saute rapidement pour le rattraper de
        l'autre côté.`},
        {id: 5 , image : image , title : 'Rainbow Flick' , date : '21 Jul 2024' , des : `Un mouvement flashy où le joueur lance le ballon en l'air et au-dessus
        de sa tête avec un pied, puis saute rapidement pour le rattraper de
        l'autre côté.`},
        {id: 6 , image : image , title : 'Rainbow Flick' , date : '21 Jul 2024' , des : `Un mouvement flashy où le joueur lance le ballon en l'air et au-dessus
        de sa tête avec un pied, puis saute rapidement pour le rattraper de
        l'autre côté.`}
    ]
    const [challenges, setChallenges] = useState([])
    const fetchChallenges = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/challenges`)
        const result = await response.json()
        console.log(result)
        setChallenges(result.challenges)
    }
    useEffect(() => {
        console.log(challenges)
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