import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi'
import { signUp } from '../lib/supabase'
import toast from 'react-hot-toast'
import React from 'react'
import { useTranslation } from 'react-i18next'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRules, setShowRules] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
  const isValidEmail = emailRegex.test(email)

  const hasMinLength = password.length >= 6
  const hasUpperLower = /(?=.*[a-z])(?=.*[A-Z])/.test(password)
  const hasNumberSymbol = /(?=.*\d)(?=.*[!@#$%^&*])/.test(password)
  const passwordsMatch = confirmPassword === password && confirmPassword.length > 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!isValidEmail) {
      setError('Invalid email format')
      return
    }

    if (!hasMinLength || !hasUpperLower || !hasNumberSymbol) {
      setError(t('passwordWeak'))
      return
    }

    if (password !== confirmPassword) {
      setError(t('passwordMismatch'))
      return
    }

    setLoading(true)

    try {
      await signUp(email, password)
      toast.success(t('signupSuccess'))
      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error)
      setError(error.message || t('signupError'))
      toast.error(t('signupFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8 rounded-xl shadow-soft">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">{t('register')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('signupPrompt')}</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 border-s-4 border-red-500 p-4 mb-4">
            <div className="flex items-center rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
              <FiAlertCircle className="text-red-500" />
              <span className="text-red-700 dark:text-red-100">{error}</span>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="form-label dark:text-gray-300">
                {t('email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400 dark:text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`form-input ps-10 pr-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border ${
                    email === '' ? 'border-gray-300 dark:border-gray-600' : isValidEmail ? 'border-green-500' : 'border-red-500'
                  }`}
                  placeholder={t('email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {email !== '' && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg">
                    {isValidEmail ? '✅' : '❌'}
                  </span>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="form-label dark:text-gray-300">
                {t('password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400 dark:text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="form-input ps-10 pr-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
                  placeholder={t('password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setShowRules(true)}
                  onBlur={() => setShowRules(false)}
                />
                {password && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg">
                    {hasMinLength && hasUpperLower && hasNumberSymbol ? '✅' : '❌'}
                  </span>
                )}
              </div>

              {/* Password Rules */}
              {showRules && (
                <div className="text-xs mt-2 space-y-1">
                  <p className={hasMinLength ? 'text-green-500' : 'text-red-500'}>
                    {hasMinLength ? '✅' : '❌'} {t('atLeast6')}
                  </p>
                  <p className={hasUpperLower ? 'text-green-500' : 'text-red-500'}>
                    {hasUpperLower ? '✅' : '❌'} {t('upperLower')}
                  </p>
                  <p className={hasNumberSymbol ? 'text-green-500' : 'text-red-500'}>
                    {hasNumberSymbol ? '✅' : '❌'} {t('numberSymbol')}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirm-password" className="form-label dark:text-gray-300">
                {t('confirmPassword')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400 dark:text-gray-400" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`form-input ps-10 pr-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border ${
                    confirmPassword === ''
                      ? 'border-gray-300 dark:border-gray-600'
                      : passwordsMatch
                      ? 'border-green-500'
                      : 'border-red-500'
                  }`}
                  placeholder={t('confirmPassword')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword !== '' && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg">
                    {passwordsMatch ? '✅' : '❌'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="terms" className="ms-2 block text-sm text-gray-700 dark:text-gray-300">
              {t('terms')}
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn-primary w-full py-3"
              disabled={loading}
            >
              {loading ? t('creatingAccount') : t('createAccount')}
            </button>
          </div>

          {/* Footer Text */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('alreadyHaveAccount')}{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                {t('signIn')}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
