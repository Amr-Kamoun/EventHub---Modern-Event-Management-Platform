import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../lib/supabase';
import toast from 'react-hot-toast';
import DarkModeToggle from './DarkModeToggle';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
      closeMenus();
    } catch (error) {
      toast.error('Error signing out');
      console.error(error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenus}>
              <span className="text-primary-500 font-bold text-xl">EventHub</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {['/', '/events', '/admin'].map((path, i) => {
                const name = ['Home', 'Events', 'Admin'][i];
                const condition = name !== 'Admin' || isAdmin;
                return condition ? (
                  <NavLink
                    key={name}
                    to={path}
                    end={name === 'Home'}
                    className={({ isActive }) =>
                      isActive
                        ? 'border-primary-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                    }
                  >
                    {name}
                  </NavLink>
                ) : null;
              })}
            </div>
          </div>

          {/* Right section */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <DarkModeToggle />
            {user ? (
              <div className="ml-3 relative">
                <button
                  type="button"
                  className="bg-white dark:bg-gray-800 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={toggleProfileMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-700 flex items-center justify-center text-primary-800 dark:text-white">
                    <FiUser />
                  </div>
                </button>

                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={closeMenus}
                    >
                      Your Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={closeMenus}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-500 text-white hover:bg-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-800">
          <div className="pt-2 pb-3 space-y-1">
            {['/', '/events', '/admin'].map((path, i) => {
              const name = ['Home', 'Events', 'Admin'][i];
              const condition = name !== 'Admin' || isAdmin;
              return condition ? (
                <NavLink
                  key={name}
                  to={path}
                  end={name === 'Home'}
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-600 text-primary-700 dark:text-white block pl-3 pr-4 py-2 border-l-4 border-primary-500 text-base font-medium'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  }
                  onClick={closeMenus}
                >
                  {name}
                </NavLink>
              ) : null;
            })}
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {user ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-700 flex items-center justify-center text-primary-800 dark:text-white">
                      <FiUser className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-gray-100">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeMenus}
                  >
                    Your Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={closeMenus}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    className="w-full text-left block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={closeMenus}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={closeMenus}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
