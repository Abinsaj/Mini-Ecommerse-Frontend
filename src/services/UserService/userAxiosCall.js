import axiosInstance from "../../config/axiosInstance"

export const signupUser = async(values)=>{
    try {
        const response = await axiosInstance.post('/signup',values);
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
        const response = await axiosInstance.post('/login',values);
        console.log(response.data,'dfghjhgfdfghjkjhgf')
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
        console.log(cartItems,'this is the cart items,',userId)
        const response = await axiosInstance.post('/cart', { userId, cartItems });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

  export const getUserCart = async (userId) => {
    try {
        const response = await axiosInstance.get(`/cart/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};


export const updateQuantity = async(id, newQuantity, userId)=>{
    try {
        const response = await axiosInstance.put(`/cart/${id}`, { quantity: newQuantity, userId })
        return response
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}