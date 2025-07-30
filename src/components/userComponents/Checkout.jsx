import React, { useState } from 'react';
import { Package, Truck, Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { clearCart } from '../../redux/Slices/cartSlice';
import { placeOrder } from '../../services/UserService/userAxiosCall';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  

  const cart = useSelector((state)=>state.cart.cartItems)
  const user = useSelector((state)=>state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = async() => {
    try {

        const orderPayload = {
            userId: user._id,
            items: cart.map((item) => ({
              productId: item.productId,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
            totalAmount: subtotal,
            paymentMode: 'COD',
          };

        const order = await placeOrder(orderPayload)
        if(order.success){
            dispatch(clearCart())
            toast.success('ORDER PLACED')
            navigate('/success')
        }else{
            toast.error('something went wrond. please try again')
        }
    } catch (error) {
        console.error('Error placing order:', error);
        toast.error('Error placing order. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-2">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Review your order - Cash on Delivery</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <Package className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
            </div>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-gray-900 text-lg">{item.name}</h4>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-blue-600 font-medium">₹{item.price.toFixed(2)} each</p>
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{subtotal.toFixed()}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="text-gray-900">₹0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-2xl font-bold">
                    <span className="text-gray-900">Total Amount</span>
                    <span className="text-green-600">₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center">
                <Truck className="w-8 h-8 text-green-600 mr-4" />
                <div>
                  <h4 className="text-lg font-semibold text-green-800">Cash on Delivery</h4>
                  <p className="text-green-700 mt-1">Pay when your order is delivered to your doorstep</p>
                  <p className="text-sm text-green-600 mt-2">✓ No advance payment required</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Delivery Information</h4>
            <div className="text-blue-700 space-y-1">
              <p>• Estimated delivery: 3-5 business days</p>
              <p>• Free delivery on orders above ₹100</p>
              <p>• Cash payment to be made upon delivery</p>
              <p>• Please keep exact change ready</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={()=>handlePlaceOrder()}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-12 rounded-lg font-bold text-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center">
                <Check className="w-6 h-6 mr-2" />
                Place Order - ₹{subtotal.toFixed(2)}
              </div>
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              Your order will be confirmed and you'll receive a confirmation message
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;