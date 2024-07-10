import React , {useRef , useEffect} from 'react';
import gsap from "gsap"


const StatBar = ({exercice , value} ) => {
    let points = 150 ;

    const calculatePoucentagePoints = (points , value)  => {
        console.log('vittt' , (value * 100)/points , 'poo')
        return (value * 100)/points + '%' ;
    }
     const lineRef = useRef();
     useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(
          lineRef.current,
          { width: '0%' },
          { width: calculatePoucentagePoints(points , value), duration: 1, ease: 'power1.in' }
        );
      }, []);






    return (
        <>
            <div className="flex gap-2.5 justify-between mt-6 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <div className="text-base font-light">{exercice}</div>
                <div className="text-lg font-bold text-right">{value}</div>
            </div>
            <div ref={lineRef} className="shrink-0 transition-all ease-in-out duration-300 mt-3 h-2 bg-blue-600 rounded-lg" />
        </>
    )
}
export default StatBar