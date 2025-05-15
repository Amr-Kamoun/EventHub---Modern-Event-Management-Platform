import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import React from 'react';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-primary-500">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage