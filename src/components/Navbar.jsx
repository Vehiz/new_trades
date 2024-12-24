import { useState, useEffect } from "react";
import PreLoader from "./PreLoader";
import Logo from '../assets/logoNew.png'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust this delay as needed

    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return <PreLoader />;
  }

  return (
    <nav className="bg-[#121D33] fixed top-[46px] md:top-[45px] w-full z-50 shadow-md border-b border-opacity-20 border-white">
      <div className=" md:mx-10 px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center text-white">
        <div className="flex items-center space-x-2 md:space-x-10">
          <h1 className="text-lg flex font-bold md:text-4xl">
            <a href="/" className="flex justify-center items-center gap-3">
              <img src={Logo} alt="logo" style={{ width: '65px', height: 'auto' }} />
              <div>
                <span className="text-5xl italic">B</span>lock<span className="italic text-gray-400">Mine</span>
              </div>
            </a>
          </h1>
        </div>
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <a href="/faq">
            <li className="list-none mt-2 text-[18px]"> 
              FAQ
            </li>
          </a>
          <a href="/login">
            <li className="list-none border hover:bg-[#2a4375] rounded-lg px-4 py-2">
              Log in
            </li>
          </a>
          <a href="/signup">
            <li className="list-none border bg-white hover:bg-gray-400 text-black rounded-lg px-4 py-2">
              Sign Up
            </li>
          </a>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            id="menu-btn"
            className="block text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div id="mobile-menu" className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <ul className="flex flex-col space-y-4 p-4 bg-[#121D33] border-t border-opacity-20 border-white">
          {/* <li>
            <a href="/about" className="block text-lg text-white hover:text-gray-300">
              About us
            </a>
          </li>
          <li>
            <a href="/contact" className="block text-lg text-white hover:text-gray-300">
              Contact
            </a>
          </li> */}
          <li>
            <a href="/login" className="block text-lg border hover:bg-[#2a4375] text-white rounded-lg px-4 py-2">
              Log in
            </a>
          </li>
          <li>
            <a href="/signup" className="block text-lg border bg-white hover:bg-gray-400 text-black rounded-lg px-4 py-2">
              Sign Up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
