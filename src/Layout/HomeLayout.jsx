import React from "react";
import Header from '../components/Header2'
import { toast, ToastContainer } from 'react-toastify';

const HomeLayout = ({ children }) => {

  return (
    <>

      <div className="bg-gray-200 min-h-screen overflow-hidden font-sans">

        <Header />

        <div className="max-w-[1344px] mx-auto my-2 md:my-5 px-2">
          {children}
        </div>
      </div>
    </>
  )

}


export default HomeLayout