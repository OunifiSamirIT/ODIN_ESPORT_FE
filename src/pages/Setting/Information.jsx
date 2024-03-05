import React , {useEffect , useState} from "react";
import Player from './Fragments/Player';
import Entraineur from "./Fragments/Entraineur";
import Scout from "./Fragments/Scout";
import Agent from "./Fragments/Agent";

const Information = ({userInfo}) => {

    return(
       <>
        {userInfo?.user.profil === 'agent' && <Agent userInfo={userInfo}/>}
        {userInfo?.user.profil === 'player' && <Player userInfo={userInfo}/>}
        {userInfo?.user.profil === 'scout' && <Scout userInfo={userInfo}/>}
        {userInfo?.user.profil === 'agent' && <Agent userInfo={userInfo}/>}
       </>
    )






}


export default Information 