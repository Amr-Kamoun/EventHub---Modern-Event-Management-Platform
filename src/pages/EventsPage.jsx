import { useState, useEffect } from 'react'
import { getEvents, getUserRegistrations } from '../lib/supabase' // ✅ added
import { useAuth } from '../contexts/AuthContext' // ✅ added
import EventCard from '../components/EventCard'
import EventFilter from '../components/EventFilter'
import React from 'react';

function EventsPage() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [registeredEventIds, setRegisteredEventIds] = useState([]) // ✅ added
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({})
  const { user } = useAuth() // ✅ added
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents()
        setEvents(eventsData)
        setFilteredEvents(eventsData)

        if (user) {
          const registrations = await getUserRegistrations(user.id)
          const ids = registrations.map(r => r.event_id)
          setRegisteredEventIds(ids)
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [user]) // ✅ rerun when user is available

  const handleFilter = async (filterParams) => {
    setFilters(filterParams)
    setLoading(true)

    try {
      if (
        Object.keys(filterParams).length === 0 ||
        (filterParams.search === '' &&
          filterParams.category === '' &&
          filterParams.date === '')
      ) {
        setFilteredEvents(events)
      } else {
        const filteredData = await getEvents(filterParams)
        setFilteredEvents(filteredData)
      }
    } catch (error) {
      console.error('Error filtering events:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Events</h1>
        <p className="text-gray-600">
          Browse and find events that match your interests. Use the filters to narrow down your search.
        </p>
      </div>

      <EventFilter onFilter={handleFilter} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isRegistered={registeredEventIds.includes(event.id)} // ✅ pass registration status
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-gray-500 mb-4">
            We couldn't find any events matching your criteria. Try adjusting your filters.
          </p>
          <button className="btn-outline" onClick={() => handleFilter({})}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default EventsPage
