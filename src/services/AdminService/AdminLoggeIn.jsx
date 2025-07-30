import { Navigate, Outlet } from "react-router-dom";

const AdminLoggedIn = ()=>{

    const adminData = localStorage.getItem('adminInfo')

    return (
        adminData ? <Outlet/> : <Navigate to = '/admin/login'/>
    )
}

export default AdminLoggedIn