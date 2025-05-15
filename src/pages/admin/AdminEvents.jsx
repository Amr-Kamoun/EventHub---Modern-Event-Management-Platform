import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch } from 'react-icons/fi'
import { getEvents, deleteEvent } from '../../lib/supabase'
import toast from 'react-hot-toast'

function AdminEvents() {
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
      toast.error('Failed to load events')
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
      toast.success('Event deleted successfully')
    } catch (error) {
      console.error('Error deleting event:', error)
      toast.error('Failed to delete event')
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Manage Events</h1>
          <p className="text-gray-600 dark:text-gray-400">Create, edit, and delete events on your platform</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/admin/events/new" className="btn-primary flex items-center">
            <FiPlus className="mr-2" />
            Create New Event
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
              placeholder="Search events..."
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
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
                            {isUpcoming ? 'Upcoming' : 'Past'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link to={`/events/${event.id}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white" title="View">
                              <FiEye />
                            </Link>
                            <Link to={`/admin/events/edit/${event.id}`} className="text-primary-500 hover:text-primary-700" title="Edit">
                              <FiEdit />
                            </Link>
                            <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(event)} title="Delete">
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

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-primary-500 text-primary-600 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Page {currentPage}</span>
              <button
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-primary-500 text-primary-600 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={events.length < eventsPerPage}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No events found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {search ? 'Try adjusting your search criteria' : 'Get started by creating your first event'}
            </p>
            {!search && (
              <Link to="/admin/events/new" className="btn-primary">
                Create New Event
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-500 dark:text-gray-300 mb-6">
              Are you sure you want to delete the event "{eventToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button className="btn-outline" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={handleDeleteConfirm}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminEvents
