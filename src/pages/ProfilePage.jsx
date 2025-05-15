import { useState, useEffect } from 'react'
import { FiUser, FiMail, FiCalendar, FiEdit, FiSave, FiX } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { getUserProfile, updateUserProfile, getUserRegistrations } from '../lib/supabase'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import React from 'react';

function ProfilePage() {
  const { user } = useAuth()
  
  const [profile, setProfile] = useState(null)
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    bio: '',
  })
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch user profile
        const profileData = await getUserProfile(user.id)
        setProfile(profileData || {})
        
        // Initialize form data
        if (profileData) {
          setFormData({
            full_name: profileData.full_name || '',
            phone: profileData.phone || '',
            bio: profileData.bio || '',
          })
        }
        
        // Fetch user registrations
        const registrationsData = await getUserRegistrations(user.id)
        setRegistrations(registrationsData)
      } catch (error) {
        console.error('Error fetching profile data:', error)
        toast.error('Failed to load profile data')
      } finally {
        setLoading(false)
      }
    }
    
    if (user) {
      fetchProfileData()
    }
  }, [user])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const updatedProfile = await updateUserProfile(user.id, formData)
      setProfile(updatedProfile)
      setEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    }
  }
  
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
        <p className="text-gray-600">
          Manage your personal information and view your event registrations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              {!editing && (
                <button
                  className="text-primary-500 hover:text-primary-600 flex items-center"
                  onClick={() => setEditing(true)}
                >
                  <FiEdit className="mr-1" />
                  Edit
                </button>
              )}
            </div>
            
            {editing ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="full_name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      className="form-input"
                      value={formData.full_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-input bg-gray-50"
                      value={user.email}
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="form-label">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      className="form-input"
                      value={formData.bio}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary flex items-center">
                      <FiSave className="mr-2" />
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn-outline flex items-center"
                      onClick={() => {
                        setEditing(false)
                        setFormData({
                          full_name: profile.full_name || '',
                          phone: profile.phone || '',
                          bio: profile.bio || '',
                        })
                      }}
                    >
                      <FiX className="mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center">
                  <FiUser className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">
                      {profile?.full_name || 'Not provided'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FiMail className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FiCalendar className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {user.created_at
                        ? format(new Date(user.created_at), 'MMMM d, yyyy')
                        : 'Unknown'}
                    </p>
                  </div>
                </div>
                
                {profile?.phone && (
                  <div className="flex items-start">
                    <FiUser className="text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{profile.phone}</p>
                    </div>
                  </div>
                )}
                
                {profile?.bio && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">Bio</p>
                    <p className="text-gray-700">{profile.bio}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Registered Events */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-semibold mb-6">Your Registered Events</h2>
            
            {registrations.length > 0 ? (
              <div className="space-y-4">
                {registrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {registration.events.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {format(new Date(registration.events.date), 'MMMM d, yyyy')} • {registration.events.location}
                        </p>
                        <div className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded">
                          {registration.events.category}
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Link
                          to={`/events/${registration.events.id}`}
                          className="btn-primary"
                        >
                          View Event
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  You haven't registered for any events yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Browse our events and register for ones that interest you.
                </p>
                <Link to="/events" className="btn-primary">
                  Browse Events
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage