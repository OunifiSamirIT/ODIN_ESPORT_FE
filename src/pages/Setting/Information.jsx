import React , {useEffect , useState} from "react";
import Player from './Fragments/Player';
import Entraineur from "./Fragments/Entraineur";
import Scout from "./Fragments/Scout";
import Agent from "./Fragments/Agent";
import Other from "./Fragments/Other";


const Information = ({userInfo}) => {
    return(
       <>
        {/* {userInfo.user.profil === 'scout'  &&  <Scout userInfo={userInfo}/>} */}
        {userInfo?.user.profil === 'player' && <Player userInfo={userInfo}/>}
        {userInfo?.user.profil === 'coach'  && <Entraineur userInfo={userInfo}/>}
        {userInfo?.user.profil === 'other'  &&  <Other userInfo={userInfo}/>} 
        {userInfo?.user.profil === 'agent'  &&  <Agent userInfo={userInfo}/>}
        {userInfo?.user.profil === 'scout'  &&  <Scout userInfo={userInfo}/>}
       </>
    )






}


export default Information 