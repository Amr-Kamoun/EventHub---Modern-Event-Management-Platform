import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch } from 'react-icons/fi'
import { getEvents, deleteEvent } from '../../lib/supabase'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

function AdminEvents() {
  const { t } = useTranslation()

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [eventToDelete, setEventToDelete] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 10

  useEffect(() => {
    fetchEvents()
  }, [currentPage])

  const fetchEvents = async () => {
    try {
      const eventsData = await getEvents({}, currentPage, eventsPerPage)
      setEvents(eventsData)
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error(t('loadEventsFailed'))
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (event) => {
    setEventToDelete(event)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return

    try {
      await deleteEvent(eventToDelete.id)
      setEvents(events.filter(event => event.id !== eventToDelete.id))
      toast.success(t('deleteSuccess'))
    } catch (error) {
      console.error('Error deleting event:', error)
      toast.error(t('deleteFailed'))
    } finally {
      setShowDeleteModal(false)
      setEventToDelete(null)
    }
  }

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.location.toLowerCase().includes(search.toLowerCase()) ||
    event.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 dark:text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('manageEvents')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('manageEventsDesc')}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/admin/events/new" className="btn-primary flex items-center">
            <FiPlus className="mr-2" />
            {t('createEvent')}
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 dark:text-gray-300" />
            </div>
            <input
              type="text"
              placeholder={t('searchEvents')}
              className="form-input pl-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredEvents.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {[t('event'), t('date'), t('location'), t('category'), t('status'), t('actions')].map((label, i) => (
                      <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredEvents.map((event) => {
                    const eventDate = new Date(event.date)
                    const isUpcoming = eventDate > new Date()

                    return (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">{eventDate.toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">{event.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
                            {event.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            isUpcoming
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {isUpcoming ? t('upcoming') : t('past')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link to={`/events/${event.id}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white" title={t('viewDetails')}>
                              <FiEye />
                            </Link>
                            <Link to={`/admin/events/edit/${event.id}`} className="text-primary-500 hover:text-primary-700" title={t('edit')}>
                              <FiEdit />
                            </Link>
                            <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(event)} title={t('delete')}>
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-primary-500 text-primary-600 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                {t('previous')}
              </button>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{t('page')} {currentPage}</span>
              <button
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-primary-500 text-primary-600 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={events.length < eventsPerPage}
              >
                {t('next')}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('noEventsFound')}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {search ? t('noEventsMessage') : t('createPrompt')}
            </p>
            {!search && (
              <Link to="/admin/events/new" className="btn-primary">
                {t('createEvent')}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('confirmDelete')}</h3>
            <p className="text-gray-500 dark:text-gray-300 mb-6">
              {t('deleteMessage', { title: eventToDelete?.title })}
            </p>
            <div className="flex justify-end space-x-3">
              <button className="btn-outline" onClick={() => setShowDeleteModal(false)}>{t('cancel')}</button>
              <button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={handleDeleteConfirm}>{t('delete')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminEvents
