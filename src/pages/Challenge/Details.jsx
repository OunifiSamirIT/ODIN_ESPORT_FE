import React from "react";
import { Link } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout"
import image from "../../assets/Image.png"
import ChallengeLayout from "../../Layout/ChallengeLayout";
import Card from './Component/Card';
import ChallengeDetais from "./Fragments/ChallengeDetails";
import {useParams } from "react-router-dom";


const Challenges = () => {


    return (<>
        <HomeLayout >
            <ChallengeLayout>
                <ChallengeDetais/>
            </ChallengeLayout>
        </HomeLayout >
    </>)
}

export default Challenges