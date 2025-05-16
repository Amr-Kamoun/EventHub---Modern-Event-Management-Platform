import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../lib/supabase';
import toast from 'react-hot-toast';
import DarkModeToggle from './DarkModeToggle';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const handleLangChange = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success(t('logoutSuccess'));
      navigate('/');
      closeMenus();
    } catch (error) {
      toast.error(t('logoutError'));
      console.error(error);
    }
  };

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/events', label: t('events') },
    ...(isAdmin ? [{ path: '/admin', label: t('admin') }] : [])
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 rtl:flex-row-reverse">
          {/* Left */}
          <div className="flex items-center gap-4 rtl:flex-row-reverse">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenus}>
              <span className="text-primary-500 font-bold text-xl">EventHub</span>
            </Link>
            <div className="hidden sm:flex items-center gap-4">
              {navLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    isActive
                      ? 'border-primary-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="hidden sm:flex items-center gap-4 rtl:flex-row-reverse">
            <DarkModeToggle />
            <button
              onClick={toggleLanguage}
              className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
            >
              {currentLang === 'en' ? 'العربية' : 'English'}
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('welcomeBack')}
                </span>
                <div className="relative">
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-800 rounded-full flex text-sm focus:outline-none"
                    onClick={toggleProfileMenu}
                  >
                    <span className="sr-only">{t('openUserMenu')}</span>
                    <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-700 flex items-center justify-center text-primary-800 dark:text-white">
                      <FiUser />
                    </div>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={closeMenus}
                      >
                        {t('profile')}
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={closeMenus}
                        >
                          {t('adminDashboard')}
                        </Link>
                      )}
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={handleSignOut}
                      >
                        {t('signOut')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 rtl:flex-row-reverse">
                <Link to="/login" className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-3 py-2 text-sm font-medium">
                  {t('login')}
                </Link>
                <Link to="/register" className="bg-primary-500 text-white hover:bg-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  {t('signUp')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu remains unchanged */}
    </nav>
  );
}

export default Navbar;
