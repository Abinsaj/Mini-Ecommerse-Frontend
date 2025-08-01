import { Navigate, Outlet } from "react-router-dom"

function UserLoggedIn() {
  const userData = localStorage.getItem('user')
  return (
    userData ? <Outlet/> : <Navigate to = '/'/>
  )
}

export default UserLoggedIn
