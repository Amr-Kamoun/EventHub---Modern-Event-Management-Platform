import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { getEvents, getUserRegistrations } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import EventCard from '../components/EventCard'
import React from 'react'

function HomePage() {
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [registeredEventIds, setRegisteredEventIds] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6

  useEffect(() => {
    const fetchEvents = async () => {
      console.log("[HomePage] Fetching events (paginated)...")
      try {
        const upcoming = await getEvents({}, currentPage, eventsPerPage)
        const all = await getEvents() // For featured

        setFeaturedEvents(all.slice(0, 3))
        setUpcomingEvents(upcoming)

        if (user) {
          const registrations = await getUserRegistrations(user.id)
          const ids = registrations.map(r => r.event_id)
          setRegisteredEventIds(ids)
        }
      } catch (error) {
        console.error("[HomePage] Error fetching events:", error)
      } finally {
        console.log("[HomePage] Setting loading to false")
        setLoading(false)
      }
    }

    fetchEvents()
  }, [user, currentPage])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Events</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Find and attend the best events in your area. From conferences to concerts, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/events" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-6 py-3">
                Browse Events
              </Link>
              <Link to="/register" className="btn bg-accent-500 text-white hover:bg-accent-600 text-lg px-6 py-3">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
            <Link to="/events" className="text-primary-500 hover:text-primary-600 flex items-center">
              View All <FiArrowRight className="ml-2" />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} isRegistered={registeredEventIds.includes(event.id)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No featured events available at the moment.</p>
              <Link to="/events" className="mt-4 inline-block text-primary-500 hover:text-primary-600">
                Browse all events
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EventHub makes it easy to discover, register, and attend events in just a few simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {num}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {num === 1 ? 'Discover Events' : num === 2 ? 'Register & Save' : 'Attend & Enjoy'}
                </h3>
                <p className="text-gray-600">
                  {num === 1
                    ? "Browse through our curated list of events or use filters to find exactly what you're looking for."
                    : num === 2
                    ? 'Create an account to register for events and save your favorites for later.'
                    : 'Get reminders before your events and enjoy a seamless experience from start to finish.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section with Pagination */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <Link to="/events" className="text-primary-500 hover:text-primary-600 flex items-center">
              View All <FiArrowRight className="ml-2" />
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
                  className="px-4 py-2 bg-white text-primary-600 border border-primary-500 rounded disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="text-gray-700 font-medium">
                  Page {currentPage}
                </span>
                <button
                  className="px-4 py-2 bg-white text-primary-600 border border-primary-500 rounded disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={upcomingEvents.length < eventsPerPage}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No upcoming events available at the moment.</p>
              <Link to="/events" className="mt-4 inline-block text-primary-500 hover:text-primary-600">
                Browse all events
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Discover Amazing Events?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of people who use EventHub to discover and attend the best events.
          </p>
          <Link to="/register" className="btn bg-white text-accent-600 hover:bg-gray-100 text-lg px-6 py-3">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
