import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiUsers, FiCalendar, FiBarChart2, FiActivity, FiPlus } from 'react-icons/fi'
import { getEvents } from '../../lib/supabase'

function AdminDashboard() {
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
          totalUsers: 120, // TODO: Replace with real Supabase query
          totalRegistrations: 350, // TODO: Replace with real Supabase query
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Overview of your events, users, and platform statistics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-full mr-4">
              <FiCalendar className="text-primary-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Events</p>
              <p className="text-2xl font-bold dark:text-white">{stats.totalEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="bg-secondary-100 p-3 rounded-full mr-4">
              <FiActivity className="text-secondary-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Upcoming Events</p>
              <p className="text-2xl font-bold dark:text-white">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="bg-accent-100 p-3 rounded-full mr-4">
              <FiUsers className="text-accent-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold dark:text-white">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full mr-4">
              <FiBarChart2 className="text-gray-600 dark:text-gray-300 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Registrations</p>
              <p className="text-2xl font-bold dark:text-white">{stats.totalRegistrations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6 mb-8">
        <h2 className="text-xl font-semibold dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/events"
            className="btn bg-primary-50 dark:bg-primary-600 text-primary-700 dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700 border border-primary-200 dark:border-transparent flex items-center justify-center py-3"
          >
            <FiCalendar className="mr-2" />
            Manage Events
          </Link>

          <Link
            to="/admin/users"
            className="btn bg-secondary-50 dark:bg-secondary-600 text-secondary-700 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-700 border border-secondary-200 dark:border-transparent flex items-center justify-center py-3"
          >
            <FiUsers className="mr-2" />
            Manage Users
          </Link>

          <Link
            to="/admin/events/new"
            className="btn bg-accent-50 dark:bg-accent-600 text-accent-700 dark:text-white hover:bg-accent-100 dark:hover:bg-accent-700 border border-accent-200 dark:border-transparent flex items-center justify-center py-3"
          >
            <FiPlus className="mr-2" />
            Create New Event
          </Link>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold dark:text-white">Recent Events</h2>
          <Link to="/admin/events" className="text-primary-500 hover:text-primary-600">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Event', 'Date', 'Location', 'Category', 'Status'].map((header) => (
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
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          isUpcoming
                            ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {isUpcoming ? 'Upcoming' : 'Past'}
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
