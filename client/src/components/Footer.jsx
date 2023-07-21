import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="container-fluid mt-20">
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-medium text-white">
                Subscribe to our newsletter
              </h4>
              <p className="mt-4 text-base text-gray-400">
                Stay up to date with our latest news and products.
              </p>
              <form className="mt-4 flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none w-full px-5 py-3 sm:max-w-xs text-base leading-6 text-gray-900 placeholder-gray-500 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
                  placeholder="Enter your email"
                />
                <div className="ml-3">
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-[#FCD12A] hover:bg-[#004c00] focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
            <div>
              <div className="mt-4 flex justify-center space-x-6 flex-wrap text-2xl">
                <a href="#" className="text-gray-400 hover:text-white font-20">
                  <span className="sr-only">Facebook</span>
                  <FaFacebook />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <FaTwitter />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <FaInstagram />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm leading-5 font-medium text-white">
                Legal
              </h4>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-400 hover:text-white"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm leading-5 font-medium text-white">
                Company
              </h4>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-400 hover:text-white"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-400 hover:text-white"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-400 hover:text-white"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm leading-5 font-medium text-white">
                Resources
              </h4>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-400 hover:text-white"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-400 hover:text-white"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-400 hover:text-white"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-base leading-6 text-gray-400 xl:text-center">
              © 2023 Craft-connect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
