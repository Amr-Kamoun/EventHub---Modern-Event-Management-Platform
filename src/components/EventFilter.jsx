import { useState } from 'react'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import React from 'react';

function EventFilter({ onFilter }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const categories = [
    'Conference',
    'Workshop',
    'Seminar',
    'Concert',
    'Exhibition',
    'Sports',
    'Networking',
    'Other'
  ]
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onFilter({ search, category, date })
  }
  
  const handleReset = () => {
    setSearch('')
    setCategory('')
    setDate('')
    onFilter({})
  }
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }
  
  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              className="form-input pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="btn-outline w-full flex items-center justify-center"
              onClick={toggleFilter}
            >
              <FiFilter className="mr-2" />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          <div className={`md:flex gap-4 ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="mt-4 md:mt-0">
              <select
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 md:mt-0">
              <input
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <button type="submit" className="btn-primary flex-grow md:flex-grow-0">
                Apply Filters
              </button>
              <button
                type="button"
                className="btn-outline flex items-center"
                onClick={handleReset}
              >
                <FiX className="mr-1" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EventFilter