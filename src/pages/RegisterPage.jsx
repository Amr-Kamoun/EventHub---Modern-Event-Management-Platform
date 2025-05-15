import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi'
import { signUp } from '../lib/supabase'
import toast from 'react-hot-toast'
import React from 'react';

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await signUp(email, password)
      toast.success('Account created successfully! Please check your email to confirm your account.')
      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error)
      setError(error.message || 'Failed to create account')
      toast.error('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8 rounded-xl shadow-soft">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-gray-600 dark:text-gray-400">Join EventHub to discover and attend amazing events</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex items-center">
              <FiAlertCircle className="text-red-500 mr-2" />
              <span className="text-red-700 dark:text-red-100">{error}</span>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label dark:text-gray-300">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400 dark:text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-input pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400 dark:text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="form-input pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            <div>
              <label htmlFor="confirm-password" className="form-label dark:text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400 dark:text-gray-400" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="form-input pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              I agree to the{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                Privacy Policy
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="btn-primary w-full py-3"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
