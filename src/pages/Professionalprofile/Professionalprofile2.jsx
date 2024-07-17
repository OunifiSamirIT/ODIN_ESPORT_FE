import React, { useEffect, useState } from 'react'
import Header from '../../components/Header2'
import PlayerCard from './Components/PlayerCard'
import RadarChart from './Components/RadarChart'
import Stats from './Components/Stats'
import { useParams } from 'react-router-dom'
import { Config } from '../../config'
import PDFGenerator from '../../components/testCompoenent'

const Professionalprofile2 = () => {
    const {id}  = useParams()
    const [player, setPlayer] = useState(null)
    const fetchPlayer = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}`)
        const result = await response.json()
        setPlayer(result)
    }
    
    useEffect(() => {
        fetchPlayer()
    },[])

    return (
        <>
            <div className='bg-slate-200'>
                <Header />
                {/* <PDFGenerator /> */}
                <div className='pt-28 md:mt-0 md:pt-0 max-w-[1344px] mx-auto my-2 md:my-5 px-2'>
                    <div className="flex justify-center items-center p-4   text-xl font-bold bg-white  max-w-full text-zinc-900 max-md:px-5 rounded-[10px] md:mt-24 mx-3">
                        <div className="flex justify-between gap-4 ">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b348bb5914f01f4bea3769171d476deaec8d73658551a779924cf02048c40fc?apiKey=565f43eb1fcf430087160894dfb02980&"
                                className="shrink-0 my-auto aspect-[1.72] fill-blue-600 w-[52px]"
                            />
                            <div>Professional Profiling</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 max-w-full mt-3 px-3">
                        <div className="col-span-12 md:col-span-3 w-full">
                            <PlayerCard player={player}/>
                        </div>
                        <div className="col-span-12 md:col-span-9">
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className='flex-1 w-full'>
                                    <Stats id={id}/>
                                </div>
                                <div className='flex-1 items-center justify-center'>
                                   <RadarChart id={id} />
                                </div>
                            </div>
                            <div className="flex flex-col   mr-6 md:mr-0 px-6 py-8 mt-3 bg-white rounded-[10px] max-md:px-5 max-md:max-w-full">
                                <div className="justify-center self-start text-3xl font-bold text-zinc-900">
                                    Vidéo test collective
                                </div>
                                <div className="flex flex-col justify-center mt-6 max-md:max-w-full">
                                    <div className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 min-h-[380px] max-md:px-5 max-md:max-w-full">
                                        <img
                                            loading="lazy"
                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/35b4f8b0a83ec0f28ea66e73e53832713fd3c41ffc50f7dc5492370b5e0ad48b?apiKey=565f43eb1fcf430087160894dfb02980&"
                                            className="object-cover absolute inset-0 size-full"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d596f7eb90cf572345ffcf85e085370e9d30d7dc837c4d3b4c64dc6c16657db?apiKey=565f43eb1fcf430087160894dfb02980&"
                                            className="mt-20 mb-11 aspect-square w-[70px] max-md:my-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </>

    )
}
export default Professionalprofile2