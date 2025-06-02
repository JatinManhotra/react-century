import React from 'react'
import Sidebar from './components/Sidebar'
import Welcome from './components/Welcome'

const App = () => {
  return (
    <>
    <header>
      <h1 className='hidden'>This is a header</h1>
    </header>

    <main className='flex'>
      <Sidebar/>
      <Welcome/>
    </main>

    <footer>
      
    </footer>
    </>
  )
}

export default App