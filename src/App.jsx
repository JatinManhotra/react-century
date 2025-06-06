import React from 'react'
import Sidebar from './components/sidebar/Sidebar'
import WelcomePage from './pages/welcome page/WelcomePage'
import { Route, Routes } from 'react-router-dom'
import ChatPage from './pages/chat page/ChatPage'

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