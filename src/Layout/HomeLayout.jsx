import React from "react";
import Header from '../components/Header2'


const HomeLayout = ({children}) => {

return(
  <>

   <div className="bg-zinc-100 min-h-screen overflow-hidden font-sans">
    <Header/>
    <div className="max-w-[1344px] mx-auto my-5 ">
      {children}
    </div>
   </div>
  </>
)

}


export default HomeLayout