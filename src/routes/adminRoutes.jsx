import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminDashboard from '../components/adminComponents/Dashboard'
import ProductList from '../components/adminComponents/ProductList'
import AdminLoginForm from '../components/adminComponents/AdminLogin'
import AddProduct from '../components/adminComponents/AddProduct'
import EditProduct from '../components/adminComponents/EditProduct'

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<AdminLoginForm/>}/>
        <Route path='/dashboard' element={<AdminDashboard/>}/>
        <Route path='/productlist' element={<ProductList/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/edit-product/:id' element={<EditProduct/>}/>
    </Routes>
  )
}

export default AdminRoutes
