import axiosInstance from "../../config/axiosInstance"

export const adminLogin = async(values)=>{
    try {
        const response = await axiosInstance.post('/admin/login',values)
        console.log(response,'response')
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
        for(let pair of values.entries()){
            console.log(`${pair[0]}:`,pair[1])
        }
        const response = await axiosInstance.post('/product',values,{
            headers:{ 'Content-Type': 'multipart/form-data'}
        });
        console.log(response)
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
        const response = await axiosInstance.get('/product')
        console.log(response)
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
        const response = await axiosInstance.get(`/product/${id}`)
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
        const response = await axiosInstance.put(`/product/${id}`, data, {
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
        const response = await axiosInstance.delete(`/product/${id}`)
        console.log(response)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            return response.data
        }
        console.log(error)
    }
}