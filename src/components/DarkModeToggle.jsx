import { useEffect, useState } from 'react'

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <button
      onClick={() => setDarkMode(prev => !prev)}
      className="px-3 py-1 rounded border text-sm bg-gray-200 dark:bg-gray-700 dark:text-white"
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}

export default DarkModeToggle
