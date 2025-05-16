import { useState } from 'react'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import React from 'react'

function EventFilter({ onFilter }) {
  const { t } = useTranslation()
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
            <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none rtl:right-0 rtl:left-auto">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('searchEvents')}
              className="form-input ps-10 rtl:pr-10 rtl:pl-3 bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
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
              <FiFilter className="me-2 rtl:order-2" />
              {isFilterOpen ? t('hideFilters') : t('showFilters')}
            </button>
          </div>

          <div className={`md:flex gap-4 ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="mt-4 md:mt-0">
              <select
                className="form-input bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">{t('allCategories')}</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {t(cat)}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 md:mt-0">
              <input
                type="date"
                className="form-input bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <button type="submit" className="btn-primary flex-grow md:flex-grow-0">
                {t('applyFilters')}
              </button>
              <button
                type="button"
                className="btn-outline flex items-center"
                onClick={handleReset}
              >
                <FiX className="me-1 rtl:order-2 rtl:rotate-180" />
                {t('reset')}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EventFilter
