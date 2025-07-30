import { useEffect, useState } from 'react';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Header from './Header';
import { getUserCart, updateQuantity } from '../../services/UserService/userAxiosCall';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQty, incrementQty, setCartFromBackend } from '../../redux/Slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const cart = useSelector((state)=>state.cart.cartItems)
  const navigate = useNavigate()

  const fetchUserCart = async () => {
    if (user && user._id) {
      try {
        const data = await getUserCart(user._id);
        if (data && data.cart && data.cart.items) {
          dispatch(setCartFromBackend(data.cart.items));
        }
      } catch (error) {
        console.error('Failed to fetch user cart:', error);

      }
    }
  };
  useEffect(() => {
    fetchUserCart();
  }, [dispatch]);

  const handleUpdateQuantity = async (id, currentQuantity, change) => {

    if (currentQuantity < 1) return;
   
    try {
      const response = await updateQuantity(id, change, user._id); 
      const updatedItem = response.data;
      if (change === 1) {
        dispatch(incrementQty({ itemId: updatedItem._id, newQuantity: updatedItem.cartQuantity }));
      } else {
        dispatch(decrementQty({ itemId: updatedItem._id, newQuantity: updatedItem.cartQuantity }));
      }
      fetchUserCart()
    } catch (error) {
      console.error('Error updating quantity:', error);
      fetchUserCart()
    }
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <>
        <div>
          <Header />
          <div className="max-w-4xl mx-auto p-6">
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some items to your cart to get started</p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <Header />
        <div className="max-w-full mx-auto p-5 ">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Cart Items ({cart.length})
                  </h2>

                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item._id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-200">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.alt}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>

                        <div className="flex-grow">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {item.name}
                          </h3>
                          <p className="text-xl font-semibold text-blue-600">
                            ₹{item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity , -1)}
                              className="p-2 hover:bg-gray-100 transition-colors duration-150 rounded-l-lg"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>

                            <span className="px-4 py-2 text-lg font-medium text-gray-900 bg-gray-50 min-w-[60px] text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity, 1)}
                              className="p-2 hover:bg-gray-100 transition-colors duration-150 rounded-r-lg"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="flex-shrink-0 text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>₹0%</span>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button onClick={()=>navigate('/checkout')} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                      Proceed to Checkout
                    </button>

                    <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium">
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;