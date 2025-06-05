import React from 'react'
import Sidebar from './components/Sidebar'
import WelcomePage from './pages/WelcomePage'
import { Route, Routes } from 'react-router-dom'
import ChatPage from './pages/ChatPage'

const App = () => {
  return (
    <>
    <header>
      <h1 className='hidden'>This is a header</h1>
    </header>

    <main className='flex'>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<WelcomePage/>}/>
        <Route path='/chat/:id' element={<ChatPage/>}/>
      </Routes>
    </main>

    <footer>
      
    </footer>
    </>
  )
}

export default App