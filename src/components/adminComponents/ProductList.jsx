
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
    ShoppingCart,
    Edit,
    Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { getAllProduct, deleteProduct } from '../../services/adminAxiosCall';
import ConfirmModal from './ConfirmModal';

const ProductList = () => {

    const navigate = useNavigate()

    const [product, setProduct] = useState([])
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('products');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
        { id: 'products', label: 'Products', icon: Package, path: '/admin/productlist' },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await getAllProduct()
                setProduct(data.product)
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    }, [])

    console.log(product, 'this is the productsssss')

    const handleEditProduct = (id) => {
        navigate(`/admin/edit-product/${id}`)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
    };

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(selectedProductId);
            window.location.reload();
        } catch (err) {
            console.error("Failed to delete product:", err);
        } finally {
            setIsModalOpen(false);
            setSelectedProductId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">

            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
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

                                className={`w-full flex items-center space-x-3 px-3 py-2 mb-1 rounded-lg text-left transition-colors duration-200 ${activeTab === item.id
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
                <Navbar />

                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                            <button
                                onClick={() => navigate('/admin/addproduct')}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                            >
                                <span>Add Product</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {product.map((pdt) => (
                                <a key={pdt._id} className="group">
                                    <div className="relative">
                                        <img
                                            alt={pdt.image}
                                            src={pdt.image}
                                            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                                        />

                                        {/* Action Icons */}
                                        <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleEditProduct(pdt._id);
                                                }}
                                                className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-150"
                                                aria-label="Edit product"
                                            >
                                                <Edit className="w-4 h-4 text-gray-600" />
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedProductId(pdt._id); 
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-150"
                                                aria-label="Delete product"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="mt-4 text-sm text-gray-700">{pdt.name}</h3>
                                    <h3 className="mt-4 text-sm text-gray-700">{pdt.description}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">{pdt.price}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                onCancel={handleCancel}
                onConfirm={handleDeleteProduct}
            />

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    )
}

export default ProductList