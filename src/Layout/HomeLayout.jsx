import React from "react";
import Header from '../components/Header2'


const HomeLayout = ({children}) => {

return(
  <>

   <div className="bg-gray-200 min-h-screen overflow-hidden font-sans">
    <Header/>
<<<<<<< HEAD
    <div className="max-w-[1344px] mx-auto my-2 md:my-5 ">
      {children}
=======
   
    <div className="max-w-[1344px] mx-auto my-2 md:my-5 ">
      {children} 
>>>>>>> a137c1d2c1a9b134fb024a06a6f838c3723e75b4
    </div>
   </div>
  </>
)

}


export default HomeLayout