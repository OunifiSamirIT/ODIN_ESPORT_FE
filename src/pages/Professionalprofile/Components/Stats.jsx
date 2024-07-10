import React, { useEffect, useState } from "react";
import StatBar from "./StatBar";
// import TestServer from "../../../api/test.server"

const StatsD = () => {
     const [vitesse , setVitesse] = useState()
     

    //  const getVitesseForCurrentUser = async () => {
    //     let data = await TestServer.fetchVitesse(55);
    //     setVitesse(data)
    //  }
    //  useEffect(() => {
    //     getVitesseForCurrentUser()
    //    console.log('vittt',vitesse , 'sfdgdf')
    //  },[])
    return (
        <>
            <div className="flex flex-col p-8 bg-white rounded-[10px] border border-solid border-neutral-200 text-zinc-900 max-md:px-5">
                <div className="text-3xl font-bold text-blue-600 max-md:max-w-full">
                    Stats
                </div>
                <StatBar exercice={'vitesse'} value={vitesse?.totalPoints}/>
                <StatBar exercice={'Saut'} value={70}/>
                <StatBar exercice={'Agilité'} value={102}/>
                <StatBar exercice={'Jonglage'} value={180}/>
                <StatBar exercice={'Tir au but'} value={90}/>
                <StatBar exercice={'Conduite de balle'} value={100}/>
            </div>
        </>
    )
}
export default StatsD;