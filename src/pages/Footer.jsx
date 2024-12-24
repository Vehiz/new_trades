// import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='block bg-[#fff] text-[14px] mx-[15px] mt-[15px] rounded-lg text-center py-[28px] shadow-outline-white shadow-md border'>
        <div className="text-gray-500">
            <p>Copyright © {year} BlockMine</p>
        </div>
    </footer>
  )
}

export default Footer