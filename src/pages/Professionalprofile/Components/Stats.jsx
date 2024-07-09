import React from "react";


const StatsD = () => {

    const getStatWidthFromPoints = (points , test ) => {
        const vitesse = 150 ; 
        const saut = 100; 
        const agility = 100 ; 
        const jonglage = 150;
        const tir = 300 ;
        const conduit = 200;

        if(test = vitesse){
            return (points * 100) / 150
        }

    }

    return (
        <>
            <div className="flex flex-col p-8 bg-white rounded-[10px] border border-solid border-neutral-200 text-zinc-900 max-md:px-5">
                <div className="text-3xl font-bold text-blue-600 max-md:max-w-full">
                    Stats
                </div>
                <div className="flex gap-2.5 justify-between mt-6 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                    <div className="text-base font-light">Vitesse</div>
                    <div className="text-lg font-bold text-right">40</div>
                </div>
                <div className="shrink-0 mt-3 h-2 bg-blue-600 rounded-lg w-[70%]" />
                <div className="flex gap-2.5 justify-between mt-4 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                    <div className="text-base font-light">Saut</div>
                    <div className="text-lg font-bold text-right">100</div>
                </div>
                <div className="shrink-0 mt-3 h-2 bg-blue-600 rounded-lg w-[100%]" />
                <div className="flex gap-2.5 justify-between mt-4 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                    <div className="text-base font-light">Agilité</div>
                    <div className="text-lg font-bold text-right">150</div>
                </div>
                <div className="shrink-0 mt-3 h-2 bg-blue-600 rounded-lg w-[25%]" />
                <div className="flex gap-2.5 justify-between mt-4 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                    <div className="text-base font-light">Jonglage</div>
                    <div className="text-lg font-bold text-right">120</div>
                </div>
                <div className="shrink-0 mt-3 h-2 bg-blue-600 rounded-lg w-[100%]" />
                <div className="flex gap-2.5 justify-between mt-4 max-md:flex-wrap max-md:max-w-full">
                    <div className="text-base font-light">Tir au but</div>
                    <div className="text-lg font-bold text-right">200</div>
                </div>
                <div className="shrink-0 mt-3 h-2 bg-blue-600 rounded-lg  w-[90%]" />
                <div className="flex gap-2.5 justify-between mt-4 max-md:flex-wrap max-md:max-w-full">
                    <div className="text-base font-light">Conduite de balle</div>
                    <div className="text-lg font-bold text-right">150</div>
                </div>
                <div className="shrink-0 mt-3 h-2 bg-blue-600 rounded-lg  w-[100%]" />
            </div>
        </>
    )
}
export default StatsD;