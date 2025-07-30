import { Navigate, Outlet } from "react-router-dom";

const AdminLoggedIn = ()=>{

    const adminData = localStorage.getItem('adminInfo')
    console.log(adminData,'this is the admin data in localstorage')

    return (
        adminData ? <Outlet/> : <Navigate to = '/admin/login'/>
    )
}

export default AdminLoggedIn