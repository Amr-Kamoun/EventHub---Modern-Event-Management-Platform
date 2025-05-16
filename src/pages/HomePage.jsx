import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { getEvents, getUserRegistrations } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import EventCard from '../components/EventCard'
import React from 'react'
import { useTranslation } from 'react-i18next'

function HomePage() {
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [registeredEventIds, setRegisteredEventIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const { user } = useAuth()
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6

  useEffect(() => {
    let isMounted = true

    const fetchEvents = async () => {
      try {
        setLoading(true)
        setFetchError(null)

        const [upcoming, all] = await Promise.all([
          getEvents({}, currentPage, eventsPerPage),
          getEvents({}, 1, 100)
        ])

        if (!isMounted) return

        setFeaturedEvents(all.slice(0, 3))
        setUpcomingEvents(upcoming)

        if (user?.id) {
          const registrations = await getUserRegistrations(user.id)
          if (!isMounted) return
          const ids = registrations.map(r => r.event_id)
          setRegisteredEventIds(ids)
        }
      } catch (error) {
        console.error("[HomePage] Error fetching events:", error)
        if (isMounted) setFetchError(error.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchEvents()

    return () => {
      isMounted = false
    }
  }, [user, currentPage])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('heroTitle')}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{t('heroSubtitle')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/events" className="btn bg-white text-primary-600 hover:bg-gray-100 dark:bg-primary-600 dark:text-white dark:hover:bg-primary-700 text-lg px-6 py-3">
              {t('browseEvents')}
            </Link>
            <Link to="/register" className="btn bg-accent-500 text-white hover:bg-accent-600 text-lg px-6 py-3">
              {t('signUpNow')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('featuredEvents')}</h2>
            <Link to="/events" className="text-primary-500 hover:text-primary-600 flex items-center">
              {t('viewAll')} <FiArrowRight className="ml-2" />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : fetchError ? (
            <div className="text-center text-red-600 mt-6">{fetchError}</div>
          ) : featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} isRegistered={registeredEventIds.includes(event.id)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <p className="text-gray-500 dark:text-gray-300">{t('noFeatured')}</p>
              <Link to="/events" className="mt-4 inline-block text-primary-500 hover:text-primary-600">{t('browseAll')}</Link>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('howItWorks')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('howItWorksDesc')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 dark:bg-primary-700 dark:text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {num}
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{t(`howStep${num}Title`)}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t(`howStep${num}Desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('upcomingEvents')}</h2>
            <Link to="/events" className="text-primary-500 hover:text-primary-600 flex items-center">
              {t('viewAll')} <FiArrowRight className="ml-2" />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : upcomingEvents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} isRegistered={registeredEventIds.includes(event.id)} />
                ))}
              </div>
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  className="px-4 py-2 bg-white dark:bg-gray-700 text-primary-600 border border-primary-500 rounded disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  {t('previous')}
                </button>
                <span className="text-gray-700 dark:text-gray-200 font-medium">
                  {t('page')} {currentPage}
                </span>
                <button
                  className="px-4 py-2 bg-white dark:bg-gray-700 text-primary-600 border border-primary-500 rounded disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={upcomingEvents.length < eventsPerPage}
                >
                  {t('next')}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <p className="text-gray-500 dark:text-gray-300">{t('noUpcoming')}</p>
              <Link to="/events" className="mt-4 inline-block text-primary-500 hover:text-primary-600">
                {t('browseAll')}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent-500 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{t('ctaDesc')}</p>
          <Link
            to="/register"
            className="btn bg-white text-accent-600 hover:bg-gray-100 dark:bg-accent-600 dark:text-white dark:hover:bg-accent-700 text-lg px-6 py-3"
          >
            {t('getStarted')}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
