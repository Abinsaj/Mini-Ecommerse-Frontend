import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
console.log(storedUser)

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;

        },
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    }
})

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;