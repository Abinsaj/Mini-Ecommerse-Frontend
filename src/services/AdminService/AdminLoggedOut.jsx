


import { Navigate, Outlet } from "react-router-dom";

const AdminLoggedOut = ()=>{

    const adminData = localStorage.getItem('adminInfo')

    return (
        adminData ? <Navigate to = '/admin/dashboard'/> : <Outlet/>
    )
}

export default AdminLoggedOut