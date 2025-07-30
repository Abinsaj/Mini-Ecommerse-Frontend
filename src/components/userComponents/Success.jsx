import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 text-lg mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">Next Steps</h4>
          <div className="text-blue-700 space-y-1 text-sm">
            <p>• You will receive an order confirmation shortly via email or SMS.</p>
            <p>• Estimated delivery: <span className="font-medium">3–5 business days</span>.</p>
            <p>• Please keep exact change ready for Cash on Delivery.</p>
          </div>
        </div>

        <button
          onClick={handleContinueShopping}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
