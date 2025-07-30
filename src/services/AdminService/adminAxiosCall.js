import axiosInstance from "../../config/axiosInstance"

export const adminLogin = async(values)=>{
    try {
        const response = await axiosInstance.post('/api/admin/login',values)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            return response.data
        }
        console.log(error)
    }
} 

export const addProduct = async(values)=>{
    try {
        const response = await axiosInstance.post('/api/product',values,{
            headers:{ 'Content-Type': 'multipart/form-data'}
        });
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            return response.data
        }
        console.log(error)
    }
}

export const getAllProduct = async()=>{
    try {
        const response = await axiosInstance.get('/api/product')
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            return response.data
        }
        console.log(error)
    }
}

export const getSingleProduct = async(id)=>{
    try {
        const response = await axiosInstance.get(`/api/product/${id}`)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            return response.data
        }
        console.log(error)
    }
}

export const updateProduct = async(id, data)=>{
    try {
        const response = await axiosInstance.put(`/api/product/${id}`, data, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        }) 
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            return response.data
        }
        console.log(error)
    }
}

export const deleteProduct = async(id)=>{
    try {
        const response = await axiosInstance.delete(`/api/product/${id}`)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            return response.data
        }
        console.log(error)
    }
}