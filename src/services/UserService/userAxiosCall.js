import axiosInstance from "../../config/axiosInstance"

export const signupUser = async(values)=>{
    try {
        const response = await axiosInstance.post('/api/signup',values);
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            return error.response.data;
        }
        console.log(error);
    };
};

export const loginUser = async(values)=>{
    try {
        const response = await axiosInstance.post('/api/login',values);
        return response.data;
    } catch (error) {
        if(error.response && error.response,data){
            return error.response.data;
        }
        console.log(error);
    };
};

export const updatedUserCart = async (cartItems, userId) => {
    try {

        const response = await axiosInstance.post('/api/cart', { userId, cartItems });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

  export const getUserCart = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/cart/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};


export const updateQuantity = async(id, newQuantity, userId)=>{
    try {
        const response = await axiosInstance.put(`/api/cart/${id}`, { quantity: newQuantity, userId })
        return response
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}

export const placeOrder = async(value)=>{
    try {
        const response = await axiosInstance.post('/api/order',value)
        console.log(response)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}