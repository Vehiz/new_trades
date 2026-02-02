import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/logoNew.png'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-11 w-full z-50 border-b border-white/10 bg-[#0f172a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f172a]/80">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 py-2.5 text-white">
        <div className="flex items-center space-x-2 sm:space-x-6">
          <h1 className="text-base sm:text-lg md:text-xl flex font-semibold">
            <Link to="/" className="flex justify-center items-center gap-2">
              <img src={Logo} alt="logo" className="w-10 sm:w-12 h-auto" />
              <div className="leading-none">
                <span className="text-xl sm:text-2xl md:text-3xl italic">B</span>lock
                <span className="italic text-gray-400">Trade</span>
              </div>
            </Link>
          </h1>
        </div>
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/faq" className="list-none text-sm font-medium text-white/80 hover:text-white">
            FAQ
          </Link>
          <Link to="/login" className="list-none text-sm text-white/80 hover:text-white px-2">
            Log in
          </Link>
          <Link to="/signup" className="list-none bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3.5 py-1.5 text-sm font-semibold">
            Get Started
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            id="menu-btn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
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
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden border-t border-white/10 bg-[#0b1226]/95`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-3">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                to="/faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/5 hover:text-white"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/5 hover:text-white"
              >
                Log in
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
