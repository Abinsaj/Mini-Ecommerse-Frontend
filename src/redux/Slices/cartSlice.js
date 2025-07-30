
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },

        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(i => i.productId === item._id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({
                    productId: item._id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: 1,
                });
            }
        },

        incrementQty: (state, action) => {
            const item = state.cartItems.find(i => i.productId === action.payload.itemId);
            if (item && item.quantity < action.payload.newQuantity) {
                item.quantity = action.payload.newQuantity;
            }
        },
        decrementQty: (state, action) => {
            const item = state.cartItems.find(i => i.productId === action.payload.itemId);
            if (item && item.quantity > 1) {
                item.quantity = action.payload.newQuantity;
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.productId !== itemId);
          },
        clearCart: (state) => {
            state.cartItems = [];
        }

    }
});

export const { addToCart, setCartItems, incrementQty, decrementQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

