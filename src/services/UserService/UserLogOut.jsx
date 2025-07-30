import { Navigate, Outlet } from "react-router-dom";

const UserLoggedOut = ()=>{
    const userData = localStorage.getItem('user')
    
    return (
        userData ? <Navigate to='/home'/> : <Outlet/>
    )
}

export default UserLoggedOut