// import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const PreLoader = () => {
  return (
    <div className='flex w-full h-full py-[350px] items-center justify-center'>
        <span>
            <AiOutlineLoading3Quarters className=" animate-spin text-blue-500 text-[50px] md:text-[70px]"/>
        </span>
    </div>
  )
}

export default PreLoader