import image from '../assets/user.webp'
import { useLocation } from 'react-router-dom';
export const UserDashboard = () => {
    const location = useLocation();
    const { state } = location || {};
    const { user } = state || { user:[]};
    const u=user
    console.log(u)
    
    
  return (
    <>
    <h1>Welcome {u.username} <img src={image} alt='logo'/></h1>
    <p>Email: {u.email}</p>
    <p>jobrole: {u.jobrole}</p>
    <p>Salary: {u.salary}</p>
    </>
  )
}
