


import { Navigate, Outlet } from "react-router-dom";

const AdminLoggedOut = ()=>{

    const adminData = localStorage.getItem('adminInfo')

    console.log(adminData,'this is the admin data')

    return (
        adminData ? <Navigate to = '/admin/dashboard'/> : <Outlet/>
    )
}

export default AdminLoggedOut