import React, { useEffect } from 'react'
import Route from './components/Routes/Route'
import useTheme from './store/useTheme'

const App = () => {
  const { theme, setTheme } = useTheme()

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
  }, [setTheme])

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <Route/>
    </div>
  )
}

export default App