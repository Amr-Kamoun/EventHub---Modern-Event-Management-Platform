import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiUsers, FiCalendar, FiBarChart2, FiActivity, FiPlus } from 'react-icons/fi'
import { getEvents } from '../../lib/supabase'
import { useTranslation } from 'react-i18next'

function AdminDashboard() {
  const { t } = useTranslation()

  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalUsers: 0,
    totalRegistrations: 0,
  })

  const [recentEvents, setRecentEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const events = await getEvents()
        const now = new Date()
        const upcomingEvents = events.filter(event => new Date(event.date) > now)

        setStats({
          totalEvents: events.length,
          upcomingEvents: upcomingEvents.length,
          totalUsers: 120,
          totalRegistrations: 350,
        })

        setRecentEvents(events.slice(0, 5))
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('adminDashboard')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {t('dashboardOverview')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-full me-4 rtl:ms-4 rtl:me-0">
              <FiCalendar className="text-primary-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{t('totalEvents')}</p>
              <p className="text-2xl font-bold dark:text-white">{stats.totalEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="bg-secondary-100 p-3 rounded-full me-4 rtl:ms-4 rtl:me-0">
              <FiActivity className="text-secondary-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{t('upcomingEvents')}</p>
              <p className="text-2xl font-bold dark:text-white">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="bg-accent-100 p-3 rounded-full me-4 rtl:ms-4 rtl:me-0">
              <FiUsers className="text-accent-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{t('totalUsers')}</p>
              <p className="text-2xl font-bold dark:text-white">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full me-4 rtl:ms-4 rtl:me-0">
              <FiBarChart2 className="text-gray-600 dark:text-gray-300 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{t('totalRegistrations')}</p>
              <p className="text-2xl font-bold dark:text-white">{stats.totalRegistrations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6 mb-8">
        <h2 className="text-xl font-semibold dark:text-white mb-4">{t('quickActions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/events"
            className="btn bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 border border-blue-200 dark:border-transparent flex items-center justify-center py-3 rtl:flex-row-reverse"
          >
            <FiCalendar className="me-2 rtl:ms-2 rtl:me-0" />
            {t('manageEvents')}
          </Link>

          <Link
            to="/admin/users"
            className="btn bg-green-100 dark:bg-green-600 text-green-700 dark:text-white hover:bg-green-200 dark:hover:bg-green-700 border border-green-200 dark:border-transparent flex items-center justify-center py-3 rtl:flex-row-reverse"
          >
            <FiUsers className="me-2 rtl:ms-2 rtl:me-0" />
            {t('manageUsers')}
          </Link>

          <Link
            to="/admin/events/new"
            className="btn bg-yellow-100 dark:bg-yellow-600 text-yellow-700 dark:text-white hover:bg-yellow-200 dark:hover:bg-yellow-700 border border-yellow-200 dark:border-transparent flex items-center justify-center py-3 rtl:flex-row-reverse"
          >
            <FiPlus className="me-2 rtl:ms-2 rtl:me-0" />
            {t('createEvent')}
          </Link>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold dark:text-white">{t('recentEvents')}</h2>
          <Link to="/admin/events" className="text-primary-500 hover:text-primary-600">
            {t('viewAll')}
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {[t('event'), t('date'), t('location'), t('category'), t('status')].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {recentEvents.map((event) => {
                const eventDate = new Date(event.date)
                const isUpcoming = eventDate > new Date()

                return (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {eventDate.toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-300">{event.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {event.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        isUpcoming
                          ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      }`}>
                        {t(isUpcoming ? 'upcoming' : 'past')}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
