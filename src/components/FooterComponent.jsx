import { Link } from 'react-router-dom'
import { FiGithub, FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-white dark:bg-gray-800 dark:text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-bold text-white dark:text-white">EventHub</Link>
            <p className="mt-2 text-gray-300 text-sm">
              {t('footerDescription')}
            </p>
            <div className="mt-4 flex flex-row-reverse gap-6 rtl:flex-row">
              <a href="#" className="text-gray-400 hover:text-white">
                <FiFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiGithub className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('navigation')}</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-300 hover:text-white">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-base text-gray-300 hover:text-white">
                  {t('events')}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-base text-gray-300 hover:text-white">
                  {t('profile')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('legal')}</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  {t('privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  {t('terms')}
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  {t('cookies')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">
            &copy; {currentYear} EventHub. {t('rightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
