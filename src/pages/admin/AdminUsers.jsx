import React from 'react';
import { useState, useEffect } from 'react'
import { FiSearch, FiMail, FiEdit, FiTrash2, FiUserCheck, FiUserX } from 'react-icons/fi'
import toast from 'react-hot-toast'

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  
  // Mock data for users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // This would be replaced with actual API call
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
          },
          {
            id: '4',
            email: 'alice.williams@example.com',
            full_name: 'Alice Williams',
            role: 'user',
            created_at: '2023-02-20T11:20:00Z',
            status: 'active',
          },
          {
            id: '5',
            email: 'charlie.brown@example.com',
            full_name: 'Charlie Brown',
            role: 'user',
            created_at: '2023-03-01T09:10:00Z',
            status: 'active',
          },
        ]
        
        setUsers(mockUsers)
      } catch (error) {
        console.error('Error fetching users:', error)
        toast.error('Failed to load users')
      } finally {
        setLoading(false)
      }
    }
    
    fetchUsers()
  }, [])
  
  const handleStatusToggle = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    
    // Update user status in state
    setUsers(
      users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    )
    
    toast.success(`User status updated to ${newStatus}`)
  }
  
  const handleRoleToggle = (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    
    // Update user role in state
    setUsers(
      users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      )
    )
    
    toast.success(`User role updated to ${newRole}`)
  }
  
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    (user.full_name && user.full_name.toLowerCase().includes(search.toLowerCase()))
  )
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Users</h1>
        <p className="text-gray-600">
          View and manage user accounts on your platform
        </p>
      </div>
      
      {/* Search */}
      <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="form-input pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Joined
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                  const joinDate = new Date(user.created_at)
                  
                  return (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-700 font-medium">
                              {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.full_name || 'No name provided'}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FiMail className="mr-1" size={12} />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {joinDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className={`${
                              user.role === 'admin'
                                ? 'text-purple-500 hover:text-purple-700'
                                : 'text-blue-500 hover:text-blue-700'
                            }`}
                            onClick={() => handleRoleToggle(user.id, user.role)}
                            title={`Change role to ${user.role === 'admin' ? 'user' : 'admin'}`}
                          >
                            {user.role === 'admin' ? <FiUserX /> : <FiUserCheck />}
                          </button>
                          <button
                            className={`${
                              user.status === 'active'
                                ? 'text-red-500 hover:text-red-700'
                                : 'text-green-500 hover:text-green-700'
                            }`}
                            onClick={() => handleStatusToggle(user.id, user.status)}
                            title={`${user.status === 'active' ? 'Deactivate' : 'Activate'} user`}
                          >
                            {user.status === 'active' ? <FiUserX /> : <FiUserCheck />}
                          </button>
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            title="Edit user"
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            title="Delete user"
                          >
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-500">
              {search ? 'Try adjusting your search criteria' : 'No users in the system yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUsers
