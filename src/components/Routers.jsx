import { Route ,Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import { UserDashboard } from './UserDashboard'
import { Admin } from './Admin'
const Routers = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/userdashboard' element={<UserDashboard/>}/>
        <Route path='/admin' element={<Admin/>}/>
    </Routes>
    </>
  )
}

export default Routers