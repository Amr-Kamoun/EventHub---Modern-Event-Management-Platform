import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from 'react-i18next' // ✅ Added
import React from 'react';

function NotFoundPage() {
  const { t } = useTranslation() // ✅ Added

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center text-gray-800 dark:text-white">
        <h1 className="text-9xl font-bold text-primary-500">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-2">{t('notFoundTitle')}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">{t('notFoundMessage')}</p>
        <Link to="/" className="btn-primary inline-flex items-center rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
          <FiArrowLeft />
          <span>{t('backToHome')}</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
