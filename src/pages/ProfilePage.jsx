import { useState, useEffect } from 'react'
import { FiUser, FiMail, FiCalendar, FiEdit, FiSave, FiX } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { getUserProfile, updateUserProfile, getUserRegistrations } from '../lib/supabase'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import React from 'react'
import { useTranslation } from 'react-i18next'

function ProfilePage() {
  const { t } = useTranslation()
  // ✅ include refreshUser
  const { user, refreshUser } = useAuth()

  const [profile, setProfile] = useState(null)
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    bio: '',
  })

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await getUserProfile(user.id)
        setProfile(profileData || {})

        if (profileData) {
          setFormData({
            full_name: profileData.full_name || '',
            phone: profileData.phone || '',
            bio: profileData.bio || '',
          })
        }

        const registrationsData = await getUserRegistrations(user.id)
        setRegistrations(registrationsData)
      } catch (error) {
        console.error('Error fetching profile data:', error)
        toast.error(t('loadProfileFailed'))
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchProfileData()
    }
  }, [user, t])

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
      await refreshUser() // ✅ refresh the auth user object so Navbar gets updated
      setEditing(false)
      toast.success(t('profileUpdateSuccess'))
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error(t('profileUpdateError'))
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('yourProfile')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('manageProfile')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-soft p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{t('personalInfo')}</h2>
              {!editing && (
                <button className="text-primary-500 hover:text-primary-600 flex items-center" onClick={() => setEditing(true)}>
                  <FiEdit className="mr-1" />
                  {t('edit')}
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="full_name" className="form-label">{t('fullName')}</label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      className="form-input bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
                      value={formData.full_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">{t('email')}</label>
                    <input
                      type="email"
                      id="email"
                      className="form-input bg-gray-100 text-black dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600"
                      value={user.email}
                      disabled
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('emailNote')}</p>
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">{t('phone')}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="bio" className="form-label">{t('bio')}</label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      className="form-input bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
                      value={formData.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary flex items-center">
                      <FiSave className="mr-2" />
                      {t('saveChanges')}
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
                      {t('cancel')}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center">
                  <FiUser className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">{t('fullName')}</p>
                    <p className="font-medium">{profile?.full_name || t('notProvided')}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiMail className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">{t('email')}</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">{t('memberSince')}</p>
                    <p className="font-medium">{user.created_at ? format(new Date(user.created_at), 'MMMM d, yyyy') : t('unknown')}</p>
                  </div>
                </div>
                {profile?.phone && (
                  <div className="flex items-start">
                    <FiUser className="text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">{t('phone')}</p>
                      <p className="font-medium">{profile.phone}</p>
                    </div>
                  </div>
                )}
                {profile?.bio && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-500 mb-1">{t('bio')}</p>
                    <p className="text-gray-700 dark:text-gray-200">{profile.bio}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Registered Events */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-semibold mb-6">{t('yourEvents')}</h2>
            {registrations.length > 0 ? (
              <div className="space-y-4">
                {registrations.map((registration) => (
                  <div key={registration.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{registration.events.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {format(new Date(registration.events.date), 'MMMM d, yyyy')} • {registration.events.location}
                        </p>
                        <div className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded">
                          {registration.events.category}
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Link to={`/events/${registration.events.id}`} className="btn-primary">
                          {t('viewDetails')}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg">
                <h3 className="text-lg font-medium mb-2">{t('noRegistrations')}</h3>
                <p className="mb-6">{t('browsePrompt')}</p>
                <Link to="/events" className="btn-primary">{t('browseEventsBtn')}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
