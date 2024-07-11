import React, { useEffect, useState } from "react";
import StatBar from "./StatBar";
import TestServer from "../../../api/test.server"

const StatsD = () => {
    const [vitesse, setVitesse] = useState()
    const [saut, setSaut] = useState()
    const [conduit, setConduit] = useState()
    const [agilite, setAgilite] = useState()
    const [jonglage, setJonglage] = useState()
    const [tir, setTir] = useState()

    const getVitesseForCurrentUser = async () => {
        let data = await TestServer.getVitesseStatsByUser();
        setVitesse(data)
    }
    const getSautForCurrentUser = async () => {
        let data = await TestServer.getSautStatsByUser();
        setSaut(data)
    }
    const getConduitForCurrentUser = async () => {
        let data = await TestServer.getConduitStatsByUser();
        setConduit(data)
    }
    const getAgiliteForCurrentUser = async () => {
        let data = await TestServer.getagiliteStatsByUser();
        setAgilite(data)
    }
    const getJonglageForCurrentUser = async () => {
        let data = await TestServer.getJonglageStatsByUser();
        setJonglage(data)
    }
    const getTirForCurrentUser = async () => {
        let data = await TestServer.getTirStatsByUser();
        setTir(data)

    }


    useEffect(() => {
        getVitesseForCurrentUser()
        getSautForCurrentUser()
        getConduitForCurrentUser()
        getAgiliteForCurrentUser()
        getJonglageForCurrentUser()
        getTirForCurrentUser()
        console.log('vittt', jonglage, 'new')
    }, [])
    return (
        <>
            <div className="flex flex-col p-8 bg-white rounded-[10px] border border-solid border-neutral-200 text-zinc-900 max-md:px-5">
                <div className="text-3xl font-bold text-blue-600 max-md:max-w-full">
                    Stats
                </div>
                <StatBar exercice={'vitesse'} value={vitesse?.totalPoints} />
                <StatBar exercice={'saut'} value={saut?.totalPoints} />
                <StatBar exercice={'Agilité'} value={agilite?.total_score} />
                <StatBar exercice={'Jonglage'} value={jonglage?.data?.points} />
                <StatBar exercice={'Conduite de balle'} value={conduit} />
                <StatBar exercice={'Tir au but'} value={tir?.somme} />
            </div>
        </>
    )
}
export default StatsD;