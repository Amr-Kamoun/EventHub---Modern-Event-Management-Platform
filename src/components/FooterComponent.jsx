import { Link } from 'react-router-dom'
import { FiGithub, FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi'
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-bold dark:text-white">EventHub</Link>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
              Discover and attend the best events in your area. From conferences to concerts, 
              find everything you need to know in one place.
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-800 dark:hover:text-white">
                <span className="sr-only">Facebook</span>
                <FiFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-800 dark:hover:text-white">
                <span className="sr-only">Instagram</span>
                <FiInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-800 dark:hover:text-white">
                <span className="sr-only">Twitter</span>
                <FiTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-800 dark:hover:text-white">
                <span className="sr-only">GitHub</span>
                <FiGithub className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-500 dark:text-gray-400">
              &copy; {currentYear} EventHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
