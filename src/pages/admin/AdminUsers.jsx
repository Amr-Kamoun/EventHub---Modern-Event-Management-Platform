import React, { useState, useEffect } from 'react'
import { FiSearch, FiMail, FiEdit, FiTrash2, FiUserCheck, FiUserX } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function AdminUsers() {
  const { t } = useTranslation()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const mockUsers = [
          {
            id: '1',
            email: 'john.doe@example.com',
            full_name: 'John Doe',
            role: 'user',
            created_at: '2023-01-15T10:30:00Z',
            status: 'active',
          },
          {
            id: '2',
            email: 'jane.smith@example.com',
            full_name: 'Jane Smith',
            role: 'admin',
            created_at: '2023-01-10T08:15:00Z',
            status: 'active',
          },
          {
            id: '3',
            email: 'bob.johnson@example.com',
            full_name: 'Bob Johnson',
            role: 'user',
            created_at: '2023-02-05T14:45:00Z',
            status: 'inactive',
          }
        ]
        setUsers(mockUsers)
      } catch (error) {
        console.error('Error fetching users:', error)
        toast.error(t('loadUsersFailed'))
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [t])

  const handleStatusToggle = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    setUsers(users.map(user => user.id === userId ? { ...user, status: newStatus } : user))
    toast.success(t('userStatusUpdated', { status: newStatus }))
  }

  const handleRoleToggle = (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user))
    toast.success(t('userRoleUpdated', { role: newRole }))
  }

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    (user.full_name && user.full_name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{t('manageUsers')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('manageUsersDesc')}</p>
        </div>
        <Link to="/admin" className="btn-outline">
          {t('backToDashboard')}
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none rtl:end-0 rtl:start-auto">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('searchUsers')}
              className="form-input ps-10 bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">{t('user')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">{t('role')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">{t('status')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">{t('joined')}</th>
                  <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map(user => {
                  const joinDate = new Date(user.created_at)
                  return (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-700 font-medium">
                              {user.full_name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="ms-4 rtl:me-4 rtl:ms-0">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.full_name || t('noName')}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-300 flex items-center">
                              <FiMail className="me-1 rtl:ms-1 rtl:me-0" size={12} />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {t(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {t(user.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {joinDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <div className="flex justify-end rtl:justify-start space-x-2 rtl:space-x-reverse">
                          <button
                            className={user.role === 'admin' ? 'text-purple-500 hover:text-purple-700' : 'text-blue-500 hover:text-blue-700'}
                            onClick={() => handleRoleToggle(user.id, user.role)}
                            title={t('changeRoleTo', { role: user.role === 'admin' ? 'user' : 'admin' })}
                          >
                            {user.role === 'admin' ? <FiUserX /> : <FiUserCheck />}
                          </button>
                          <button
                            className={user.status === 'active' ? 'text-red-500 hover:text-red-700' : 'text-green-500 hover:text-green-700'}
                            onClick={() => handleStatusToggle(user.id, user.status)}
                            title={t(user.status === 'active' ? 'deactivateUser' : 'activateUser')}
                          >
                            {user.status === 'active' ? <FiUserX /> : <FiUserCheck />}
                          </button>
                          <button className="text-gray-500 hover:text-gray-700" title={t('editUser')}>
                            <FiEdit />
                          </button>
                          <button className="text-red-500 hover:text-red-700" title={t('deleteUser')}>
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
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('noUsersFound')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {search ? t('adjustSearch') : t('noUsersYet')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUsers
