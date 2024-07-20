import React, { useEffect, useState } from "react";
import StatBar from "./StatBar";
import TestServer from "../../../api/test.server"

const StatsD = ({id}) => {
    const [vitesse, setVitesse] = useState()
    const [saut, setSaut] = useState()
    const [conduit, setConduit] = useState()
    const [agilite, setAgilite] = useState()
    const [jonglage, setJonglage] = useState()
    const [tir, setTir] = useState()
    const getVitesseForCurrentUser = async (id) => {
        let data = await TestServer.getVitesseStatsByUser(id);
        setVitesse(data)
    }
    const getSautForCurrentUser = async (id) => {
        let data = await TestServer.getSautStatsByUser(id);
        setSaut(data)
    }
    const getConduitForCurrentUser = async (id) => {
        let data = await TestServer.getConduitStatsByUser(id);
        console.log('conduit' , data)
        setConduit(data)
    }
    const getAgiliteForCurrentUser = async (id) => {
        let data = await TestServer.getagiliteStatsByUser(id);
        setAgilite(data)
    }
    const getJonglageForCurrentUser = async (id) => {
        let data = await TestServer.getJonglageStatsByUser(id);
        console.log(data.data,'from jonglage')
        setJonglage(data?.data?.points)
    }
    const getTirForCurrentUser = async (id) => {
        let data = await TestServer.getTirStatsByUser(id);
        setTir(data)

    }


    useEffect(() => {
        getVitesseForCurrentUser(id)
        getSautForCurrentUser(id)
        getConduitForCurrentUser(id)
        getAgiliteForCurrentUser(id)
        getJonglageForCurrentUser(id)
        getTirForCurrentUser(id)
        console.log('vittt', jonglage, 'new')
    }, [])
    return (
        <>
            <div className="flex flex-col p-8 bg-white rounded-[10px] border border-solid border-neutral-200 text-zinc-900 max-md:px-5">
                <div className="text-3xl font-bold text-blue-600 max-md:max-w-full">
                    Stats
                </div>
                <StatBar exercice={'vitesse'} value={vitesse?.points ? vitesse?.points : 0} />
                <StatBar exercice={'saut'} value={saut?.totalPoints ? saut?.totalPoints : 0 } />
                <StatBar exercice={'Agilité'} value={agilite?.data?.total_score ? agilite?.data?.total_score : 0} />
                <StatBar exercice={'Jonglage'} value={jonglage ?? 0 } />
                <StatBar exercice={'Conduite de balle'} value={ isNaN(conduit) ? 0 : conduit} />
                <StatBar exercice={'Tir au but'} value={tir?.somme ? tir?.somme : 0 } />
            </div>
        </>
    )
}
export default StatsD;