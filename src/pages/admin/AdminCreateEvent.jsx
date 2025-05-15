import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEvent } from '../../lib/supabase'
import toast from 'react-hot-toast'

function AdminCreateEvent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [organizer, setOrganizer] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const isValidImageUrl = (url) => {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(url)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!isValidImageUrl(imageUrl)) {
      toast.error('❌ Invalid image URL. Please use a .jpg, .jpeg, .png, or .webp link.')
      setLoading(false)
      return
    }

    try {
      const newEvent = {
        title,
        description,
        category,
        date,
        time,
        location,
        organizer,
        price: parseFloat(price),
        image: imageUrl,
      }

      await createEvent(newEvent)
      toast.success('✅ Event created successfully!')
      navigate('/admin/events')
    } catch (error) {
      console.error('❌ [Submit] Create event error:', error)
      toast.error('Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow rounded-lg mt-10 transition-colors text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="form-input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full dark:text-white"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="form-input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full dark:text-white"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <select
          className="form-input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full dark:text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Concert">Concert</option>
          <option value="Exhibition">Exhibition</option>
          <option value="Sports">Sports</option>
          <option value="Networking">Networking</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          className="form-input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full dark:text-white"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          className="form-input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full dark:text-white"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <input
          className="form-input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full dark:text-white"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          className="form-input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full dark:text-white"
          placeholder="Organizer"
          value={organizer}
          onChange={(e) => setOrganizer(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full dark:text-white"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          className="form-input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full dark:text-white"
          placeholder="Image URL (e.g. https://.../image.jpg)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        {isValidImageUrl(imageUrl) && (
          <img
            src={imageUrl}
            alt="Event Preview"
            className="w-full rounded shadow mt-2 border border-gray-200 dark:border-gray-700"
          />
        )}

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  )
}

export default AdminCreateEvent
