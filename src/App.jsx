import { useState } from 'react'
import './css/App.css'
import { Routes, Route } from 'react-router-dom'
// import Hobbies from './pages/Hobbies'
import Hobbies from './pages/Hobbies'
import Create from './pages/Create'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Hobbies />}></Route>
        <Route path='/create' element={<Create />}></Route>
      </Routes>
    </>
  )
}

export default App
