import { Navigate, Outlet } from "react-router-dom"

function UserLoggedIn() {
  const userData = localStorage.getItem('user')
  console.log(userData,'this is the admin data')
  return (
    userData ? <Outlet/> : <Navigate to = '/login'/>
  )
}

export default UserLoggedIn
