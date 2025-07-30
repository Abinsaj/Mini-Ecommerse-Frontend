
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        setCartFromBackend: (state, action) => {
            state.cartItems = action.payload;
        },

        addToCart: (state, action) => {
            const item = action.payload;
            const existing = state.cartItems.find(i => i._id === item._id);

            if (existing) {
                if (existing.cartQuantity < item.quantity) {
                    existing.cartQuantity += 1;
                }
            } else {
                state.cartItems.push({ ...item, cartQuantity: 1 });
            }
        },
        incrementQty: (state, action) => {
            const item = state.cartItems.find(i => i._id === action.payload.itemId);
            if (item && item.cartQuantity < item.quantity) {
                item.cartQuantity += 1;
            }
        },
        decrementQty: (state, action) => {
            const item = state.cartItems.find(i => i._id === action.payload);
            if (item && item.cartQuantity > 1) {
                item.cartQuantity -= 1;
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i._id !== action.payload);
        },
        clearCart: (state) => {
            state.cartItems = [];
        }

    }
});

export const { addToCart, setCartFromBackend, incrementQty, decrementQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

