import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import Hobbies from './pages/Hobbies'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Hobbies />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/reset-password/:token' element={<ResetPassword />}></Route>
      </Routes>
    </>
  )
}

export default App
