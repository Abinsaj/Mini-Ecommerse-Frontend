import React, { useState } from 'react';
import { 
  Settings, 
  Home, 
  BarChart3, 
  Users, 
  Package, 
  CreditCard, 
  MessageSquare, 
  Calendar,

  X,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Eye
} from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {

    const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
    { id: 'products', label: 'Products', icon: Package ,path: '/admin/productlist' },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const statsCards = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Users',
      value: '2,350',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Orders',
      value: '12,234',
      change: '-3.2%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'bg-orange-500'
    },
    {
      title: 'Page Views',
      value: '573,932',
      change: '+8.7%',
      trend: 'up',
      icon: Eye,
      color: 'bg-purple-500'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
    { id: 2, action: 'Order completed', user: 'Jane Smith', time: '5 minutes ago' },
    { id: 3, action: 'Payment received', user: 'Mike Johnson', time: '10 minutes ago' },
    { id: 4, action: 'New message received', user: 'Sarah Wilson', time: '15 minutes ago' },
    { id: 5, action: 'Product updated', user: 'Admin', time: '20 minutes ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-800">Mini-Ecommerce</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}

                className={`w-full flex items-center space-x-3 px-3 py-2 mb-1 rounded-lg text-left transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
          <Navbar/>

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((card, index) => {
              const IconComponent = card.icon;
              const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown;
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${card.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${
                      card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendIcon className="w-4 h-4" />
                      <span className="font-medium">{card.change}</span>
                    </div>
                  </div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">{card.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Revenue Analytics</h2>
                <select className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Chart visualization would go here</p>
                  <p className="text-sm text-gray-400">Connect your analytics data</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.user}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                View all activity
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Add User', icon: Users, color: 'bg-blue-500' },
                { label: 'Create Product', icon: Package, color: 'bg-green-500' },
                { label: 'Send Message', icon: MessageSquare, color: 'bg-purple-500' },
                { label: 'View Reports', icon: BarChart3, color: 'bg-orange-500' }
              ].map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <button
                    key={index}
                    className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 group"
                  >
                    <div className={`p-3 rounded-full ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}