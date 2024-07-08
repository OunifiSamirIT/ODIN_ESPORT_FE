import React from "react";
import Header from '../components/Header2'
import { toast, ToastContainer } from 'react-toastify';

const HomeLayout = ({ style, children }) => {

  return (
    <>

      <div style={style} className="bg-gray-200 min-h-screen overflow-hidden font-sans">

        <Header />

        <div style={style} className="max-w-[1344px] mx-auto my-2 md:my-5 px-2">
          {children}
        </div>
      </div>
    </>
  )

}


export default HomeLayout