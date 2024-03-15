import React from "react";
import terrain from "../assets/terrain.png";

const Terrain = ({positionPlay , positionSecond }) => {
    const position = [];
    switch (positionPlay) {
        case "Gardien de but (GK)":
            position.push('GK')
            break;
        case "Défenseur central (CB)":
            position.push('CB')
            break;
        case "Arrière droit (RB)":
            position.push('RB')
            break;
        case "Arrière gauche (LB)":
            position.push('LB')
            break;
        case "Milieu défensif (CDM)":
            position.push('CDM')
            break;
        case "Milieu central (MC)":
            position.push('MC')
            break;
        case "Milieu offensif (MO)":
            position.push('MO')
            break;
        case "Ailier droit (RW)":
            position.push('RW')
            break;
        case "Ailier gauche (LW)":
            position.push('LW')
            break;
        case "Attaquant de pointe (ST)":
            position.push('ST')
            break;
        case "Attaquant polyvalent (ST)":
            position.push('ST')
            break;
        default:
            position.push('NAN')
    }
    switch (positionSecond) {
        case "Gardien de but (GK)":
            position.push('GK')
            break;
        case "Défenseur central (CB)":
            position.push('CB')
            break;
        case "Arrière droit (RB)":
            position.push('RB')
            break;
        case "Arrière gauche (LB)":
            position.push('LB')
            break;
        case "Milieu défensif (CDM)":
            position.push('CDM')
            break;
        case "Milieu central (MC)":
            position.push('MC')
            break;
        case "Milieu offensif (MO)":
            position.push('MO')
            break;
        case "Ailier droit (RW)":
            position.push('RW')
            break;
        case "Ailier gauche (LW)":
            position.push('LW')
            break;
        case "Attaquant de pointe (ST)":
            position.push('ST')
            break;
        case "Attaquant polyvalent (ST)":
            position.push('ST')
            break;
        default:
            position.push('NAN')
    }



    const existPosition = (pos) => {
        return position.includes(pos)

    }
    return (
        <>
            <div className="flex flex-col justify-center text-xs text-center text-white whitespace-nowrap w-[366px]">
                <div className="relative flex overflow-hidden relative flex-col py-9 pr-12 pl-4 w-full aspect-[1.45]">
                    <img
                        alt="terrain"
                        loading="lazy"
                        srcSet={terrain}
                        className="object-cover absolute inset-0 size-full"
                    />
                    <div className={`absolute left-[7px] top-[105px] flex justify-center items-center self-start text-center rounded-full aspect-square ${existPosition('GK') ? 'bg-orange-500' : 'bg-neutral-500'} h-[35px]`}>
                        GK
                    </div>
                    <div className={`absolute left-14 flex justify-center items-center self-start text-center rounded-full aspect-square ${existPosition('LB') ? 'bg-orange-500 pointer' : 'bg-neutral-500'} h-[35px]`}>
                        LB
                    </div>
                    <div className={`absolute left-14 top-[105px] flex justify-center items-center self-start text-center rounded-full aspect-square ${existPosition('CB') ? 'bg-orange-500' : 'bg-neutral-500'} h-[35px]`}>
                        CB
                    </div>
                    <div className={`absolute left-14 top-[175px] flex justify-center items-center self-start text-center rounded-full aspect-square ${existPosition('RB') ? 'bg-orange-500' : 'bg-neutral-500'} h-[35px]`}>
                        RB
                    </div>
                    <div className={`absolute left-[115px] top-[105px] flex justify-center items-center self-start text-center rounded-full aspect-square ${existPosition('CDM') ? 'bg-orange-500' : 'bg-neutral-500'} h-[35px]`}>
                        CDM
                    </div>
                    <div className={`absolute left-[166px] top-[105px] flex justify-center items-center self-start text-center rounded-full aspect-square ${existPosition('MC') ? 'bg-orange-500' : 'bg-neutral-500'} h-[35px]`}>
                        MC
                    </div>
                    <div className={`absolute left-[220px] top-[105px] flex justify-center items-center self-start text-center rounded-full aspect-square ${existPosition('MO') ? 'bg-orange-500' : 'bg-neutral-500'} h-[35px]`}>
                        MO
                    </div>
                    <div className={`absolute left-[280px] flex justify-center items-center self-start text-center rounded-full aspect-square ${existPosition('LW') ? 'bg-orange-500' : 'bg-neutral-500'} h-[35px]`}>
                        LW
                    </div>
                    <div className={`absolute left-[280px] top-[105px] flex justify-center items-center self-start text-center rounded-full aspect-square ${existPosition('ST') ? 'bg-orange-500' : 'bg-neutral-500'}  h-[35px]`}>
                        ST
                    </div>
                    <div className={`absolute left-[280px] top-[175px] flex justify-center items-center self-start text-center rounded-full aspect-square  ${existPosition('RW') ? 'bg-orange-500' : 'bg-neutral-500'} h-[35px]`}>
                        RW
                    </div>
                </div>

            </div>
        </>
    )
}
export default Terrain