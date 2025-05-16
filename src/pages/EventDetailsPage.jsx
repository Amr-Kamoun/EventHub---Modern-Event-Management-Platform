import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import {
  FiCalendar, FiMapPin, FiClock, FiUser, FiTag, FiShare2, FiHeart, FiArrowLeft
} from 'react-icons/fi'
import {
  getEventById,
  registerForEvent,
  cancelRegistration,
  getUserRegistrations
} from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import React from 'react'

function EventDetailsPage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isRegistered, setIsRegistered] = useState(false)
  const [registrationLoading, setRegistrationLoading] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id)
        setEvent(eventData)

        if (user) {
          const registrations = await getUserRegistrations(user.id)
          const isUserRegistered = registrations.some(reg => String(reg.event_id) === String(id))
          setIsRegistered(isUserRegistered)
        }
      } catch (error) {
        console.error('Error fetching event:', error)
        toast.error(t('eventLoadError'))
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id, user, t])

  const handleRegister = async () => {
    if (!user) {
      toast.error(t('loginToRegister'))
      navigate('/login')
      return
    }

    setRegistrationLoading(true)

    try {
      await registerForEvent(user.id, id)
      setIsRegistered(true)
      toast.success(t('registerSuccess'))
    } catch (error) {
      console.error('Error registering for event:', error)
      toast.error(t('registerFail'))
    } finally {
      setRegistrationLoading(false)
    }
  }

  const handleCancelRegistration = async () => {
    setRegistrationLoading(true)

    try {
      await cancelRegistration(user.id, id)
      setIsRegistered(false)
      toast.success(t('cancelSuccess'))
    } catch (error) {
      console.error('Error cancelling registration:', error)
      toast.error(t('cancelFail'))
    } finally {
      setRegistrationLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('eventNotFound')}</h2>
        <p className="mb-6">{t('eventMissing')}</p>
        <Link to="/events" className="btn-primary">
          {t('browseEvents')}
        </Link>
      </div>
    )
  }

  const { title, description, image, date, time, location, organizer, category, price } = event
  const formattedDate = format(new Date(date), 'EEEE, MMMM d, yyyy')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/events" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
        <FiArrowLeft />
        <span>{t('backToEvents')}</span>
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft overflow-hidden transition-colors">
        <div className="relative h-64 md:h-96">
          <img
            src={image || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg'}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 end-4 bg-accent-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            {category}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4 dark:text-white">{title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-300 rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
                  <FiCalendar className="text-primary-500" />
                  <span>{formattedDate}</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300 rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
                  <FiClock className="text-primary-500" />
                  <span>{time || '7:00 PM'}</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300 rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
                  <FiMapPin className="text-primary-500" />
                  <span>{location}</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300 rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
                  <FiUser className="text-primary-500" />
                  <span>{organizer || 'EventHub'}</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 dark:text-white">{t('aboutEvent')}</h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{description}</p>
              </div>
            </div>

            <div className="w-full md:w-80 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors">
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {price ? `$${price}` : t('free')}
                </span>
              </div>

              {isRegistered ? (
                <button
                  className="w-full btn bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-gray-900 mb-4"
                  onClick={handleCancelRegistration}
                  disabled={registrationLoading}
                >
                  {registrationLoading ? t('processing') : t('cancelRegistration')}
                </button>
              ) : (
                <button
                  className="w-full btn-primary mb-4"
                  onClick={handleRegister}
                  disabled={registrationLoading}
                >
                  {registrationLoading ? t('processing') : t('registerNow')}
                </button>
              )}

              <div className="flex justify-between rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
                <button className="btn-outline flex items-center rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
                  <FiHeart />
                  <span>{t('save')}</span>
                </button>
                <button className="btn-outline flex items-center rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
                  <FiShare2 />
                  <span>{t('share')}</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <h3 className="font-semibold mb-2 dark:text-white">{t('eventDetails')}</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
                    <FiTag className="mt-0.5 text-gray-500 dark:text-gray-400" />
                    <span>{category}</span>
                  </li>
                  <li className="flex items-start rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
                    <FiUser className="mt-0.5 text-gray-500 dark:text-gray-400" />
                    <span>{t('organizedBy')} {organizer || 'EventHub'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsPage
