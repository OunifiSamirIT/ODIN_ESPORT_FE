import React , {useRef , useEffect} from 'react';
import gsap from "gsap"


const StatBar = ({exercice , value} ) => {

    let vitesse = 150 ;
    let saut = 100 ;
    let conduit = 100 ;
    let agilite = 100;
    let jonglage = 150;
    let tir = 300;
    const calculatePoucentagePoints = (value)  => {
        if(exercice == 'vitesse'){
            return (value * 100) / vitesse  ;
        }
        if(exercice == 'saut'){
            return (value * 100) / saut  ;
        }
        if(exercice == 'Conduite de balle'){
            return (value * 100) / conduit  ;
        }
        if(exercice == 'Agilité'){
            return (value * 100) / agilite  ;
        }
        if(exercice == 'Jonglage'){
            return (value * 100) / jonglage  ;
        }
        if(exercice == 'Tir au but'){
            return (value * 100) / tir;  ;
        }

        
    }
     const lineRef = useRef();
     useEffect(() => {
        console.log('exxeerc',exercice)
        console.log('valuevaluevalue',value + exercice )
        const tl = gsap.timeline();
        tl.fromTo(
          lineRef.current,
          { width: '0%' },
          { width: calculatePoucentagePoints(value)+'%' , duration: 0.5, ease: 'power3.in' }
        );
      }, [value]);






    return (
        <>
            <div className="flex gap-2.5 justify-between mt-6 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <div className="text-base font-light">{exercice}</div>
                <div className="text-lg font-bold text-right">{value}</div>
            </div>
            <div ref={lineRef} className="max-w-[100%] shrink-0 transition-all ease-in-out duration-300 mt-3 h-2 bg-blue-600 rounded-lg" />
        </>
    )
}
export default StatBar