// import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
// import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#02021E] text-gray-500">
      <div className=" py-12 px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h2 className="font-bold text-lg text-white">BlockMine</h2>
            <p>
              Bitmine remains the easiest, safest and fastest web app for
              cryptocurrency trading, exchange and investments globally.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-bold text-white">Product</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Exchange
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Investment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Trading
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="font-bold text-white">Contact Us</h2>
            <ul className="space-y-2">
              <li className="flex space-x-2">
                <MdOutlineMarkEmailUnread className="text-[22px]" />
                <a href="#" className="hover:text-gray-300">
                  support@blocktrademine.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300"></a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="font-bold text-white">Resources</h2>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="hover:text-gray-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gray-300">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gray-300">
                  Terms & conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p>©{new Date().getFullYear()} BlockMine. All rights reserved</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
