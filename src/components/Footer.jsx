// import React from 'react'
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Block Mine</h3>
            <p className="text-gray-400 mb-4">
              Your trusted platform for cryptocurrency and stock market trading. Get real-time insights and professional tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaTelegram size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-blue-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-blue-500 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Trading */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Trade Mining</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/account/dashboard" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/account/deposit" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Deposit
                </Link>
              </li>
              <li>
                <Link to="/account/withdraw" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Withdraw
                </Link>
              </li>
              <li>
                <Link to="/account/transactions" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Transactions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and trading insights.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {year} Block Mine. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/terms" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="/terms" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
